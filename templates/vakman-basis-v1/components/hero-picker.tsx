import V1 from './hero-variants/v1-classic-bold'
import V2 from './hero-variants/v2-photo-fullbleed'
import V3 from './hero-variants/v3-split-5050'
import V4 from './hero-variants/v4-counter-stats'
import V5 from './hero-variants/v5-geometric-pattern'
import V6 from './hero-variants/v6-animated-shapes'
import V7 from './hero-variants/v7-scroll-parallax'
import V8 from './hero-variants/v8-minimalist-spaced'
import V9 from './hero-variants/v9-dual-cta-stack'
import V10 from './hero-variants/v10-testimonial-overlay'
import type { HeroProps } from './hero-variants/types'

const VARIANTS = [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10] as const

interface HeroPickerProps extends HeroProps {
  variantId: number
}

export default function HeroPicker({ variantId, ...rest }: HeroPickerProps) {
  const idx = Math.max(1, Math.min(10, variantId)) - 1
  const Variant = VARIANTS[idx] ?? V1
  return <Variant {...rest} />
}
