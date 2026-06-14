/**
 * Laadt .env.local en .env uit de repo-root in process.env (best-effort).
 * Zonder dit zou een .env.local (zoals INSTALL.md voorschrijft) nooit gelezen worden.
 *
 * Precedence: echte shell-env > .env.local > .env. Implementatie: laad .env.local
 * eerst en .env daarna, en zet een key alleen als die nog NIET in process.env staat
 * (skip-if-present). Zo wint shell-env over beide en .env.local over .env.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'

const REPO_ROOT = process.env.ALBS_REPO_ROOT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

function loadFile(file) {
  const p = path.join(REPO_ROOT, file)
  if (!existsSync(p)) return
  for (const rawLine of readFileSync(p, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    if (!key || key in process.env) continue // shell-env of eerder geladen bestand wint
    let val = line.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    process.env[key] = val
  }
}

loadFile('.env.local') // specifieker → eerst, wint over .env
loadFile('.env')
