export interface HeaderProps {
  businessName: string
  phone: string
  whatsapp?: string
  primaryColor: string
  services?: string[]
  niche?: string
}

export const NAV_ITEMS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function waHref(whatsapp: string | undefined): string {
  return `https://wa.me/${(whatsapp ?? '').replace(/[^0-9]/g, '')}`
}
