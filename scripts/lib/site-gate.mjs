/**
 * Site-gate: kwaliteits- en compliance-poort die NA build en VÓÓR deploy draait.
 * Een site die het skelet-contract niet haalt, gaat niet live. Dit voorkomt
 * structureel wat eerder misging (site zonder echte footer, dode links, lekken).
 *
 * Checkt de statisch gegenereerde output in <siteDir>/.next/server/app/.
 */

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function tryRead(p) {
  try {
    return await readFile(p, 'utf8')
  } catch {
    return null
  }
}

export async function runSiteGate({ siteDir, siteMode = 'preview', reportPath = null }) {
  const appDir = path.join(siteDir, '.next/server/app')
  const failures = []
  const warnings = []

  const index = await tryRead(path.join(appDir, 'index.html'))
  const privacy = await tryRead(path.join(appDir, 'privacy.html'))
  const cookies = await tryRead(path.join(appDir, 'cookies.html'))
  const robots = await tryRead(path.join(appDir, 'robots.txt.body'))
  const sitemap = await tryRead(path.join(appDir, 'sitemap.xml.body'))
  const manifest = await tryRead(path.join(appDir, 'manifest.webmanifest.body'))

  if (!index) failures.push('index.html ontbreekt in build-output')
  if (!privacy) failures.push('privacy.html ontbreekt (wettelijk verplicht)')
  if (!cookies) failures.push('cookies.html ontbreekt (wettelijk verplicht)')
  if (!sitemap) warnings.push('sitemap.xml ontbreekt')
  if (!manifest) warnings.push('manifest.webmanifest ontbreekt')

  if (index) {
    // Footer-contract
    if (!index.includes('<footer')) failures.push('geen <footer> op homepage')
    if (!/href="tel:\+?[0-9]/.test(index)) failures.push('geen tel:-link op homepage')
    if (!index.includes('href="/privacy"')) failures.push('geen privacy-link op homepage')
    if (!index.includes('href="/cookies"')) failures.push('geen cookies-link op homepage')

    // SEO-skelet
    if (!index.includes('application/ld+json')) failures.push('geen JSON-LD LocalBusiness')
    if (!index.includes('property="og:title"')) failures.push('geen og:title')
    if (!index.includes('property="og:image"')) failures.push('geen og:image')
    if (!index.includes('rel="icon"')) failures.push('geen favicon')
    if (!index.includes('rel="canonical"')) warnings.push('geen canonical URL')

    // Nav-anchors moeten targets hebben (dode-link-preventie)
    for (const anchor of index.match(/href="\/#([a-z-]+)"/g) ?? []) {
      const id = anchor.match(/#([a-z-]+)/)[1]
      if (!index.includes(`id="${id}"`)) failures.push(`nav-anchor /#${id} heeft geen target-id`)
    }

    // Heading-hygiëne: exact 1 h1 (a11y/SEO). >1 is een gate-failure (GOAL: a11y > 95).
    const h1Count = (index.match(/<h1[\s>]/g) ?? []).length
    if (h1Count === 0) failures.push('geen <h1> op homepage')
    else if (h1Count > 1) failures.push(`${h1Count}× <h1> op homepage (precies 1 vereist)`)

    // A11y: lang-attribuut + alt op alle content-afbeeldingen.
    if (!/<html[^>]*\slang=/.test(index)) failures.push('html-element mist lang-attribuut')
    const imgsNoAlt = (index.match(/<img(?![^>]*\salt=)[^>]*>/g) ?? []).length
    if (imgsNoAlt > 0) failures.push(`${imgsNoAlt}× <img> zonder alt-attribuut (a11y)`)
  }

  // Robots-gedrag moet bij de modus passen
  if (robots) {
    const blocksAll = /Disallow:\s*\/\s*$/m.test(robots)
    if (siteMode === 'preview' && !blocksAll)
      failures.push('preview-site is indexeerbaar (robots.txt mist Disallow: /)')
    if (siteMode === 'live' && blocksAll)
      failures.push('live-site blokkeert indexering (robots.txt heeft Disallow: /)')
  } else {
    failures.push('robots.txt ontbreekt')
  }

  // Lek-scans over ALLE gegenereerde HTML
  let htmlFiles = []
  try {
    htmlFiles = (await readdir(appDir)).filter((f) => f.endsWith('.html'))
  } catch {
    failures.push(`build-output dir onleesbaar: ${appDir}`)
  }
  for (const f of htmlFiles) {
    const html = await tryRead(path.join(appDir, f))
    if (!html) continue
    if (html.includes('{{')) failures.push(`${f}: onvervangen {{PLACEHOLDER}} in output`)
    if (html.includes('googleusercontent'))
      failures.push(`${f}: reviewer-foto-URL (googleusercontent) in output — AVG`)
    if (html.includes('••••')) failures.push(`${f}: gemaskeerde KvK-placeholder in output`)
    if (/fonts\.(googleapis|gstatic)\.com/.test(html))
      failures.push(`${f}: externe Google Fonts-call (hoort self-hosted)`)
  }

  // Live-modus: volledige wettelijke vermeldingen verplicht (art. 3:15d BW)
  if (siteMode === 'live' && index) {
    if (!/KvK/i.test(index)) failures.push('live-site zonder KvK-vermelding (art. 3:15d)')
    if (!/href="mailto:/.test(index)) warnings.push('live-site zonder e-mail-link (art. 3:15d: e-mailadres verplicht)')
  }

  const report = {
    ts: new Date().toISOString(),
    siteDir,
    siteMode,
    pass: failures.length === 0,
    failures,
    warnings,
    checkedHtmlFiles: htmlFiles.length,
  }
  if (reportPath) await writeFile(reportPath, JSON.stringify(report, null, 2))
  return report
}
