import type { ComponentType } from 'react'
import V1 from './v1-grid-three'
import V2 from './v2-masonry'
import V3 from './v3-carousel'
import V4 from './v4-lightbox-grid'
import V5 from './v5-before-after-sl'
import V6 from './v6-polaroid-stack'
import V7 from './v7-fullbleed-tiles'
import V8 from './v8-video-thumbnails'
import V9 from './v9-timeline-cards'
import V10 from './v10-stack-rotating'
import type { ProjectsProps } from './types'

const VARIANTS = [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10] as const

interface ProjectsPickerProps extends ProjectsProps {
  variantId: number
}

export default function ProjectsPicker({ variantId, ...rest }: ProjectsPickerProps) {
  const idx = Math.max(1, Math.min(10, variantId | 0)) - 1
  const Variant = VARIANTS[idx] ?? V1
  return <Variant {...rest} />
}
