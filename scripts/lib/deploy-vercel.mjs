/**
 * Build + Vercel deploy van gerenderde site-folder.
 * Per klant een eigen Vercel-project zodat protection-settings + analytics gescheiden zijn.
 *
 * Token bron (in volgorde):
 *   1. process.env.VERCEL_TOKEN
 *   2. ~/.local/share/com.vercel.cli/auth.json (na `vercel login`)
 *
 * Team/scope (optioneel, leeg = persoonlijk Vercel-account):
 *   - process.env.VERCEL_TEAM_ID
 *   - process.env.VERCEL_SCOPE
 */

import { execSync } from 'node:child_process'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { homedir } from 'node:os'

const TEAM_SCOPE = process.env.VERCEL_SCOPE ?? ''
const TEAM_ID = process.env.VERCEL_TEAM_ID ?? ''

function teamQuery() {
  return TEAM_ID ? `?teamId=${TEAM_ID}` : ''
}

async function getVercelToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN
  try {
    const authPath = path.join(homedir(), '.local/share/com.vercel.cli/auth.json')
    const raw = await readFile(authPath, 'utf8')
    const parsed = JSON.parse(raw)
    return parsed.token ?? null
  } catch {
    return null
  }
}

export function buildSite(siteDir) {
  execSync('npm install --include=dev --no-audit --no-fund --silent', {
    cwd: siteDir,
    stdio: 'inherit',
  })
  execSync('npm run build', { cwd: siteDir, stdio: 'inherit' })
}

/**
 * Maak Vercel-project via REST API met protection direct uit.
 * Idempotent: bestaat al → 200 met bestaand project.
 */
export async function ensureVercelProject(projectName) {
  const token = await getVercelToken()
  if (!token) {
    throw new Error(
      'Vercel-token niet gevonden. Zet VERCEL_TOKEN in .env.local of voer `vercel login` uit.',
    )
  }

  const createRes = await fetch(`https://api.vercel.com/v9/projects${teamQuery()}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: projectName, framework: 'nextjs' }),
  })

  if (createRes.ok) {
    const proj = await createRes.json()
    await fetch(`https://api.vercel.com/v9/projects/${proj.id}${teamQuery()}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssoProtection: null, passwordProtection: null }),
    })
    return { projectId: proj.id, name: proj.name, created: true }
  }

  if (createRes.status === 409) {
    const lookup = await fetch(`https://api.vercel.com/v9/projects/${projectName}${teamQuery()}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (lookup.ok) {
      const proj = await lookup.json()
      return { projectId: proj.id, name: proj.name, created: false }
    }
  }

  const err = await createRes.text()
  throw new Error(`Vercel project create failed (${createRes.status}): ${err.slice(0, 300)}`)
}

/**
 * Link site-folder aan specifiek project via .vercel/project.json (geen prompt nodig).
 */
async function writeVercelLink(siteDir, projectId) {
  const dir = path.join(siteDir, '.vercel')
  await mkdir(dir, { recursive: true })
  const link = { projectId }
  if (TEAM_ID) link.orgId = TEAM_ID
  await writeFile(path.join(dir, 'project.json'), JSON.stringify(link, null, 2))
}

/**
 * Deploy site-folder. Maakt eigen Vercel-project als nog niet bestaat.
 * @param {string} siteDir
 * @param {string} projectName - <klant-slug>
 */
export async function deployVercel(siteDir, projectName) {
  if (projectName) {
    const proj = await ensureVercelProject(projectName)
    await writeVercelLink(siteDir, proj.projectId)
  }
  const scopeFlag = TEAM_SCOPE ? `--scope ${TEAM_SCOPE}` : ''
  const out = execSync(`vercel deploy --prod --yes ${scopeFlag} 2>&1`, {
    cwd: siteDir,
    encoding: 'utf8',
  })
  const matches = out.match(/https:\/\/[a-z0-9-]+\.vercel\.app/g) ?? []
  const url = matches[matches.length - 1] ?? null
  return { url, stdout: out, projectName }
}
