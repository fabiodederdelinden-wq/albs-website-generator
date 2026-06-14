import type { FooterProps } from './types'
import V1 from './v1-minimal-one-col'
import V2 from './v2-four-col-classic'
import V3 from './v3-with-map'
import V4 from './v4-with-newsletter'
import V5 from './v5-with-social-large'
import V6 from './v6-big-cta-stack'
import V7 from './v7-sitemap-extended'
import V8 from './v8-kvk-prominent'
import V9 from './v9-partner-logos'
import V10 from './v10-signature-hand'

interface PickerProps extends FooterProps {
  variantId: number
}

export default function FooterPicker({ variantId, ...rest }: PickerProps) {
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
    // Fallback = v3 (approved + compleet); v1 is bewust te kaal als footer.
    default: return <V3 {...rest} />
  }
}
