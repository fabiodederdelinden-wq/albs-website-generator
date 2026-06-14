/**
 * Centrale site-configuratie — gedeeld door legal-pagina's, layout en consent.
 * Placeholders worden bij render vervangen; unreplaced markers vallen veilig terug.
 */

const SITE_MODE_RAW = '{{SITE_MODE}}'
const BUSINESS_BTW_RAW = '{{BUSINESS_BTW}}'
const OWNER_NAME_RAW = '{{OWNER_NAME}}'

function val(raw: string, fallback = ''): string {
  return raw && !raw.startsWith('{{') ? raw : fallback
}

function safeB64StringArray(b64: string): string[] {
  try {
    if (!b64 || b64.startsWith('{{')) return []
    const arr = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'))
    return Array.isArray(arr) ? arr.filter((s): s is string => typeof s === 'string') : []
  } catch {
    return []
  }
}

function clampVariant(raw: string, max = 10): number {
  return Math.max(1, Math.min(max, parseInt(raw, 10) || 1))
}

export const SITE = {
  name: val('{{BUSINESS_NAME}}', 'Dit bedrijf'),
  tagline: val('{{BUSINESS_TAGLINE}}'),
  phone: val('{{BUSINESS_PHONE}}'),
  whatsapp: val('{{BUSINESS_WHATSAPP}}'),
  email: val('{{BUSINESS_EMAIL}}'),
  address: val('{{BUSINESS_ADDRESS}}'),
  postcode: val('{{BUSINESS_POSTCODE}}'),
  city: val('{{BUSINESS_CITY}}'),
  kvk: val('{{BUSINESS_KVK}}'),
  btw: val(BUSINESS_BTW_RAW),
  ownerName: val(OWNER_NAME_RAW),
  primaryColor: val('{{PRIMARY_COLOR}}', '#FF8C42'),
  accentColor: val('{{ACCENT_COLOR}}', '#FF8C42'),
  niche: val('{{NICHE}}', 'default'),
  services: safeB64StringArray('{{SERVICES_B64}}'),
  headerVariant: clampVariant('{{HEADER_VARIANT}}'),
  footerVariant: clampVariant('{{FOOTER_VARIANT}}'),
  clarityProjectId: val('{{CLARITY_PROJECT_ID}}'),
  /** 'preview' = verkoopdemo (noindex, geen tracking) · 'live' = klant-site */
  mode: val(SITE_MODE_RAW, 'preview') === 'live' ? ('live' as const) : ('preview' as const),
} as const

export const IS_LIVE = SITE.mode === 'live'

const SITE_URL_RAW = '{{SITE_URL}}'

/**
 * Absolute basis-URL voor canonical/sitemap/OG. Volgorde: expliciet ingesteld
 * (eigen klant-domein bij live) → Vercel deploy-URL (build-time env) → localhost.
 */
export function siteUrl(): string {
  const explicit = val(SITE_URL_RAW)
  if (explicit) return explicit.replace(/\/+$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
