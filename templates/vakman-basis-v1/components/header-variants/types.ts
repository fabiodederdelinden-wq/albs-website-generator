export interface NavItem {
  label: string
  href: string
}

export interface HeaderProps {
  businessName: string
  phone: string
  whatsapp?: string
  primaryColor: string
  services?: string[]
  niche?: string
  // Door page.tsx gevuld met alleen de secties die echt renderen (geen dode anchors).
  // Ontbreekt de prop → val terug op de volledige NAV_ITEMS.
  navItems?: ReadonlyArray<NavItem>
}

// Root-relative ('/#...') zodat de nav ook werkt vanaf subpagina's (/privacy, /cookies).
// Alleen secties die echt bestaan als anchor-target in app/page.tsx (geen dode links).
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
]

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function waHref(whatsapp: string | undefined): string {
  return `https://wa.me/${(whatsapp ?? '').replace(/[^0-9]/g, '')}`
}
