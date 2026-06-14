export interface FooterProps {
  businessName: string
  kvk?: string
  btw?: string
  primaryColor: string
  accentColor?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  city?: string
  postcode?: string
  services?: string[]
  ownerName?: string
}

export function telHref(phone?: string): string {
  return `tel:${(phone ?? '').replace(/\s/g, '')}`
}

export function waHref(whatsapp?: string): string {
  const digits = (whatsapp ?? '').replace(/[^0-9]/g, '')
  return `https://wa.me/${digits}`
}

export function mailHref(email?: string): string {
  return `mailto:${email ?? ''}`
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface SocialHrefs {
  facebook: string
  instagram: string
  linkedin: string
  google: string
}

export function socialHrefs(businessName: string): SocialHrefs {
  const slug = slugify(businessName)
  return {
    facebook: `https://facebook.com/${slug}`,
    instagram: `https://instagram.com/${slug}`,
    linkedin: `https://linkedin.com/company/${slug}`,
    google: `https://www.google.com/search?q=${encodeURIComponent(businessName)}`,
  }
}

export function softTint(color: string, amountPct: number): string {
  return `color-mix(in srgb, ${color} ${amountPct}%, white)`
}

export function darkTint(color: string, amountPct: number): string {
  return `color-mix(in srgb, ${color} ${amountPct}%, black)`
}
