import type { HeaderProps } from './types'
import V1 from './v1-minimal-flat'
import V2 from './v2-sticky-blur'
import V3 from './v3-transparent-over'
import V4 from './v4-side-tabs'
import V5 from './v5-drawer-mobile'
import V6 from './v6-mega-menu'
import V7 from './v7-cta-prominent'
import V8 from './v8-top-bar-info'
import V9 from './v9-double-row'
import V10 from './v10-logo-center'

interface PickerProps extends HeaderProps {
  variantId: number
}

export default function HeaderPicker({ variantId, ...rest }: PickerProps) {
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
    // Fallback = v2 (approved); v1 is voor deze sectie afgekeurd.
    default: return <V2 {...rest} />
  }
}
