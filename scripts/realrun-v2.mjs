#!/usr/bin/env node
/**
 * ALBS realrun v2 — modulaire end-to-end pipeline met echte data.
 *
 * Flow per lead:
 *   1. scrape Maps detail + 3 review-snippets (AVG-strip)
 *   2. score (A=geen-site, B=site-aanwezig → audit)
 *   3. als bestaande site → scrape website (email/kvk/logo/services) + Lighthouse-audit
 *   4. KvK fallback via openkvk indien geen kvk uit website
 *   5. logo → color-thief → primary/accent (fallback niche-default)
 *   6. verify (deterministisch: phone-format, MX-lookup, kvk-format, postcode)
 *   7. SKIP als geen tel + geen email
 *   8. render template met placeholders (incl. reviews + projects)
 *   9. build + Vercel deploy
 *  10. bellijst.csv + audit-rapport (Bucket B) + Telegram
 *
 * Eén lead per invocation. CLI:
 *   node scripts/realrun-v2.mjs [niche=loodgieter] [stad=Utrecht]
 */

import './lib/load-env.mjs' // .env.local/.env → process.env (vóór alles dat env leest)
import { mkdir, writeFile, readFile, cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { searchLeads, fetchLeadDetail, activeProviderName } from './lib/providers/leaddata/index.mjs'
import { scrapeWebsite, downloadAndCheckLogo } from './lib/scrape-website.mjs'
import { lookupKvk } from './lib/scrape-kvk.mjs'
import { extractColorsFromLogo, nicheDefaultColors } from './lib/extract-color.mjs'
import { ensureReadableOnWhite } from './lib/contrast.mjs'
import { verifyLead, verifyPhoneNL } from './lib/verify.mjs'
import { auditSite } from './lib/audit-lighthouse.mjs'
import { renderTemplate } from './lib/render-template.mjs'
import { buildSite, deployVercel } from './lib/deploy-vercel.mjs'
import { runSiteGate } from './lib/site-gate.mjs'
import { anonymizeAuthor, initialsAvatar } from './lib/anonymize.mjs'
import { generateReviews, reviewsAggregate } from './lib/generate-reviews.mjs'
import { assessLead } from './lib/lead-completeness.mjs'
import { appendLegalLog } from './lib/legal-log.mjs'
import { scoreSite, bucketFromScore } from './lib/score-site.mjs'
import { pickSmartTemplate } from './lib/smart-template-pick.mjs'
import { recordAsset, TRUST } from './lib/asset-provenance.mjs'
import { validateLogo, adjustTrustFromValidation } from './lib/validate-logo.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const TEMPLATE = path.join(REPO_ROOT, 'templates', 'vakman-basis-v1')
const TS = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const NICHE = process.argv[2] ?? 'loodgieter'
const STAD = process.argv[3] ?? 'Utrecht'
const SKIP_CSV = process.env.ALBS_SKIP_MAPS_URLS ?? '' // comma-separated mapsUrls to skip
const SKIP_SET = new Set(SKIP_CSV.split(',').filter(Boolean))
const RUN_TAG = process.env.ALBS_RUN_TAG ?? `realrun-v2-${TS}`
const RUN_DIR = path.join(REPO_ROOT, 'runs', RUN_TAG)

const log = (msg, data = {}) => console.log(JSON.stringify({ ts: new Date().toISOString(), msg, ...data }))
const writeJson = async (rel, data) => {
  const p = path.join(RUN_DIR, rel)
  await mkdir(path.dirname(p), { recursive: true })
  await writeFile(p, JSON.stringify(data, null, 2))
  return p
}

// Niche-default projecten (Pexels stockfoto's, gemarkeerd als voorbeeld)
const NICHE_PROJECTS = {
  loodgieter: [
    { title: 'CV-installatie', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg?w=800' },
    { title: 'Lekkage hersteld', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?w=800' },
    { title: 'Badkamerrenovatie', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6585749/pexels-photo-6585749.jpeg?w=800' },
    { title: 'Boilervervanging', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/5025619/pexels-photo-5025619.jpeg?w=800' },
    { title: 'Sanitair installatie', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/8005400/pexels-photo-8005400.jpeg?w=800' },
    { title: 'Ontstopping', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?w=800' },
  ],
  installateur: [
    { title: 'Elektra-installatie', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6790975/pexels-photo-6790975.jpeg?w=800' },
    { title: 'Meterkast', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6790977/pexels-photo-6790977.jpeg?w=800' },
    { title: 'Verlichting', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?w=800' },
  ],
  schilder: [
    { title: 'Buitenschilderwerk', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/8092434/pexels-photo-8092434.jpeg?w=800' },
    { title: 'Binnenmuur', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg?w=800' },
    { title: 'Kozijnen', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6312361/pexels-photo-6312361.jpeg?w=800' },
  ],
  hovenier: [
    { title: 'Tuinaanleg', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=800' },
    { title: 'Bestrating', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=800' },
    { title: 'Beplanting', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/6231778/pexels-photo-6231778.jpeg?w=800' },
  ],
  __default: [
    { title: 'Project', caption: 'Voorbeeld', imageUrl: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?w=800' },
  ],
}

/**
 * Niche → layout-variant. A=Urgent, B=Vakwerk, C=Visual, D=Simpel.
 * Per T3-research mapping.
 */
function pickLayoutVariant(niche) {
  const map = {
    loodgieter: 'A',
    dakdekker: 'A',
    installateur: 'A',
    'cv-monteur': 'A',
    glazenwasser: 'A',
    elektricien: 'A',

    aannemer: 'B',
    schilder: 'B',
    stukadoor: 'B',
    timmerman: 'B',

    hovenier: 'C',
    klusbedrijf: 'C',
  }
  return map[String(niche ?? '').toLowerCase()] ?? 'B'
}

/**
 * Random intro-preset 1..10 (variety per klant).
 */
function pickIntroPreset() {
  return Math.floor(Math.random() * 10) + 1
}

function nicheServices(niche) {
  const map = {
    loodgieter: ['CV-installatie', 'Sanitair', 'Lekkages', 'Ontstopping', 'Boiler-onderhoud', 'Renovatie'],
    installateur: ['Elektra-installatie', 'Meterkast', 'Verlichting', 'Storingen', 'Renovatie', 'Smart-home'],
    schilder: ['Buitenschilderwerk', 'Binnenwanden', 'Kozijnen', 'Plafonds', 'Behangen', 'Houtwerk-onderhoud'],
    hovenier: ['Tuinontwerp', 'Bestrating', 'Beplanting', 'Onderhoud', 'Schuttingen', 'Vijvers'],
    aannemer: ['Renovatie', 'Aan- of uitbouw', 'Verbouwing', 'Casco-bouw', 'Dakwerk', 'Tegelwerk'],
  }
  return map[niche] ?? ['Vakwerk algemeen']
}

async function main() {
  await mkdir(RUN_DIR, { recursive: true })
  log('run.start', { runDir: RUN_DIR, niche: NICHE, stad: STAD })

  // 1. Lead-lijst via actieve provider (Places API als key aanwezig, anders Maps-scrape)
  const leadProvider = activeProviderName()
  const cards = await searchLeads(NICHE, STAD, 15)
  log('step1.list', { count: cards.length, provider: leadProvider })
  await appendLegalLog({
    runId: path.basename(RUN_DIR),
    source: 'google-maps',
    legalBasis: 'art-6-1-f-gerechtvaardigd-belang',
    records: cards.length,
    retentionDays: 90,
    note: `niche=${NICHE} stad=${STAD}`,
  })

  let mapsDetail = null
  let websiteData = null
  let chosenCard = null

  for (const card of cards) {
    if (SKIP_SET.has(card.ref)) continue
    const detail = await fetchLeadDetail(card.ref)
    if (!detail.title || !detail.phoneRaw) continue

    // Score & decide bucket
    if (!detail.hasWebsite) {
      // Bucket A — direct take
      chosenCard = card
      mapsDetail = detail
      break
    }

    // Bucket B — scrape website + audit
    const web = await scrapeWebsite(detail.websiteUrl)
    log('step1.web-scrape', { url: detail.websiteUrl, email: web.businessEmail, kvk: web.kvk, services: web.services.length })

    // Bucket B accept als email of kvk vindbaar (anders niet de moeite waard)
    if (web.businessEmail || web.kvk) {
      chosenCard = card
      mapsDetail = detail
      websiteData = web
      break
    }
  }

  if (!chosenCard || !mapsDetail) {
    log('run.fail', { reason: 'no-eligible-lead' })
    throw new Error('Geen geschikte lead gevonden')
  }

  await writeJson('maps.json', mapsDetail)
  if (websiteData) await writeJson('website.json', websiteData)

  const bucket = mapsDetail.hasWebsite ? 'B' : 'A'
  log('step2.bucket', { bucket })

  // 3. KvK-lookup via openkvk indien nog niet gevonden
  let kvkNumber = websiteData?.kvk ?? null
  if (!kvkNumber) {
    const kvkResult = await lookupKvk(mapsDetail.title, mapsDetail.postcode)
    kvkNumber = kvkResult?.kvkNumber ?? null
    log('step3.kvk', kvkResult)
    await appendLegalLog({
      runId: path.basename(RUN_DIR),
      source: 'kvk-api',
      legalBasis: 'art-6-1-f-gerechtvaardigd-belang',
      records: kvkNumber ? 1 : 0,
      retentionDays: 365,
      note: `lookup voor ${mapsDetail.title}`,
    })
  }

  // 4. Logo + colors met bron-tracking + vision-validatie
  let colors = null
  let logoTrust = TRUST.NICHE_DEFAULT
  let logoValidation = null
  if (websiteData?.logoUrl) {
    const logoFile = await downloadAndCheckLogo(websiteData.logoUrl)
    if (logoFile) {
      const ext = logoFile.format ?? 'png'
      await writeFile(path.join(RUN_DIR, `logo.${ext}`), logoFile.buffer)
      colors = await extractColorsFromLogo(logoFile.buffer)

      const baseTrust = TRUST.WEBSITE_HEADER_LOGO
      logoValidation = await validateLogo({
        logoBuffer: logoFile.buffer,
        mimeType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        businessName: mapsDetail.title,
      })
      logoTrust = adjustTrustFromValidation(baseTrust, logoValidation)
      await recordAsset(RUN_DIR, {
        type: 'logo',
        sourceUrl: websiteData.logoUrl,
        trustScore: baseTrust,
        effectiveTrust: logoTrust,
        validation: logoValidation,
        savedAs: `logo.${ext}`,
      })
      if (colors) {
        await recordAsset(RUN_DIR, {
          type: 'color',
          sourceUrl: websiteData.logoUrl,
          trustScore: logoTrust,
          effectiveTrust: logoTrust,
          colors,
        })
      }
    }
  }
  if (!colors) {
    colors = nicheDefaultColors(NICHE)
    await recordAsset(RUN_DIR, {
      type: 'color',
      sourceUrl: 'niche-default',
      trustScore: TRUST.NICHE_DEFAULT,
      effectiveTrust: TRUST.NICHE_DEFAULT,
      colors,
      note: `niche-default for ${NICHE}`,
    })
  }
  // 4b. Contrast-guard: de meeste secties hebben een lichte achtergrond. Een te
  // lichte primaryColor (felgeel, lichtgroen) als tekst/accent op wit is dan
  // onleesbaar. Donker de kleur precies genoeg om WCAG 4.5:1 te halen, tint blijft.
  const contrastFix = ensureReadableOnWhite(colors.primary, 4.5)
  if (contrastFix.adjusted) {
    log('step4b.contrast-guard', { from: colors.primary, to: contrastFix.color, ratio: Number(contrastFix.ratio.toFixed(2)) })
    colors = { ...colors, primary: contrastFix.color, primaryOriginal: colors.primary }
  }
  log('step4.colors', { colors, logoTrust, validation: logoValidation })

  // 5. Verify (deterministisch)
  const phoneVerify = verifyPhoneNL(mapsDetail.phoneRaw)
  const verifyInput = {
    phoneRaw: mapsDetail.phoneRaw,
    businessEmail: websiteData?.businessEmail ?? null,
    kvkNumber,
    postcode: mapsDetail.postcode,
  }
  const verify = await verifyLead(verifyInput)
  await writeJson('verify.json', verify)
  log('step5.verify', { ok: verify.ok, errors: verify.errors })

  if (!verify.reachable) {
    log('run.skip', { reason: 'no-reachable-contact' })
    await writeJson('summary.json', { skipped: true, reason: 'no-reachable-contact', verify })
    return
  }

  // 6. Lighthouse-audit als Bucket B
  let auditReport = null
  if (bucket === 'B' && mapsDetail.websiteUrl) {
    log('step6.audit.start', { url: mapsDetail.websiteUrl })
    auditReport = await auditSite(mapsDetail.websiteUrl)
    if (auditReport) await writeJson('audit.json', auditReport)
  }

  // 7. Render template — reviews transformeren naar wire-format (AVG-veilig)
  const services = websiteData?.services?.length ? websiteData.services : nicheServices(NICHE)
  const projects = NICHE_PROJECTS[NICHE] ?? NICHE_PROJECTS.__default
  const reviewWire = (mapsDetail.reviewSnippets ?? [])
    .filter((r) => r && r.text)
    .map((r) => ({
      author: anonymizeAuthor(r.authorRaw),
      initials: initialsAvatar(r.authorRaw),
      // AVG: photoUrl bewust NIET doorgeven — reviewer-foto's nooit publiceren
      text: r.text,
      rating: r.rating ?? 5,
      date: r.date ?? '',
    }))
    .slice(0, 6)

  // Strip alle emoji/pictogrammen uit de bedrijfsnaam (Maps-titels bevatten soms
  // 🔧⭐ e.d.); \p{Extended_Pictographic} dekt de hele Unicode-emojiset, niet een lijstje.
  const cleanName = mapsDetail.title.replace(/\p{Extended_Pictographic}/gu, '').replace(/\s+/g, ' ').trim()

  // Reviews-fallback (productiebeleid): echte reviews hebben voorrang. Heeft
  // het bedrijf er écht 0 én staat genereren aan (eigenaar kan opt-outen via
  // ALBS_GENERATE_REVIEWS=0), dan vullen we met realistische menselijke reviews.
  const generateReviewsOn = process.env.ALBS_GENERATE_REVIEWS !== '0'
  let reviewsAreGenerated = false
  let reviewWireFinal = reviewWire
  if (reviewWire.length === 0 && generateReviewsOn) {
    reviewWireFinal = generateReviews({ businessName: cleanName, niche: NICHE, city: mapsDetail.city || STAD }).map(
      (r) => ({ author: r.author, initials: initialsAvatar(r.author), text: r.text, rating: r.rating, date: r.relativeTime, generated: true }),
    )
    reviewsAreGenerated = true
    log('step5b.reviews-generated', { count: reviewWireFinal.length })
  }
  const reviewsAgg = reviewsAreGenerated ? reviewsAggregate(reviewWireFinal) : null
  // Tagline: cleanen + cap op max 60 chars / 8 woorden (knip op woord-grens)
  function capTagline(raw) {
    if (!raw) return null
    const clean = String(raw).replace(/\s+/g, ' ').trim()
    if (clean.length <= 60) return clean
    const words = clean.split(' ')
    let out = ''
    for (const w of words) {
      if ((out + ' ' + w).trim().length > 60) break
      out = (out + ' ' + w).trim()
    }
    return out || clean.slice(0, 57) + '…'
  }
  const rawTagline =
    websiteData?.companyTagline && websiteData.companyTagline.length < 200
      ? websiteData.companyTagline
      : bucket === 'A'
        ? `${NICHE.charAt(0).toUpperCase() + NICHE.slice(1)} in ${mapsDetail.city || STAD}.`
        : `Vakkundig ${NICHE}werk in ${mapsDetail.city || STAD}.`
  const tagline = capTagline(rawTagline)

  const placeholders = {
    BUSINESS_NAME: cleanName,
    BUSINESS_TAGLINE: tagline,
    BUSINESS_PHONE: phoneVerify.formatted ?? mapsDetail.phoneRaw,
    BUSINESS_WHATSAPP: phoneVerify.formatted ?? '+31000000000',
    BUSINESS_EMAIL: websiteData?.businessEmail ?? '',
    BUSINESS_ADDRESS: mapsDetail.address || `${mapsDetail.city || STAD} centrum`,
    BUSINESS_CITY: mapsDetail.city || STAD,
    BUSINESS_POSTCODE: mapsDetail.postcode || '',
    BUSINESS_KVK: kvkNumber ?? '',
    BUSINESS_BTW: websiteData?.btw ?? '',
    PRIMARY_COLOR: colors.primary,
    ACCENT_COLOR: colors.accent,
    SERVICES_B64: Buffer.from(JSON.stringify(services.map((s) => s.replace(/\s+/g, ' ').trim()).filter((s) => s && s.length < 80))).toString('base64'),
    REVIEW_COUNT: String(reviewsAgg ? reviewsAgg.count : mapsDetail.reviewsCount ?? 0),
    REVIEW_RATING: String(reviewsAgg ? reviewsAgg.rating : mapsDetail.reviewsRating ?? 0),
    DEKKING_REGIO: mapsDetail.city || STAD,
    REVIEWS_JSON: Buffer.from(JSON.stringify(reviewWireFinal)).toString('base64'),
    PROJECTS_JSON: Buffer.from(JSON.stringify(projects)).toString('base64'),
    REVIEWS_SOURCE_URL: mapsDetail.mapsUrl,
    HAS_EMAIL: String(!!websiteData?.businessEmail),
    HAS_KVK: String(!!kvkNumber),
    LAYOUT_VARIANT: 'A',
    INTRO_PRESET: '1',
    REVIEWS_VARIANT: '1',
    OWNER_PHOTO_URL: websiteData?.ownerPhotoUrl ?? '',
    OWNER_NAME: websiteData?.ownerName ?? '',
    OWNER_VARIANT: '1',
    HERO_VARIANT: '1',
    HEADER_VARIANT: '1',
    SERVICES_VARIANT: '1',
    PROJECTS_VARIANT: '1',
    TRUST_VARIANT: '1',
    CONTACT_VARIANT: '1',
    FOOTER_VARIANT: '1',
    NICHE: NICHE,
    CLARITY_PROJECT_ID: process.env.ALBS_CLARITY_PROJECT_ID ?? '',
    // 'preview' = verkoopdemo (noindex, geen tracking/banner) · 'live' = klant-site
    SITE_MODE: process.env.ALBS_SITE_MODE === 'live' ? 'live' : 'preview',
    // Leeg = template valt terug op VERCEL_URL (build-time). Bij live: eigen klant-domein.
    SITE_URL: process.env.ALBS_SITE_URL ?? '',
  }

  // 6b. Smart-render template-keuze (Claude beargumenteert)
  const smartPick = await pickSmartTemplate({
    name: mapsDetail.title,
    niche: NICHE,
    city: mapsDetail.city || STAD,
    painPoints: auditReport?.verbeterpunten?.map((v) => v.title ?? v).slice(0, 3) ?? [],
  })
  placeholders.LAYOUT_VARIANT = smartPick.layout
  placeholders.INTRO_PRESET = String(smartPick.intro)
  placeholders.REVIEWS_VARIANT = String(smartPick.reviews ?? 1)
  placeholders.OWNER_VARIANT = String(smartPick.owner ?? 1)
  placeholders.HERO_VARIANT = String(smartPick.hero ?? 1)
  placeholders.HEADER_VARIANT = String(smartPick.header ?? 1)
  placeholders.SERVICES_VARIANT = String(smartPick.services ?? 1)
  placeholders.PROJECTS_VARIANT = String(smartPick.projects ?? 1)
  placeholders.TRUST_VARIANT = String(smartPick.trust ?? 1)
  placeholders.CONTACT_VARIANT = String(smartPick.contact ?? 1)
  placeholders.FOOTER_VARIANT = String(smartPick.footer ?? 1)
  placeholders.NICHE = NICHE
  await writeFile(
    path.join(RUN_DIR, 'template-reasoning.md'),
    `# Template-keuze\n\nLead: ${mapsDetail.title} (${NICHE} in ${STAD})\n\nLayout: ${smartPick.layout}\nIntro-preset: ${smartPick.intro}\nReviews-variant: ${smartPick.reviews}\nOwner-variant: ${smartPick.owner}\n\n## Reasoning\n\n${smartPick.reasoning}\n`,
  )
  log('step6b.smart-template', smartPick)

  // 6c. Site-scoring
  const scoring = scoreSite({
    lighthouse: auditReport?.scores
      ? { performance: auditReport.scores.performance, seo: auditReport.scores.seo, mobile: auditReport.scores.performance }
      : {},
    websiteUrl: mapsDetail.websiteUrl,
    websiteText: websiteData?.rawText ?? '',
    city: mapsDetail.city || STAD,
  })
  const computedBucket = bucketFromScore(scoring.total, mapsDetail.hasWebsite)
  log('step6c.score', scoring)

  await writeJson('placeholders.json', placeholders)

  // Lead-data-completeness: leg expliciet vast welk veld echt gescrapet is en welk
  // ontbreekt (geen stille gaten). Echte review-teksten tellen los van gegenereerde.
  const leadAssessment = assessLead({
    title: cleanName,
    phone: placeholders.BUSINESS_PHONE,
    email: placeholders.BUSINESS_EMAIL || null,
    address: placeholders.BUSINESS_ADDRESS,
    city: placeholders.BUSINESS_CITY,
    kvk: placeholders.BUSINESS_KVK || null,
    btw: placeholders.BUSINESS_BTW || null,
    website: mapsDetail.websiteUrl || null,
    rating: reviewsAreGenerated ? null : mapsDetail.reviewsRating,
    reviewsCount: reviewsAreGenerated ? null : mapsDetail.reviewsCount,
    reviewSnippets: reviewWire, // alleen ECHTE reviews tellen hier
    category: mapsDetail.category,
    logo: placeholders.OWNER_PHOTO_URL ? null : null,
    fieldSources: { ...(mapsDetail.fieldSources ?? {}), email: websiteData?.businessEmail ? 'website-scrape' : null, kvk: kvkNumber ? 'kvk-lookup' : null, btw: websiteData?.btw ? 'website-scrape' : null },
  })
  await writeJson('lead-data-report.json', { ...leadAssessment, reviewsGenerated: reviewsAreGenerated })
  log('step6d.lead-completeness', { pass: leadAssessment.pass, missing: leadAssessment.missing.length, critical: leadAssessment.critical })

  const siteName = `albs-${placeholders.BUSINESS_NAME.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`
  const siteDir = path.join(RUN_DIR, 'site')
  await renderTemplate({ templateDir: TEMPLATE, dstDir: siteDir, placeholders, siteName })
  log('step7.rendered', { siteDir, siteName })

  // 8. Build + QA-gate + Deploy (per-klant Vercel-project)
  buildSite(siteDir)

  // 8a. Compliance/kwaliteit-poort: een site die het skelet-contract niet haalt,
  // gaat NIET live. Dit voorkomt structureel wat eerder misging (footer-loos, leaks).
  const gate = await runSiteGate({
    siteDir,
    siteMode: placeholders.SITE_MODE,
    reportPath: path.join(RUN_DIR, 'gate-report.json'),
  })
  log('step8a.gate', { pass: gate.pass, failures: gate.failures.length, warnings: gate.warnings.length })

  if (!gate.pass) {
    log('step8a.gate-blocked', { failures: gate.failures })
    await writeJson('deploy.json', { url: null, siteName, gated: true, failures: gate.failures })
    const summary = {
      runDir: RUN_DIR,
      // skipped=true zodat run-batch dit als niet-ok telt en de maps-URL niet opnieuw scrapet.
      skipped: true,
      reason: 'qa-gate-failed',
      bucket,
      gated: true,
      gateFailures: gate.failures,
      lead: {
        name: placeholders.BUSINESS_NAME,
        phone: placeholders.BUSINESS_PHONE,
        email: placeholders.BUSINESS_EMAIL || null,
        kvk: placeholders.BUSINESS_KVK || null,
        mapsUrl: mapsDetail.mapsUrl,
      },
      previewUrl: null,
    }
    await writeJson('summary.json', summary)
    console.error(`\n⛔ QA-gate FAILED — niet gedeployed. ${gate.failures.length} blocker(s):`)
    for (const f of gate.failures) console.error(`   · ${f}`)
    console.error(`   Rapport: ${path.join(RUN_DIR, 'gate-report.json')}`)
    process.exitCode = 2
    return
  }

  // ALBS_SKIP_DEPLOY=1: scrape→render→build→gate zonder Vercel-deploy (smoke/CI/verify-install).
  let url = null
  if (process.env.ALBS_SKIP_DEPLOY === '1') {
    await writeJson('deploy.json', { url: null, siteName, skippedDeploy: true, gateWarnings: gate.warnings })
    log('step8.deploy-skipped', { siteName, reason: 'ALBS_SKIP_DEPLOY=1' })
  } else {
    ;({ url } = await deployVercel(siteDir, siteName))
    await writeJson('deploy.json', { url, siteName, gateWarnings: gate.warnings })
    log('step8.deployed', { url, projectName: siteName })
  }

  // 9. Bellijst
  const csv = [
    'bedrijf,telefoon,email,kvk,bucket,maps_url,preview_url,niche,stad,verbeterscore',
    [
      placeholders.BUSINESS_NAME,
      placeholders.BUSINESS_PHONE,
      placeholders.BUSINESS_EMAIL || '',
      placeholders.BUSINESS_KVK || '',
      bucket,
      mapsDetail.mapsUrl,
      url ?? '',
      NICHE,
      STAD,
      auditReport?.verbeteringScore ?? '',
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  ].join('\n')
  await writeFile(path.join(RUN_DIR, 'bellijst.csv'), csv)

  const summary = {
    runDir: RUN_DIR,
    bucket,
    lead: {
      name: placeholders.BUSINESS_NAME,
      phone: placeholders.BUSINESS_PHONE,
      email: placeholders.BUSINESS_EMAIL || null,
      kvk: placeholders.BUSINESS_KVK || null,
      mapsUrl: mapsDetail.mapsUrl,
      reviewsCount: reviewsAgg ? reviewsAgg.count : mapsDetail.reviewsCount,
      reviewsRating: reviewsAgg ? reviewsAgg.rating : mapsDetail.reviewsRating,
      reviewSnippets: reviewWireFinal.length,
      reviewsGenerated: reviewsAreGenerated,
      reviewsRealScraped: reviewWire.length,
    },
    colors,
    verify,
    audit: auditReport ? { scores: auditReport.scores, verbeteringScore: auditReport.verbeteringScore, verbeterpunten: auditReport.verbeterpunten?.length ?? 0 } : null,
    score: scoring,
    computedBucket,
    templatePick: smartPick,
    previewUrl: url,
  }
  await writeJson('summary.json', summary)
  log('run.done', summary)
  console.log('\n=== SUMMARY ===')
  console.log(JSON.stringify(summary, null, 2))
}

main().catch((err) => {
  console.error('FATAL:', err?.stack ?? err)
  process.exit(1)
})
