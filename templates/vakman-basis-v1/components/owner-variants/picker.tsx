import type { ComponentType } from 'react'
import type { OwnerProps } from './types'
import V1 from './v1-split'
import V2 from './v2-fullbleed'
import V3 from './v3-team-grid'
import V4 from './v4-quote-card'
import V5 from './v5-story-paragraph'
import V6 from './v6-photo-badges'
import V7 from './v7-polaroid'
import V8 from './v8-side-by-side'
import V9 from './v9-video-thumb'
import V10 from './v10-signature-card'

interface PickerProps extends OwnerProps {
  variantId: number
}

export default function OwnerPicker({ variantId, ...rest }: PickerProps) {
  const id = Math.max(1, Math.min(10, variantId | 0))
  switch (id) {
    case 1:
      return <V1 {...rest} />
    case 2:
      return <V2 {...rest} />
    case 3:
      return <V3 {...rest} />
    case 4:
      return <V4 {...rest} />
    case 5:
      return <V5 {...rest} />
    case 6:
      return <V6 {...rest} />
    case 7:
      return <V7 {...rest} />
    case 8:
      return <V8 {...rest} />
    case 9:
      return <V9 {...rest} />
    case 10:
      return <V10 {...rest} />
    default:
      return <V1 {...rest} />
  }
}
