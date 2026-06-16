/**
 * Scrape Google Maps voor één vakman-lead.
 * Output: { title, phone, address, postcode, city, mapsUrl, hasWebsite, websiteUrl,
 *           reviewsCount, reviewsRating, reviewSnippets[], category }
 *
 * Strict: alleen B2B-data (geen eigenaar-namen op site tonen).
 * Review-snippets: AVG-strip → geen author-naam, alleen tekst.
 */

import { chromium } from 'playwright'

const SCRAPE_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const NL_POSTCODE_RE = /(\d{4}\s?[A-Z]{2})/

export async function scrapeMapsList(niche, stad, take = 15) {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent: SCRAPE_UA,
    locale: 'nl-NL',
  })
  const page = await ctx.newPage()
  try {
    const q = `${niche} ${stad}`
    await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(q)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    })

    // Consent
    try {
      await page
        .locator('button:has-text("Alles afwijzen"), button:has-text("Reject all")')
        .first()
        .click({ timeout: 4000 })
      await page.waitForTimeout(1500)
    } catch {
      /* geen consent */
    }
    await page.waitForTimeout(2500)

    const cards = await page.evaluate((max) => {
      const arr = Array.from(document.querySelectorAll('a.hfpxzc'))
      return arr.slice(0, max).map((a) => ({
        name: a.getAttribute('aria-label'),
        href: a.getAttribute('href'),
      }))
    }, take)

    return cards.filter((c) => c.name && c.href)
  } finally {
    // finally: browser-proces mag nooit lekken, ook niet bij crash mid-scrape
    await browser.close().catch(() => {})
  }
}

export async function scrapeMapsDetail(detailUrl) {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent: SCRAPE_UA,
    locale: 'nl-NL',
  })
  const page = await ctx.newPage()
  try {
    await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })

    try {
      await page
        .locator('button:has-text("Alles afwijzen"), button:has-text("Reject all")')
        .first()
        .click({ timeout: 3000 })
    } catch {
      /* optioneel: consent-dialog niet altijd aanwezig */
    }

    await page.waitForTimeout(3000)

    // Structurele bron: Google embedt ALLE business-data als JSON in
    // window.APP_INITIALIZATION_STATE. Veel stabieler dan UI-CSS-klassen, die
    // Google zonder aankondiging roteert (dat brak eerder de review-count).
    // We gebruiken het als kruiscontrole/fallback naast aria-labels.
    let stateRating = null
    let stateCount = null
    let statePhone = null
    try {
      const html = await page.content()
      const m = html.match(/APP_INITIALIZATION_STATE\s*=\s*(\[[\s\S]*?\])\s*;\s*window\.APP_FLAGS/)
      if (m) {
        const jd = JSON.parse(m[1])
        // Doorzoek de geneste structuur generiek: het data-blok bevat een sub-array
        // waar [rating(float 0-5), count(int)] naast elkaar staan. Robuuster dan
        // harde indices die ~jaarlijks schuiven.
        const stack = [jd]
        let best = null
        while (stack.length && !best) {
          const node = stack.pop()
          if (!Array.isArray(node)) continue
          for (let i = 0; i < node.length; i++) {
            const v = node[i]
            if (
              typeof v === 'number' && v > 0 && v <= 5 && !Number.isInteger(v) &&
              typeof node[i + 1] === 'number' && Number.isInteger(node[i + 1]) && node[i + 1] >= 0 && node[i + 1] < 1e7
            ) {
              best = { rating: v, count: node[i + 1] }
              break
            }
            if (Array.isArray(v)) stack.push(v)
          }
        }
        if (best) {
          stateRating = best.rating
          stateCount = best.count
        }
        // Telefoon: zoek NL-telefoonpatroon in de JSON-string (extra fallback).
        const phoneM = m[1].match(/"(\+31[\s0-9]{7,}|0[\s0-9]{8,})"/)
        if (phoneM) statePhone = phoneM[1]
      }
    } catch (e) {
      if (process.env.ALBS_DEBUG) console.warn('[scrape-maps] APP_INITIALIZATION_STATE parse faalde:', e.message)
    }

    const head = await page.evaluate(() => {
      const title = document.querySelector('h1')?.textContent?.trim() ?? null
      const websiteBtn = document.querySelector('a[data-item-id="authority"]')
      const phoneBtn = document.querySelector('button[data-item-id^="phone:tel:"]')
      const addressBtn = document.querySelector('button[data-item-id="address"]')
      const categoryEl = document.querySelector('button.DkEaL') || document.querySelector('[jsaction*="category"]')

      // Rating + count via aria-label (taal-onafhankelijk, stabiel). Meerdere strategieën.
      let ariaRating = null
      let ariaCountRaw = null
      // count: element met 'reviews|beoordelingen|recensies' in aria-label
      const countEl = Array.from(document.querySelectorAll('[aria-label]')).find((e) =>
        /\d[\d.\s]*\s*(reviews|beoordelingen|recensies)/i.test(e.getAttribute('aria-label') || ''),
      )
      if (countEl) ariaCountRaw = countEl.getAttribute('aria-label')
      // rating: role=img met 'sterren/stars' of een numeriek aria-label 0-5
      const ratingEl =
        document.querySelector('[role="img"][aria-label*="ster" i]') ||
        document.querySelector('[role="img"][aria-label*="star" i]')
      if (ratingEl) {
        const m = (ratingEl.getAttribute('aria-label') || '').match(/(\d[.,]\d)/)
        if (m) ariaRating = parseFloat(m[1].replace(',', '.'))
      }
      // CSS-fallback (oud gedrag) — alleen als aria niets gaf
      if (ariaRating == null) {
        const t = document.querySelector('div.F7nice span[aria-hidden="true"]')?.textContent?.trim()
        if (t) ariaRating = parseFloat(t.replace(',', '.'))
      }
      if (ariaCountRaw == null) {
        ariaCountRaw = document.querySelector('div.F7nice span:nth-child(2)')?.textContent?.trim() ?? null
      }

      return {
        title,
        websiteUrl: websiteBtn?.getAttribute('href') ?? null,
        hasWebsite: !!websiteBtn,
        phoneRaw: phoneBtn?.getAttribute('aria-label')?.replace(/^Phone:\s*|^Telefoon:\s*/i, '') ?? null,
        addressRaw:
          addressBtn?.getAttribute('aria-label')?.replace(/^Address:\s*|^Adres:\s*/i, '') ?? null,
        ariaRating,
        ariaCountRaw,
        category: categoryEl?.textContent?.trim() ?? null,
      }
    })

    // Reviews — klik "Reviews"/"Beoordelingen" tab, wacht, scrape author+text+rating+datum
    // AVG-veilig: voornaam + initiaal (door anonimizeName in caller).
    let reviewSnippets = []
    try {
      // Probeer meerdere selectors voor reviews-tab
      let reviewsTab = page.locator('button[data-tab-index="1"]').first()
      if (!(await reviewsTab.isVisible({ timeout: 1500 }).catch(() => false))) {
        reviewsTab = page
          .locator('button[role="tab"]:has-text("Reviews"), button[role="tab"]:has-text("Beoordelingen")')
          .first()
      }
      if (await reviewsTab.isVisible({ timeout: 2000 }).catch(() => false)) {
        await reviewsTab.click()
        await page.waitForTimeout(2500)

        // Optionele scroll om meer reviews te laden (max 1 extra batch)
        try {
          const scrollable = page.locator('.DxyBCb, div[role="main"]').first()
          await scrollable.evaluate((el) => {
            el.scrollTop = el.scrollHeight
          })
          await page.waitForTimeout(1500)
        } catch {
          /* optioneel veld: extra review-batch mag falen */
        }

        // Klik "Meer/More" buttons om volledige review-tekst te tonen
        try {
          const moreButtons = page.locator('button.w8nwRe.kyuRq')
          const count = await moreButtons.count()
          for (let i = 0; i < Math.min(count, 6); i++) {
            await moreButtons.nth(i).click({ timeout: 800 }).catch(() => {})
          }
        } catch {
          /* optioneel veld: "Meer"-knoppen niet altijd aanwezig */
        }

        reviewSnippets = await page.evaluate(() => {
          const list = Array.from(document.querySelectorAll('div.jftiEf')).slice(0, 8)
          const out = []
          for (const r of list) {
            const authorRaw =
              r.querySelector('.d4r55')?.textContent?.trim() ??
              r.querySelector('[class*="author"]')?.textContent?.trim() ??
              null
            // Photo: probeer meerdere selectors voor profielfoto
            let photoUrl = null
            const imgEl = r.querySelector('img.NBa7we, img.lDY1rd, .QwoCfd img, button.WEBjve img, img[src*="googleusercontent"]')
            if (imgEl) photoUrl = imgEl.getAttribute('src')
            // Fallback: CSS background-image
            if (!photoUrl) {
              const bgEl = r.querySelector('[style*="background-image"]')
              if (bgEl) {
                const style = bgEl.getAttribute('style') || ''
                const m = style.match(/url\(["']?([^"')]+)["']?\)/)
                if (m) photoUrl = m[1]
              }
            }
            const text =
              r.querySelector('.MyEned')?.textContent?.trim() ??
              r.querySelector('.wiI7pd')?.textContent?.trim() ??
              null
            const ratingLabel =
              r.querySelector('.kvMYJc')?.getAttribute('aria-label') ??
              r.querySelector('[role="img"][aria-label*="ster"]')?.getAttribute('aria-label') ??
              null
            const date = r.querySelector('.rsqaWe')?.textContent?.trim() ?? null
            if (text && text.length > 15) {
              let rating = null
              if (ratingLabel) {
                const m = ratingLabel.match(/(\d)/)
                if (m) rating = parseInt(m[1], 10)
              }
              out.push({ authorRaw, photoUrl, text, rating, date })
            }
            if (out.length === 6) break
          }
          return out
        })
      }
    } catch (err) {
      // Reviews zijn kern-data: stil falen hindert debugging
      console.warn('[scrape-maps] reviews-scrape faalde:', err?.message ?? err)
    }

    // Parse adres → postcode + city
    let postcode = ''
    let city = ''
    let street = head.addressRaw ?? ''
    if (head.addressRaw) {
      const parts = head.addressRaw.split(',').map((s) => s.trim())
      street = parts[0] ?? ''
      const cityLine = parts[1] ?? ''
      const m = cityLine.match(NL_POSTCODE_RE)
      postcode = m ? m[1] : ''
      city = cityLine.replace(NL_POSTCODE_RE, '').trim()
    }

    // Review-count: aria-label primair (taal-onafhankelijk), JSON-state als fallback.
    let reviewsCount = null
    let countSource = null
    if (head.ariaCountRaw) {
      const m = head.ariaCountRaw.match(/(\d[\d.,\s]*)/)
      if (m) {
        reviewsCount = parseInt(m[1].replace(/[^\d]/g, ''), 10)
        countSource = 'aria-label'
      }
    }
    if ((reviewsCount == null || Number.isNaN(reviewsCount)) && stateCount != null) {
      reviewsCount = stateCount
      countSource = 'app-state-json'
    }

    // Rating: aria/CSS primair, JSON-state als fallback.
    let reviewsRating = head.ariaRating ?? null
    let ratingSource = head.ariaRating != null ? 'aria-label' : null
    if (reviewsRating == null && stateRating != null) {
      reviewsRating = stateRating
      ratingSource = 'app-state-json'
    }

    // Telefoon: DOM-knop primair, JSON-state als fallback.
    const phoneRaw = head.phoneRaw ?? statePhone ?? null

    // Per-veld herkomst: maakt zichtbaar wat echt gescrapet is vs ontbreekt (geen stille gaten).
    const fieldSources = {
      title: head.title ? 'dom-h1' : null,
      phone: head.phoneRaw ? 'dom-button' : statePhone ? 'app-state-json' : null,
      address: head.addressRaw ? 'dom-button' : null,
      website: head.websiteUrl ? 'dom-button' : null,
      rating: ratingSource,
      reviewsCount: countSource,
      reviewSnippets: reviewSnippets.length ? 'dom-reviews-tab' : null,
      category: head.category ? 'dom' : null,
    }

    return {
      title: head.title,
      phoneRaw,
      address: street,
      postcode,
      city,
      mapsUrl: detailUrl,
      hasWebsite: head.hasWebsite,
      websiteUrl: head.websiteUrl,
      reviewsCount,
      reviewsRating,
      reviewSnippets,
      category: head.category,
      fieldSources,
    }
  } finally {
    // finally: browser-proces mag nooit lekken, ook niet bij crash mid-scrape
    await browser.close().catch(() => {})
  }
}
