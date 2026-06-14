#!/usr/bin/env node
/**
 * Multi-lead batch-runner voor ALBS realrun-v2.
 *
 * Roept realrun-v2 sequentieel aan met groeiende skip-list zodat elke iteratie
 * een andere lead pakt. Schrijft batch-summary met alle preview-URLs.
 *
 * Usage:
 *   node scripts/run-batch.mjs [count=10] [niche=loodgieter] [stad=Utrecht]
 */

import './lib/load-env.mjs' // .env.local/.env → process.env (vóór alles dat env leest)
import { spawnSync } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')

const COUNT = parseInt(process.argv[2] ?? '10', 10)
const NICHE = process.argv[3] ?? 'loodgieter'
const STAD = process.argv[4] ?? 'Utrecht'

const TS = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const BATCH_DIR = path.join(REPO_ROOT, 'runs', `batch-${TS}`)
await mkdir(BATCH_DIR, { recursive: true })

const skip = new Set()
const results = []
const startTs = Date.now()

console.log(`▶ Batch start: ${COUNT} leads · ${NICHE} · ${STAD}`)
console.log(`  batchDir: ${BATCH_DIR}`)

for (let i = 1; i <= COUNT; i++) {
  console.log(`\n--- Lead ${i}/${COUNT} ---`)
  const runTag = `${path.basename(BATCH_DIR)}/lead-${String(i).padStart(2, '0')}`

  const res = spawnSync(
    'node',
    [path.join(REPO_ROOT, 'scripts', 'realrun-v2.mjs'), NICHE, STAD],
    {
      cwd: REPO_ROOT,
      env: {
        ...process.env,
        NODE_PATH: path.join(REPO_ROOT, 'scripts', 'node_modules'),
        ALBS_SKIP_MAPS_URLS: Array.from(skip).join(','),
        ALBS_RUN_TAG: runTag,
      },
      stdio: 'inherit',
      timeout: 8 * 60 * 1000,
    },
  )

  // Lees summary van deze lead
  const sumPath = path.join(REPO_ROOT, 'runs', runTag, 'summary.json')
  try {
    const sum = JSON.parse(await readFile(sumPath, 'utf8'))
    results.push({ i, runTag, ok: !sum.skipped, ...sum })
    if (sum.lead?.mapsUrl) skip.add(sum.lead.mapsUrl)
  } catch (err) {
    results.push({ i, runTag, ok: false, error: 'no-summary', exitCode: res.status })
  }

  // Korte pauze tussen leads (Maps rate-limit)
  if (i < COUNT) await new Promise((r) => setTimeout(r, 8000))
}

const totalSec = ((Date.now() - startTs) / 1000).toFixed(0)
const ok = results.filter((r) => r.ok)
const failed = results.filter((r) => !r.ok)

// Bellijst-CSV (alleen succesvolle)
// PII: bevat telefoon/e-mail/bedrijfsdata. Niet committen (runs/ staat in .gitignore),
// niet delen buiten ALBS, verwijderen zodra de bellijst is afgewerkt.
const csvField = (v) => `"${String(v ?? '').replace(/[\r\n\t]+/g, ' ').replace(/"/g, '""')}"`
const csv = [
  '# PII — telefoon/e-mail. Niet delen, verwijderen na gebruik.',
  'i,bedrijf,telefoon,email,kvk,bucket,preview_url,maps_url,verbeterscore',
  ...ok.map((r) =>
    [
      r.i,
      r.lead?.name ?? '',
      r.lead?.phone ?? '',
      r.lead?.email ?? '',
      r.lead?.kvk ?? '',
      r.bucket ?? '',
      r.previewUrl ?? '',
      r.lead?.mapsUrl ?? '',
      r.audit?.verbeteringScore ?? '',
    ]
      .map(csvField)
      .join(','),
  ),
].join('\n')

await writeFile(path.join(BATCH_DIR, 'bellijst.csv'), csv)
await writeFile(path.join(BATCH_DIR, 'summary.json'), JSON.stringify({ count: COUNT, ok: ok.length, failed: failed.length, totalSec, results }, null, 2))

console.log(`\n✅ Batch klaar in ${totalSec}s`)
console.log(`   ${ok.length}/${COUNT} succesvol`)
console.log(`   ${failed.length} gefaald`)
console.log(`   bellijst: ${path.join(BATCH_DIR, 'bellijst.csv')}`)

for (const r of ok) {
  console.log(`   #${r.i} ${r.lead?.name} → ${r.previewUrl}`)
}
