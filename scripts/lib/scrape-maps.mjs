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

    await browser.close()
    return cards.filter((c) => c.name && c.href)
  } catch (err) {
    await browser.close()
    throw err
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
    } catch {}

    await page.waitForTimeout(3000)

    const head = await page.evaluate(() => {
      const title = document.querySelector('h1')?.textContent?.trim() ?? null
      const websiteBtn = document.querySelector('a[data-item-id="authority"]')
      const phoneBtn = document.querySelector('button[data-item-id^="phone:tel:"]')
      const addressBtn = document.querySelector('button[data-item-id="address"]')
      const ratingEl = document.querySelector('div.F7nice span[aria-hidden="true"]')
      const ratingTxt = ratingEl?.textContent?.trim() ?? null
      const reviewsCountEl = document.querySelector('div.F7nice span:nth-child(2)')
      const reviewsCountTxt = reviewsCountEl?.textContent?.trim() ?? null
      const categoryEl = document.querySelector('button.DkEaL')
      return {
        title,
        websiteUrl: websiteBtn?.getAttribute('href') ?? null,
        hasWebsite: !!websiteBtn,
        phoneRaw: phoneBtn?.getAttribute('aria-label')?.replace(/^Phone:\s*|^Telefoon:\s*/i, '') ?? null,
        addressRaw:
          addressBtn?.getAttribute('aria-label')?.replace(/^Address:\s*|^Adres:\s*/i, '') ?? null,
        reviewsRating: ratingTxt ? parseFloat(ratingTxt.replace(',', '.')) : null,
        reviewsCountRaw: reviewsCountTxt,
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
        } catch {}

        // Klik "Meer/More" buttons om volledige review-tekst te tonen
        try {
          const moreButtons = page.locator('button.w8nwRe.kyuRq')
          const count = await moreButtons.count()
          for (let i = 0; i < Math.min(count, 6); i++) {
            await moreButtons.nth(i).click({ timeout: 800 }).catch(() => {})
          }
        } catch {}

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
    } catch {
      /* reviews-tab niet beschikbaar */
    }

    await browser.close()

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

    // Parse reviewsCount uit string "(123)"
    let reviewsCount = null
    if (head.reviewsCountRaw) {
      const m = head.reviewsCountRaw.match(/(\d[\d.,]*)/)
      if (m) reviewsCount = parseInt(m[1].replace(/[^\d]/g, ''), 10)
    }

    return {
      title: head.title,
      phoneRaw: head.phoneRaw,
      address: street,
      postcode,
      city,
      mapsUrl: detailUrl,
      hasWebsite: head.hasWebsite,
      websiteUrl: head.websiteUrl,
      reviewsCount,
      reviewsRating: head.reviewsRating,
      reviewSnippets,
      category: head.category,
    }
  } catch (err) {
    await browser.close()
    throw err
  }
}
