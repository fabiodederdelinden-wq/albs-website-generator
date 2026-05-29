import type { ReviewsProps } from './types'
import V1 from './v1-carousel'
import V2 from './v2-masonry'
import V3 from './v3-spotlight'
import V4 from './v4-video-quote'
import V5 from './v5-with-source'
import V6 from './v6-marquee-ticker'
import V7 from './v7-star-grid'
import V8 from './v8-embed-google'
import V9 from './v9-side-stars'
import V10 from './v10-quote-fullbleed'

interface PickerProps extends ReviewsProps {
  variantId: number
}

export default function ReviewsPicker({ variantId, ...rest }: PickerProps) {
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
