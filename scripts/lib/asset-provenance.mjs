/**
 * Asset-provenance: per asset (logo/foto/kleur) bron + trust-score + validatie.
 * Schrijft naar runs/{id}/asset-provenance.json
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const TRUST = {
  WEBSITE_HEADER_LOGO: 10,
  WEBSITE_BODY_LOGO: 9,
  OG_IMAGE: 8,
  FAVICON_HIRES: 7,
  SOCIAL_PROFILE: 6,
  MAPS_PROFILE_PHOTO: 5,
  STREET_VIEW: 4,
  NICHE_DEFAULT: 0,
}

export async function loadProvenance(runDir) {
  const p = path.join(runDir, 'asset-provenance.json')
  try {
    const raw = await readFile(p, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { assets: [] }
  }
}

export async function recordAsset(runDir, asset) {
  const data = await loadProvenance(runDir)
  data.assets.push({
    ts: new Date().toISOString(),
    ...asset,
  })
  await writeFile(path.join(runDir, 'asset-provenance.json'), JSON.stringify(data, null, 2))
}

export function getTrustedAsset(provenance, type) {
  const candidates = provenance.assets.filter((a) => a.type === type)
  if (candidates.length === 0) return null
  return candidates.reduce((a, b) => ((a.effectiveTrust ?? a.trustScore) > (b.effectiveTrust ?? b.trustScore) ? a : b))
}
