export interface HeroProps {
  businessName: string
  tagline: string
  phone: string
  whatsapp?: string
  primaryColor: string
  accentColor: string
  heroImageUrl?: string
  reviewsRating?: number
  reviewsCount?: number
  yearsExperience?: number
  projectsCount?: number
  testimonialText?: string
  testimonialAuthor?: string
  niche?: string
}

export const NICHE_ICONS: Record<string, string[]> = {
  loodgieter: ['🔧', '🪛', '🔩', '⚙️', '🧰', '🔨', '🚿', '💧'],
  schilder: ['🎨', '🖌️', '🖼️', '🪣', '🧴', '📏', '🪜', '🎭'],
  hovenier: ['🌿', '🌱', '🪴', '🧤', '✂️', '🌳', '🍂', '🌾'],
  aannemer: ['🏗️', '🔨', '⚒️', '🪜', '📐', '🧱', '🚧', '⛏️'],
  elektricien: ['⚡', '🔌', '🪛', '💡', '🔋', '📡', '⚙️', '🪫'],
  dakdekker: ['🏠', '🪜', '🔨', '⛓️', '📐', '🧰', '🪟', '⚒️'],
  stukadoor: ['🪣', '🧱', '🪜', '📏', '🎨', '🛠️', '🪛', '🔨'],
  installateur: ['⚙️', '🔧', '🔌', '🪛', '🛠️', '📡', '🔥', '💧'],
  slotenmaker: ['🔑', '🔒', '🛠️', '🔧', '🚪', '🔓', '⚙️', '🪛'],
  default: ['🔧', '🛠️', '⚙️', '📐', '🧰', '🪛', '🔨', '💡'],
}

const DEFAULT_ICONS: string[] = ['🔧', '🛠️', '⚙️', '📐', '🧰', '🪛', '🔨', '💡']

export function iconsForNiche(niche?: string): string[] {
  if (!niche) return NICHE_ICONS.default ?? DEFAULT_ICONS
  const key = niche.toLowerCase().trim()
  return NICHE_ICONS[key] ?? NICHE_ICONS.default ?? DEFAULT_ICONS
}

// HSL helpers voor kleur-derivatie uit klant-logo
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const cleaned = hex.replace('#', '')
  const r = parseInt(cleaned.slice(0, 2), 16) / 255
  const g = parseInt(cleaned.slice(2, 4), 16) / 255
  const b = parseInt(cleaned.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s, l }
}

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else { r = c; g = 0; b = x }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Genereer 2 harmonieuze hulpkleuren uit primary + accent.
 * Gebruikt HSL hue-rotatie zodat de bewegende bg in dezelfde sfeer blijft als het logo.
 */
export function deriveAuxColors(primary: string, accent: string): { aux1: string; aux2: string } {
  try {
    const p = hexToHsl(primary)
    const a = hexToHsl(accent)
    // aux1: primary + 30° hue rotatie, iets lichter
    const aux1 = hslToHex((p.h + 30) % 360, Math.min(1, p.s * 1.1), Math.min(0.7, p.l + 0.15))
    // aux2: accent - 30° hue rotatie, iets donkerder
    const aux2 = hslToHex((a.h - 30 + 360) % 360, Math.min(1, a.s * 1.1), Math.max(0.25, a.l - 0.1))
    return { aux1, aux2 }
  } catch {
    return { aux1: primary, aux2: accent }
  }
}

export const DEFAULT_HERO_PROPS: HeroProps = {
  businessName: 'Stoltenkamp Loodgieters',
  tagline: 'Snelle hulp bij lekkages, ontstoppingen en CV-installaties',
  phone: '+31 6 54 91 11 24',
  whatsapp: '+31 6 54 91 11 24',
  primaryColor: '#603022',
  accentColor: '#56c3e4',
  heroImageUrl:
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&q=80&auto=format&fit=crop',
  reviewsRating: 4.8,
  reviewsCount: 87,
  yearsExperience: 22,
  projectsCount: 1240,
  testimonialText: 'Binnen het uur stond hij voor de deur, vakkundig en netjes.',
  testimonialAuthor: 'Marieke V.',
  niche: 'loodgieter',
}
