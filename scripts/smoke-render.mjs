#!/usr/bin/env node
/**
 * Gate-smoke: rendert de template met BEWUST lege optionele velden (geen BTW,
 * geen e-mail, geen reviews, geen owner-foto) — precies de combinatie die eerder
 * de build liet crashen (P0.9) en dode anchors gaf (P0.10) — bouwt 'm, en draait
 * de site-gate. Faalt non-zero als render/build/gate niet groen is.
 *
 * Gebruik: node scripts/smoke-render.mjs   (vanuit repo-root)
 * Vereist: template-dependencies geïnstalleerd (templates/vakman-basis-v1/node_modules).
 */
import { renderTemplate } from './lib/render-template.mjs'
import { runSiteGate } from './lib/site-gate.mjs'
import { execSync } from 'node:child_process'
import { mkdtemp, rm, symlink, access } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = path.join(REPO_ROOT, 'templates/vakman-basis-v1')
const TEMPLATE_NM = path.join(TEMPLATE, 'node_modules')

// Minimale, realistische lead MET lege optionals — de edge-case-combinatie.
const placeholders = {
  BUSINESS_NAME: "O'Brien & Zn. Loodgieters",
  BUSINESS_TAGLINE: 'Loodgieter in Utrecht',
  BUSINESS_PHONE: '030 123 4567',
  BUSINESS_WHATSAPP: '+31301234567',
  BUSINESS_EMAIL: '', // leeg
  BUSINESS_ADDRESS: 'Voorstraat 1',
  BUSINESS_CITY: 'Utrecht',
  BUSINESS_POSTCODE: '3512 AA',
  BUSINESS_KVK: '69826161',
  BUSINESS_BTW: '', // leeg → P0.9
  PRIMARY_COLOR: '#1d4ed8',
  ACCENT_COLOR: '#f59e0b',
  SERVICES_B64: Buffer.from(JSON.stringify(['Lekkage', 'CV-onderhoud', 'Renovatie'])).toString('base64'),
  REVIEW_COUNT: '12',
  REVIEW_RATING: '4.7',
  DEKKING_REGIO: 'Utrecht',
  REVIEWS_JSON: Buffer.from(JSON.stringify([])).toString('base64'), // geen snippets → P0.10
  PROJECTS_JSON: Buffer.from(JSON.stringify([])).toString('base64'),
  REVIEWS_SOURCE_URL: 'https://maps.google.com/?cid=1',
  HAS_EMAIL: 'false',
  HAS_KVK: 'true',
  LAYOUT_VARIANT: 'A',
  INTRO_PRESET: '1',
  REVIEWS_VARIANT: '1',
  OWNER_PHOTO_URL: '', // leeg
  OWNER_NAME: '',
  OWNER_VARIANT: '2',
  HERO_VARIANT: '1',
  HEADER_VARIANT: '2',
  SERVICES_VARIANT: '1',
  PROJECTS_VARIANT: '1',
  TRUST_VARIANT: '3',
  CONTACT_VARIANT: '3',
  FOOTER_VARIANT: '3',
  NICHE: 'loodgieter',
  CLARITY_PROJECT_ID: '',
  SITE_MODE: 'preview',
  SITE_URL: '',
}

async function main() {
  try {
    await access(TEMPLATE_NM)
  } catch {
    console.error('[smoke] template-dependencies ontbreken (templates/vakman-basis-v1/node_modules). Run eerst de install. Smoke overgeslagen.')
    process.exit(3)
  }

  const dst = await mkdtemp(path.join(tmpdir(), 'albs-smoke-'))
  try {
    await renderTemplate({ templateDir: TEMPLATE, dstDir: dst, placeholders, siteName: 'albs-smoke' })
    await symlink(TEMPLATE_NM, path.join(dst, 'node_modules'))
    execSync('npm run build', { cwd: dst, stdio: 'pipe' })
    const gate = await runSiteGate({ siteDir: dst, siteMode: 'preview' })
    if (!gate.pass) {
      console.error('[smoke] GATE FAILED met lege optionals:')
      for (const f of gate.failures) console.error('   · ' + f)
      process.exit(1)
    }
    console.log(`[smoke] OK — render+build+gate groen met lege BTW/e-mail/reviews (${gate.warnings.length} warnings)`)
  } catch (e) {
    console.error('[smoke] FOUT:', e.message?.slice(0, 400) ?? e)
    process.exit(1)
  } finally {
    await rm(dst, { recursive: true, force: true })
  }
}

main()
