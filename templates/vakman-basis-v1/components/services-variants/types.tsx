import type { ReactElement, SVGProps } from 'react'

export interface ServicesProps {
  services: string[]
  primaryColor: string
  accentColor?: string
  businessName?: string
  niche?: string
  phone?: string
}

export type IconName = 'flame' | 'shower' | 'drop' | 'spiral' | 'wrench' | 'hammer' | 'tool'

const SVG_BASE: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function FlameIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4-1 4 2 5 2 5s-1-3 0-5 0-3 0-5z" />
      <path d="M9 17c.5 2 1.5 3 3 3s2.5-1 3-3" />
    </svg>
  )
}

function ShowerIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M5 13h14l-2 3a7 7 0 0 1-10 0z" />
      <path d="M12 4v6" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9 18v2M12 18v3M15 18v2" />
    </svg>
  )
}

function DropIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M12 3c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </svg>
  )
}

function SpiralIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
      <path d="M12 12a4 4 0 1 1-4-4" />
      <path d="M12 12a6 6 0 1 0 6 6" />
      <path d="M12 12a8 8 0 1 1-8-8" />
    </svg>
  )
}

function WrenchIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M14 6a4 4 0 0 1 5 5l-9 9-4-4 9-9c-.3-.3-.7-.7-1-1z" />
      <circle cx="7" cy="17" r="1" />
    </svg>
  )
}

function HammerIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M13 4l7 5-3 3-7-5z" />
      <path d="M10 7l-7 7 3 3 7-7" />
      <path d="M14 13l3 3" />
    </svg>
  )
}

function ToolIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...SVG_BASE} {...props}>
      <path d="M14 7a3 3 0 0 1 4 4l-7 7-4-4 7-7z" />
      <path d="M5 16l3 3" />
      <circle cx="17" cy="6" r="1" />
    </svg>
  )
}

function pickIconName(service: string): IconName {
  const s = service.toLowerCase()
  if (/(cv|boiler|ketel|installatie|verwarm|gas|cv-)/i.test(s)) return 'flame'
  if (/(sanitair|badkamer|douche|kraan|toilet|wc)/i.test(s)) return 'shower'
  if (/(lek|lekkage|water|nat)/i.test(s)) return 'drop'
  if (/(ontstop|riool|afvoer|verstop)/i.test(s)) return 'spiral'
  if (/(onderhoud|service|keuring|inspectie)/i.test(s)) return 'wrench'
  if (/(renovat|verbouw|nieuwbouw|bouw|aanleg|installeren)/i.test(s)) return 'hammer'
  return 'tool'
}

interface ServiceIconProps extends SVGProps<SVGSVGElement> {
  service: string
}

export function ServiceIcon({ service, ...rest }: ServiceIconProps): ReactElement {
  const name = pickIconName(service)
  switch (name) {
    case 'flame':
      return <FlameIcon {...rest} />
    case 'shower':
      return <ShowerIcon {...rest} />
    case 'drop':
      return <DropIcon {...rest} />
    case 'spiral':
      return <SpiralIcon {...rest} />
    case 'wrench':
      return <WrenchIcon {...rest} />
    case 'hammer':
      return <HammerIcon {...rest} />
    default:
      return <ToolIcon {...rest} />
  }
}

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'cv-installatie': 'Nieuwe ketel inclusief afvoer en gascontrole',
  'cv': 'CV-ketel en leidingwerk vakkundig aangelegd',
  'boiler-onderhoud': 'Jaarlijkse keuring plus reiniging van de boiler',
  'boiler': 'Boilers van alle merken, snel ter plaatse',
  'sanitair': 'Kraan, douche en toilet vakkundig vervangen',
  'badkamer': 'Complete badkamer-renovatie met vaste prijs',
  'lekkages': 'Lekken sporen we op met camera, herstel zonder hak',
  'lekkage': 'Lekken sporen we op met camera, herstel zonder hak',
  'ontstopping': 'Riool en afvoer ontstopt binnen 24 uur',
  'onderhoud': 'Periodieke check zodat u nooit voor verrassingen staat',
  'renovatie': 'Compleet badkamer-vernieuwen of CV-renovatie',
  'verwarming': 'Cv, vloerverwarming en radiatoren in één hand',
  'gas': 'Gasleidingen gekeurd en aangelegd volgens GAVO',
  'water': 'Waterleidingen vervangen of uitbreiden',
  'dakwerk': 'Lekkages en pannen, vakkundig en snel verholpen',
  'tuin': 'Aanleg en onderhoud van uw groene buitenruimte',
  'elektra': 'Groepenkast, stopcontacten en verlichting',
  'schilderwerk': 'Binnen en buiten, met duurzame verf',
}

export function serviceDescriptions(service: string): string {
  const key = service.toLowerCase().trim()
  if (SERVICE_DESCRIPTIONS[key]) return SERVICE_DESCRIPTIONS[key]
  for (const [k, v] of Object.entries(SERVICE_DESCRIPTIONS)) {
    if (key.includes(k) || k.includes(key)) return v
  }
  return 'Vakwerk geleverd door ervaren monteurs, met garantie'
}

const INDICATIVE_PRICES = [49, 79, 129, 199, 89, 149]

export function indicativePrice(index: number): number {
  return INDICATIVE_PRICES[index % INDICATIVE_PRICES.length]
}

export function placeholderPhoto(width: number, height: number, hex: string, label: string): string {
  const cleanHex = hex.replace('#', '')
  const safeLabel = encodeURIComponent(label.slice(0, 24))
  return `https://placehold.co/${width}x${height}/${cleanHex}/fff?text=${safeLabel}`
}

export function mixColor(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, white)`
}
