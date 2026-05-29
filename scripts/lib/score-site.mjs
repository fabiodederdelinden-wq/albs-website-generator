/**
 * 9-factor scoring rubric (visuele factor optioneel).
 * Hogere score = slechtere bestaande site = betere lead.
 *
 * Output: { total: 0-100, breakdown: {...}, sellingPoints: string[] }
 */

const WEIGHTS = {
  perf: 20,
  mobile: 20,
  seo: 10,
  ssl: 5,
  age: 5,
  cta: 5,
  localSeo: 10,
  responsive: 10,
  visual: 15,
}

function scoreLighthousePerf(p) {
  if (p === undefined || p === null) return null
  if (p < 30) return 100
  if (p < 50) return 75
  if (p < 70) return 50
  if (p < 85) return 25
  return 0
}

function scoreLighthouseSeo(s) {
  if (s === undefined || s === null) return null
  if (s < 50) return 100
  if (s < 70) return 60
  if (s < 90) return 25
  return 0
}

function scoreSsl(websiteUrl) {
  if (!websiteUrl) return 50
  return websiteUrl.startsWith('https://') ? 0 : 100
}

function scoreAge(websiteText) {
  if (!websiteText) return 50
  const currentYear = new Date().getFullYear()
  const years = [...websiteText.matchAll(/©\s*(\d{4})/g)].map((m) => parseInt(m[1], 10))
  if (years.length === 0) return 50
  const newest = Math.max(...years)
  const gap = currentYear - newest
  if (gap >= 4) return 100
  if (gap >= 2) return 60
  if (gap >= 1) return 25
  return 0
}

function scoreCta(websiteText) {
  if (!websiteText) return 50
  const hasWa = /wa\.me|whatsapp/i.test(websiteText)
  const hasTel = /tel:|telefoon|bel\s+nu/i.test(websiteText)
  const hasContact = /contact|offerte/i.test(websiteText)
  let hits = 0
  if (hasWa) hits++
  if (hasTel) hits++
  if (hasContact) hits++
  if (hits === 0) return 100
  if (hits === 1) return 60
  if (hits === 2) return 30
  return 0
}

function scoreLocalSeo(websiteText, city) {
  if (!websiteText) return 50
  const targetCities = ['utrecht', 'amsterdam', 'rotterdam', 'eindhoven', 'tilburg', 'almere', 'haarlem', 'groningen', 'den haag', 'arnhem', 'nijmegen']
  const cityRegex = new RegExp(`\\b(${city.toLowerCase()}|${targetCities.join('|')})\\b`, 'gi')
  const matches = websiteText.toLowerCase().match(cityRegex) ?? []
  const unique = new Set(matches).size
  if (unique === 0) return 100
  if (unique === 1) return 60
  if (unique < 4) return 30
  return 0
}

function scoreResponsive(lighthouseMobile) {
  if (lighthouseMobile === undefined || lighthouseMobile === null) return 50
  if (lighthouseMobile < 30) return 100
  if (lighthouseMobile < 60) return 60
  if (lighthouseMobile < 85) return 25
  return 0
}

/**
 * @param {{
 *   lighthouse?: { performance?: number, seo?: number, mobile?: number },
 *   websiteUrl?: string,
 *   websiteText?: string,
 *   city?: string,
 *   visualScore?: number | null
 * }} input
 */
export function scoreSite(input) {
  const lh = input.lighthouse ?? {}
  const breakdown = {
    perf: scoreLighthousePerf(lh.performance),
    mobile: scoreResponsive(lh.mobile ?? lh.performance),
    seo: scoreLighthouseSeo(lh.seo),
    ssl: scoreSsl(input.websiteUrl ?? null),
    age: scoreAge(input.websiteText ?? ''),
    cta: scoreCta(input.websiteText ?? ''),
    localSeo: scoreLocalSeo(input.websiteText ?? '', input.city ?? 'Utrecht'),
    responsive: scoreResponsive(lh.mobile ?? lh.performance),
    visual: input.visualScore ?? null,
  }

  // weighted total, normaliseer over non-null factoren
  let sumWeights = 0
  let sumWeighted = 0
  for (const [k, v] of Object.entries(breakdown)) {
    if (v === null) continue
    const w = WEIGHTS[k] ?? 0
    sumWeights += w
    sumWeighted += w * v
  }
  const total = sumWeights > 0 ? Math.round(sumWeighted / sumWeights) : 50

  const sellingPoints = []
  if ((breakdown.perf ?? 0) >= 60) sellingPoints.push(`Hun site is traag (perf ${lh.performance}/100), wij halen 90+`)
  if ((breakdown.mobile ?? 0) >= 60) sellingPoints.push('Hun site werkt slecht op mobiel')
  if ((breakdown.cta ?? 0) >= 60) sellingPoints.push('Geen duidelijke WhatsApp- of contact-knop')
  if ((breakdown.localSeo ?? 0) >= 60) sellingPoints.push('Geen regio-vermeldingen voor lokale SEO')
  if ((breakdown.age ?? 0) >= 60) sellingPoints.push('Site lijkt 2+ jaar niet bijgewerkt')
  if ((breakdown.ssl ?? 0) >= 60) sellingPoints.push('Geen HTTPS — onveiligheids-signaal in browser')

  return { total, breakdown, sellingPoints: sellingPoints.slice(0, 3) }
}

export function bucketFromScore(total, hasWebsite) {
  if (!hasWebsite) return 'A'
  if (total < 30) return 'C'
  if (total < 60) return 'B'
  return 'A'
}
