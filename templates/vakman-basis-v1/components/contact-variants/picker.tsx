import type { ContactProps } from './types'
import V1 from './v1-form-classic'
import V2 from './v2-side-info-form'
import V3 from './v3-map-info-side'
import V4 from './v4-sticky-cta-bar'
import V5 from './v5-calendly-embed'
import V6 from './v6-whatsapp-prom'
import V7 from './v7-three-paths'
import V8 from './v8-postcode-check'
import V9 from './v9-accordion-faq'
import V10 from './v10-hero-cta-section'

interface PickerProps extends ContactProps {
  variantId: number
}

export default function ContactPicker({ variantId, ...rest }: PickerProps) {
  const id = Math.max(1, Math.min(10, variantId | 0))
  switch (id) {
    case 1: return <V1 {...rest} />
    case 2: return <V2 {...rest} />
    case 3: return <V3 {...rest} />
    case 4: return <V4 {...rest} />
    case 5: return <V5 {...rest} />
    case 6: return <V6 {...rest} />
    case 7: return <V7 {...rest} />
    case 8: return <V8 {...rest} />
    case 9: return <V9 {...rest} />
    case 10: return <V10 {...rest} />
    default: return <V1 {...rest} />
  }
}
