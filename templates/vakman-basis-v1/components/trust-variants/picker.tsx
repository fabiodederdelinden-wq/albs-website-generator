import type { ComponentType } from 'react'
import type { TrustProps } from './types'
import V1 from './v1-badge-row'
import V2 from './v2-stats-counter'
import V3 from './v3-certificate-grid'
import V4 from './v4-kvk-prominent'
import V5 from './v5-guarantee-banner'
import V6 from './v6-side-by-side'
import V7 from './v7-ticker-bar'
import V8 from './v8-badges-grid-lg'
import V9 from './v9-awards-list'
import V10 from './v10-single-stat-lg'

const VARIANTS = [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10] as const

interface TrustPickerProps extends TrustProps {
  variantId: number
}

export default function TrustPicker({ variantId, ...rest }: TrustPickerProps) {
  const idx = Math.max(1, Math.min(10, variantId | 0)) - 1
  // Fallback = V3 (enige approved trust-variant); v1 is afgekeurd.
  const Variant = VARIANTS[idx] ?? V3
  return <Variant {...rest} />
}
