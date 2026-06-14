/**
 * Build + Vercel deploy van gerenderde site-folder.
 * Per klant een eigen Vercel-project zodat protection-settings + analytics gescheiden zijn.
 *
 * Token bron: ~/.local/share/com.vercel.cli/auth.json (Vercel CLI login)
 */

import { execSync } from 'node:child_process'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { homedir } from 'node:os'

// Env-driven, NOOIT een hardcoded team in deze repo. Drie gevallen:
//  - VERCEL_TEAM_ID + VERCEL_SCOPE gezet → deploy naar dat team.
//  - niets gezet → deploy naar het PERSOONLIJKE Vercel-account (teamId/scope null).
//  - ALBS_INTERNAL=1 → gebruik ALBS_INTERNAL_TEAM_ID/_SCOPE (onze eigen nachtrun).
// Zo belandt een partner-site nooit per ongeluk in een vreemd account.
function resolveVercelTeam() {
  if (process.env.ALBS_INTERNAL === '1') {
    const iScope = process.env.ALBS_INTERNAL_SCOPE
    const iTeam = process.env.ALBS_INTERNAL_TEAM_ID
    if (iScope && iTeam) return { scope: iScope, teamId: iTeam }
    throw new Error('ALBS_INTERNAL=1 maar ALBS_INTERNAL_TEAM_ID/ALBS_INTERNAL_SCOPE ontbreken in .env.')
  }
  const scope = process.env.VERCEL_SCOPE
  const teamId = process.env.VERCEL_TEAM_ID
  if (scope && teamId) return { scope, teamId }
  if (scope || teamId) {
    throw new Error('Zet VERCEL_TEAM_ID én VERCEL_SCOPE samen (of laat beide leeg voor je persoonlijke account).')
  }
  return { scope: null, teamId: null } // persoonlijk account
}

// teamId-query alleen toevoegen als er een team is (anders persoonlijk account).
function teamQuery(teamId) {
  return teamId ? `?teamId=${teamId}` : ''
}

async function getVercelToken() {
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
export async function ensureVercelProject(projectName, team = resolveVercelTeam()) {
  const { teamId: TEAM_ID } = team
  const token = await getVercelToken()
  if (!token) throw new Error('Vercel token niet gevonden in ~/.local/share/com.vercel.cli/auth.json')

  // 1) Probeer create
  const createRes = await fetch(`https://api.vercel.com/v9/projects${teamQuery(TEAM_ID)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectName,
      framework: 'nextjs',
    }),
  })

  if (createRes.ok) {
    const proj = await createRes.json()
    // Zet protection na create uit via PATCH (POST accepteert deze fields niet)
    await fetch(`https://api.vercel.com/v9/projects/${proj.id}${teamQuery(TEAM_ID)}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssoProtection: null, passwordProtection: null }),
    })
    return { projectId: proj.id, name: proj.name, created: true }
  }

  // 2) 409 = bestaat al → fetch project
  if (createRes.status === 409) {
    const lookup = await fetch(`https://api.vercel.com/v9/projects/${projectName}${teamQuery(TEAM_ID)}`, {
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
async function writeVercelLink(siteDir, projectId, teamId) {
  const dir = path.join(siteDir, '.vercel')
  await mkdir(dir, { recursive: true })
  await writeFile(
    path.join(dir, 'project.json'),
    JSON.stringify({ projectId, orgId: teamId }, null, 2),
  )
}

/**
 * Deploy site-folder. Maakt eigen Vercel-project als nog niet bestaat.
 * @param {string} siteDir
 * @param {string} projectName - albs-<klant-slug>
 */
export async function deployVercel(siteDir, projectName) {
  const team = resolveVercelTeam()
  // Bij een team: project vooraf via API aanmaken (protection direct uit) + linken.
  // Bij een persoonlijk account: dat overslaan; de CLI maakt het project bij de
  // eerste deploy zelf aan (geen orgId beschikbaar om project.json te schrijven).
  if (projectName && team.teamId) {
    const proj = await ensureVercelProject(projectName, team)
    await writeVercelLink(siteDir, proj.projectId, team.teamId)
  }
  const scopeFlag = team.scope ? ` --scope ${team.scope}` : ''
  const out = execSync(`vercel deploy --prod --yes${scopeFlag} 2>&1`, {
    cwd: siteDir,
    encoding: 'utf8',
  })
  const matches = out.match(/https:\/\/[a-z0-9-]+\.vercel\.app/g) ?? []
  const url = matches[matches.length - 1] ?? null
  return { url, stdout: out, projectName }
}
