/**
 * Extract dominant + accent kleur uit logo-buffer.
 * Gebruikt node-vibrant (Buffer-input).
 * Output: { primary: '#hex', accent: '#hex' } of niche-default als logo ontbreekt.
 */

import { Vibrant } from 'node-vibrant/node'

const NICHE_DEFAULTS = {
  loodgieter: { primary: '#ED5A2F', accent: '#1A1A1A' },
  installateur: { primary: '#2563EB', accent: '#1A1A1A' },
  schilder: { primary: '#1E40AF', accent: '#FFFFFF' },
  aannemer: { primary: '#7C2D12', accent: '#FAF3E0' },
  hovenier: { primary: '#16A34A', accent: '#1A1A1A' },
  stukadoor: { primary: '#525252', accent: '#F5F5F4' },
  dakdekker: { primary: '#7C2D12', accent: '#1A1A1A' },
  timmerman: { primary: '#92400E', accent: '#FAF3E0' },
  glazenwasser: { primary: '#0EA5E9', accent: '#1A1A1A' },
  klusbedrijf: { primary: '#F59E0B', accent: '#1A1A1A' },
  __default: { primary: '#FF8C42', accent: '#2C2C2C' },
}

function ensureHex(c) {
  if (!c) return null
  // Vibrant Swatch has .hex
  if (typeof c === 'string' && c.startsWith('#')) return c
  if (c.hex) return c.hex
  if (typeof c.getHex === 'function') return c.getHex()
  return null
}

export async function extractColorsFromLogo(buffer) {
  if (!buffer) return null
  try {
    const palette = await Vibrant.from(buffer).getPalette()
    const primary = ensureHex(palette.DarkVibrant) ?? ensureHex(palette.Vibrant) ?? ensureHex(palette.DarkMuted)
    const accent = ensureHex(palette.Vibrant) ?? ensureHex(palette.LightVibrant) ?? ensureHex(palette.Muted)
    if (!primary) return null
    return { primary, accent: accent ?? '#1A1A1A' }
  } catch {
    return null
  }
}

export function nicheDefaultColors(niche) {
  const key = (niche ?? '').toLowerCase()
  return NICHE_DEFAULTS[key] ?? NICHE_DEFAULTS.__default
}
