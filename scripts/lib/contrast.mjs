/**
 * WCAG-contrast helpers voor de kleur-pijplijn.
 * De klant-primaryColor wordt soms als tekst/accent op een witte achtergrond
 * gebruikt; een te lichte kleur (felgeel, lichtgroen) is dan onleesbaar.
 * ensureReadableOnWhite donkert zo'n kleur precies genoeg om de WCAG-drempel
 * te halen, met behoud van tint (HSL-hue blijft gelijk, alleen lightness daalt).
 */

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n))
}

export function hexToRgb(hex) {
  const h = String(hex).trim().replace(/^#/, '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const h = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

// Relatieve luminantie per WCAG 2.x.
function relativeLuminance({ r, g, b }) {
  const lin = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** WCAG-contrastratio tussen twee kleuren (1..21). Onbekende input → 1. */
export function wcagContrast(hexA, hexB) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  if (!a || !b) return 1
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const l = (max + min) / 2
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return { h, s, l }
}

function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) [rp, gp, bp] = [c, x, 0]
  else if (h < 120) [rp, gp, bp] = [x, c, 0]
  else if (h < 180) [rp, gp, bp] = [0, c, x]
  else if (h < 240) [rp, gp, bp] = [0, x, c]
  else if (h < 300) [rp, gp, bp] = [x, 0, c]
  else [rp, gp, bp] = [c, 0, x]
  return { r: (rp + m) * 255, g: (gp + m) * 255, b: (bp + m) * 255 }
}

/**
 * Donkert `color` net genoeg om `minRatio` contrast met wit te halen.
 * Behoudt hue + saturatie; verlaagt alleen lightness. Geeft het origineel terug
 * als het al voldoet of niet parsebaar is.
 * @returns {{ color: string, adjusted: boolean, ratio: number }}
 */
export function ensureReadableOnWhite(color, minRatio = 4.5) {
  const rgb = hexToRgb(color)
  if (!rgb) return { color, adjusted: false, ratio: 1 }
  const startRatio = wcagContrast(color, '#ffffff')
  if (startRatio >= minRatio) return { color, adjusted: false, ratio: startRatio }

  const hsl = rgbToHsl(rgb)
  let lo = 0
  let hi = hsl.l
  let best = rgbToHex(hslToRgb({ ...hsl, l: 0 }))
  // Binary search op lightness: laagste daling die de drempel haalt.
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    const candidate = rgbToHex(hslToRgb({ ...hsl, l: mid }))
    if (wcagContrast(candidate, '#ffffff') >= minRatio) {
      best = candidate
      lo = mid
    } else {
      hi = mid
    }
  }
  return { color: best, adjusted: true, ratio: wcagContrast(best, '#ffffff') }
}
