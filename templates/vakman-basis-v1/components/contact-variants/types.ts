export interface ContactProps {
  businessName: string
  phone: string
  whatsapp?: string
  email?: string
  address?: string
  postcode?: string
  city?: string
  primaryColor: string
  accentColor?: string
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function waHref(whatsapp?: string): string {
  const digits = (whatsapp ?? '').replace(/[^0-9]/g, '')
  return `https://wa.me/${digits}`
}

export function mailHref(email?: string): string {
  return `mailto:${email ?? ''}`
}

export function softTint(color: string, amountPct: number): string {
  return `color-mix(in srgb, ${color} ${amountPct}%, white)`
}

export function darkTint(color: string, amountPct: number): string {
  return `color-mix(in srgb, ${color} ${amountPct}%, black)`
}
