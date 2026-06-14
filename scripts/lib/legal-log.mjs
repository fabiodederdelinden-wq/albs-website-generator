import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = process.env.ALBS_REPO_ROOT ?? path.resolve(__dirname, '../..')
// Override via ALBS_LEGAL_LOG (partner-installs hebben geen apps/crm).
const LOG_FILE =
  process.env.ALBS_LEGAL_LOG ?? path.join(REPO_ROOT, 'apps/crm/.data/legal-log.jsonl')

/**
 * Append-only AVG-log voor scrape-events.
 * appendFile is atomair per write: veilig bij parallelle batch-runs
 * (de oude read+write was een race waarbij regels konden verdwijnen).
 * @param {{ runId: string|null, source: string, legalBasis: string, records: number, retentionDays: number, note?: string }} entry
 */
export async function appendLegalLog(entry) {
  await mkdir(path.dirname(LOG_FILE), { recursive: true })
  const full = { ts: new Date().toISOString(), ...entry }
  await appendFile(LOG_FILE, JSON.stringify(full) + '\n')
}
