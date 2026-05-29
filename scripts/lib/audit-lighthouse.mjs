/**
 * Lighthouse-audit van bestaande klant-website.
 * Vertaal scores naar klant-taal (uit brainstorm-feedback van Klaas).
 *
 * Output:
 *   { url, scores: { performance, seo, accessibility, mobile },
 *     verbeterpunten: [{ titel, klant_uitleg, impact }] }
 */

import { execSync } from 'node:child_process'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const TIMEOUT_MS = 90_000

export async function auditSite(url) {
  if (!url) return null
  const tmpFile = path.join(tmpdir(), `lhr-${Date.now()}-${Math.random().toString(36).slice(2)}.json`)
  try {
    // npx lighthouse — gebruikt globale of lokale install. Headless-chrome shared zou kunnen via --port,
    // maar voor 1-shot is gewoon nieuwe instance OK.
    execSync(
      `npx --yes lighthouse "${url}" --quiet --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="${tmpFile}" --only-categories=performance,seo,accessibility,best-practices --max-wait-for-load=30000`,
      { timeout: TIMEOUT_MS, stdio: 'pipe' },
    )
    const json = JSON.parse(await readFile(tmpFile, 'utf8'))

    const perf = Math.round((json.categories?.performance?.score ?? 0) * 100)
    const seo = Math.round((json.categories?.seo?.score ?? 0) * 100)
    const a11y = Math.round((json.categories?.accessibility?.score ?? 0) * 100)
    const bp = Math.round((json.categories?.['best-practices']?.score ?? 0) * 100)

    // Klant-taal vertaalingen
    const fcp = json.audits?.['first-contentful-paint']?.numericValue ?? null
    const lcp = json.audits?.['largest-contentful-paint']?.numericValue ?? null
    const tbt = json.audits?.['total-blocking-time']?.numericValue ?? null
    const cls = json.audits?.['cumulative-layout-shift']?.numericValue ?? null
    const viewport = json.audits?.['viewport']?.score ?? null
    const httpsAudit = json.audits?.['is-on-https']?.score ?? null

    const verbeterpunten = []

    if (lcp && lcp > 2500) {
      const seconds = (lcp / 1000).toFixed(1)
      verbeterpunten.push({
        titel: 'Site laadt te traag',
        klant_uitleg: `Belangrijkste content verschijnt pas na ${seconds} seconden. Klanten haken bij meer dan 3 seconden vaak af.`,
        impact: 'hoog',
      })
    }
    if (cls && cls > 0.1) {
      verbeterpunten.push({
        titel: 'Pagina springt tijdens laden',
        klant_uitleg: 'Knoppen en tekst verschuiven terwijl de pagina laadt. Klanten klikken dan per ongeluk verkeerd.',
        impact: 'med',
      })
    }
    if (tbt && tbt > 300) {
      verbeterpunten.push({
        titel: 'Pagina reageert traag',
        klant_uitleg: 'Bij klikken duurt het seconden voor er iets gebeurt. Klanten denken dat de site stuk is.',
        impact: 'med',
      })
    }
    if (viewport === 0) {
      verbeterpunten.push({
        titel: 'Werkt slecht op mobiel',
        klant_uitleg: '70% van klanten zoekt op telefoon. Site is niet mobiel-geoptimaliseerd, dus klanten zien een mini-versie van de desktop.',
        impact: 'hoog',
      })
    }
    if (httpsAudit === 0) {
      verbeterpunten.push({
        titel: 'Geen beveiligde verbinding',
        klant_uitleg: 'Browser toont "Niet veilig" boven jouw site. Klanten vertrouwen dat niet.',
        impact: 'hoog',
      })
    }
    if (seo < 80) {
      verbeterpunten.push({
        titel: 'Google vindt jouw site niet goed',
        klant_uitleg: `SEO-score is ${seo}/100. Klanten die zoeken op "${url.split('//')[1]?.split('/')[0] ?? 'jouw dienst'}" vinden eerst de concurrent.`,
        impact: 'hoog',
      })
    }
    if (a11y < 80) {
      verbeterpunten.push({
        titel: 'Niet toegankelijk voor iedereen',
        klant_uitleg: 'Slechtzienden of ouderen kunnen de site moeilijk gebruiken. Dat is ook ~10% van jouw potentiele klanten.',
        impact: 'med',
      })
    }

    // Overall verbetering-score (0-100, hoger = meer verbetering nodig)
    const verbeteringScore = Math.min(
      100,
      verbeterpunten.filter((p) => p.impact === 'hoog').length * 30 +
        verbeterpunten.filter((p) => p.impact === 'med').length * 15 +
        Math.max(0, 100 - perf) / 2 +
        Math.max(0, 100 - seo) / 4,
    )

    return {
      url,
      scores: { performance: perf, seo, accessibility: a11y, bestPractices: bp },
      metrics: { fcp, lcp, tbt, cls },
      verbeterpunten,
      verbeteringScore: Math.round(verbeteringScore),
    }
  } catch (err) {
    return { url, error: err?.message ?? String(err) }
  }
}
