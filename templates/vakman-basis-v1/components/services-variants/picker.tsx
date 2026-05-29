import type { ComponentType } from 'react'
import type { ServicesProps } from './types'
import V1 from './v1-icon-grid'
import V2 from './v2-accordion'
import V3 from './v3-tabs'
import V4 from './v4-cards-hover'
import V5 from './v5-list-with-photo'
import V6 from './v6-steps-numbered'
import V7 from './v7-price-indicative'
import V8 from './v8-before-after'
import V9 from './v9-flip-cards'
import V10 from './v10-masonry'

interface PickerProps extends ServicesProps {
  variantId: number
}

const VARIANTS = [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10] as const

export default function ServicesPicker({ variantId, ...rest }: PickerProps) {
  const id = Math.max(1, Math.min(10, variantId | 0))
  const Variant = VARIANTS[id - 1] ?? V1
  return <Variant {...rest} />
}
