import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = process.env.ALBS_REPO_ROOT ?? path.resolve(__dirname, '../..')
const LOG_FILE = process.env.ALBS_LEGAL_LOG ?? path.join(REPO_ROOT, 'data/legal-log.jsonl')

/**
 * Append-only AVG-log voor scrape-events.
 * @param {{ runId: string|null, source: string, legalBasis: string, records: number, retentionDays: number, note?: string }} entry
 */
export async function appendLegalLog(entry) {
  await mkdir(path.dirname(LOG_FILE), { recursive: true })
  const full = { ts: new Date().toISOString(), ...entry }
  const line = JSON.stringify(full) + '\n'
  try {
    const existing = await readFile(LOG_FILE, 'utf8')
    await writeFile(LOG_FILE, existing + line)
  } catch {
    await writeFile(LOG_FILE, line)
  }
}
