/**
 * Scrape email + KvK + logo + services-list van bestaande klant-website.
 * Strict: alleen zakelijke domains, geen Gmail/Hotmail/Live.
 * Logo: og:image > link[rel=icon] > img[alt*=logo], met sharp size-check.
 */

import * as cheerio from 'cheerio'
import sharp from 'sharp'

/**
 * Strenger filter: alleen echte service-titels (geen tagline-fragmenten).
 * Eisen:
 *   - 4-50 chars
 *   - ≤ 4 woorden
 *   - geen vraagteken / dubbele punt
 *   - geen tagline-keywords ("hoor", "lees", "uw", "ons", "wat", "hoe", "waar", "klanten" etc.)
 *   - niche-overlap-boost wordt door caller toegevoegd indien gewenst
 */
function filterRealServices(raw) {
  const STOP_TOKENS = [
    'klant', 'klanten', 'horen', 'hoor', 'lees', 'zie', 'kijk', 'volg',
    'uw', 'ons', 'jullie', 'jij', 'jouw',
    'wat', 'hoe', 'waar', 'wanneer', 'waarom',
    'welkom', 'home', 'menu', 'contact', 'over', 'reviews', 'beoordelingen',
    'nieuws', 'blog', 'algemeen', 'privacy', 'sitemap', 'cookies', 'voorwaarden',
    'team', 'partners',
  ]
  const cleaned = raw
    .map((s) => String(s).replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const out = []
  const seen = new Set()
  for (const s of cleaned) {
    if (s.length < 4 || s.length > 50) continue
    if (s.includes('?') || s.includes(':') || s.includes('!')) continue
    const wordCount = s.split(/\s+/).length
    if (wordCount > 4) continue
    const low = s.toLowerCase()
    if (STOP_TOKENS.some((t) => new RegExp(`\\b${t}\\b`).test(low))) continue
    if (seen.has(low)) continue
    seen.add(low)
    out.push(s)
  }
  return out.slice(0, 8)
}

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.nl',
  'live.nl',
  'live.com',
  'outlook.com',
  'outlook.nl',
  'yahoo.com',
  'yahoo.nl',
  'icloud.com',
  'me.com',
  'mac.com',
  'msn.com',
  'planet.nl',
  'xs4all.nl',
  'home.nl',
  'kpnmail.nl',
  'ziggo.nl',
])

// KvK-detectie: 8-cijferig nummer binnen 50 chars na KvK-keyword. Soms staat het op
// een andere regel, dus we strippen \s in lookup-fase.
const KVK_RE = /\b(?:KvK|K\.v\.K\.?|Kamer\s*van\s*Koophandel|KVK)[\s:\-\.\,]*?(\d{8})\b/i
const KVK_RE_FALLBACK = /\b(?:KvK|KVK)\b[\s\S]{0,80}?(\d{8})/i
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi

async function fetchHtml(url, timeoutMs = 10000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  } finally {
    clearTimeout(t)
  }
}

export function pickBusinessEmail(allEmails) {
  if (!allEmails || allEmails.length === 0) return null
  const lower = allEmails.map((e) => e.toLowerCase())
  // Liever info@/contact@/hallo@ etc.
  const preferred = lower.find((e) => /^(info|contact|hallo|email|office|sales)@/.test(e))
  if (preferred) return preferred
  // Filter personal domains
  const business = lower.filter((e) => {
    const domain = e.split('@')[1]
    return domain && !PERSONAL_EMAIL_DOMAINS.has(domain)
  })
  return business[0] ?? null
}

export async function scrapeWebsite(baseUrl) {
  const pages = [baseUrl]
  for (const path of [
    '/contact', '/contact.html', '/contactgegevens', '/contact-us',
    '/over-ons', '/over', '/over-mij', '/about',
    '/diensten', '/services', '/aanbod', '/werkzaamheden', '/wat-wij-doen', '/specialisme',
    '/algemene-voorwaarden', '/voorwaarden', '/disclaimer', '/impressum',
  ]) {
    try {
      const u = new URL(path, baseUrl).toString()
      pages.push(u)
    } catch {}
  }

  let allEmails = []
  let kvk = null
  let logoUrl = null
  let services = []
  let companyDescription = null
  let companyTagline = null
  let ownerPhotoUrl = null
  let ownerName = null
  const errors = []

  for (const url of pages) {
    const html = await fetchHtml(url)
    if (!html) {
      errors.push({ url, err: 'fetch-failed' })
      continue
    }
    const $ = cheerio.load(html)

    // Emails
    const text = $('body').text()
    const matches = text.match(EMAIL_RE) ?? []
    for (const m of matches) {
      if (!allEmails.includes(m.toLowerCase())) allEmails.push(m.toLowerCase())
    }

    // KvK — strikte regex eerst, dan fallback met bredere context
    if (!kvk) {
      const m1 = text.match(KVK_RE)
      if (m1) kvk = m1[1]
      else {
        const m2 = text.match(KVK_RE_FALLBACK)
        if (m2) kvk = m2[1]
      }
    }

    // Logo — alleen op homepage
    if (url === baseUrl && !logoUrl) {
      const og = $('meta[property="og:image"]').attr('content')
      const iconPng = $('link[rel*="icon"][type="image/png"]').first().attr('href')
      const iconAny = $('link[rel*="icon"]').first().attr('href')
      const imgLogo = $('img[alt*="logo" i], img[src*="logo" i], img[class*="logo" i]').first().attr('src')
      const candidate = og ?? imgLogo ?? iconPng ?? iconAny ?? null
      if (candidate) {
        try {
          logoUrl = new URL(candidate, baseUrl).toString()
        } catch {}
      }
    }

    // Services — eerst smal (services-pagina), fallback breed (homepage h2/h3)
    if (url.includes('diensten') || url.includes('services') || url.includes('aanbod') || url.includes('werkzaamheden') || url.includes('specialisme') || url.includes('wat-wij-doen')) {
      $('h2, h3').each((_i, el) => {
        const t = $(el).text().trim()
        if (t.length > 3 && t.length < 60) services.push(t)
      })
    }

    // Owner/team-foto detectie op over-ons/team-pagina's
    if (
      !ownerPhotoUrl &&
      (url.includes('over-ons') || url.includes('over') || url.includes('team') || url.includes('wie-zijn-wij'))
    ) {
      // 1) JSON-LD Person/Organization founder.image
      $('script[type="application/ld+json"]').each((_i, el) => {
        if (ownerPhotoUrl) return
        try {
          const json = JSON.parse($(el).contents().text())
          const arr = Array.isArray(json) ? json : [json]
          for (const item of arr) {
            const img = item?.founder?.image ?? item?.image
            if (typeof img === 'string') {
              try {
                ownerPhotoUrl = new URL(img, baseUrl).toString()
              } catch {}
            }
            if (item?.founder?.name && !ownerName) ownerName = item.founder.name
          }
        } catch {}
      })

      // 2) Foto met alt-text die "eigenaar"/"oprichter"/"team" bevat
      if (!ownerPhotoUrl) {
        $('img').each((_i, el) => {
          if (ownerPhotoUrl) return
          const alt = ($(el).attr('alt') ?? '').toLowerCase()
          const src = $(el).attr('src') ?? ''
          const keywords = ['eigenaar', 'oprichter', 'founder', 'team', 'directeur', 'medewerker', 'over ons']
          if (keywords.some((k) => alt.includes(k)) && src) {
            try {
              const u = new URL(src, baseUrl).toString()
              // Skip kleine icons en banners
              if (!/icon|logo|banner|hero|background/i.test(src)) {
                ownerPhotoUrl = u
              }
            } catch {}
          }
        })
      }

      // 3) Eerste grote foto na h1/h2 met "over" in tekst
      if (!ownerPhotoUrl) {
        $('h1, h2, h3').each((_i, el) => {
          if (ownerPhotoUrl) return
          const heading = $(el).text().toLowerCase()
          if (/over|wie zijn wij|ons team|onze mensen/i.test(heading)) {
            const img = $(el).nextAll('img').first().attr('src') ?? $(el).parent().find('img').first().attr('src')
            if (img) {
              try {
                ownerPhotoUrl = new URL(img, baseUrl).toString()
              } catch {}
            }
          }
        })
      }
    }

    // Bedrijf-info (meta description + tagline)
    if (url === baseUrl) {
      const metaDesc =
        $('meta[name="description"]').attr('content') ??
        $('meta[property="og:description"]').attr('content') ??
        null
      if (metaDesc && metaDesc.length > 20 && metaDesc.length < 300) {
        companyDescription = metaDesc.trim()
      }
      // Tagline: eerste h1 of h2 op homepage
      const h1 = $('h1').first().text().trim()
      if (h1 && h1.length > 5 && h1.length < 100) {
        companyTagline = h1
      }
    }
  }

  // Fallback: scrape homepage h2/h3 als nog geen services gevonden
  if (services.length === 0) {
    const homeHtml = await fetchHtml(baseUrl)
    if (homeHtml) {
      const $ = cheerio.load(homeHtml)
      $('h2, h3').each((_i, el) => {
        const t = $(el).text().trim()
        services.push(t)
      })
    }
  }

  services = filterRealServices(services)

  return {
    emails: allEmails,
    businessEmail: pickBusinessEmail(allEmails),
    kvk,
    logoUrl,
    services: services.slice(0, 8),
    companyDescription,
    companyTagline,
    ownerPhotoUrl,
    ownerName,
    errors,
  }
}

export async function downloadAndCheckLogo(logoUrl) {
  if (!logoUrl) return null
  try {
    const res = await fetch(logoUrl, {
      headers: { 'User-Agent': 'ALBS-bot/1.0' },
      redirect: 'follow',
    })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const meta = await sharp(buf).metadata().catch(() => null)
    if (!meta) return null
    if ((meta.width ?? 0) < 32 || (meta.height ?? 0) < 32) return null
    return { buffer: buf, width: meta.width, height: meta.height, format: meta.format }
  } catch {
    return null
  }
}
