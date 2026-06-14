import type { MetadataRoute } from 'next'
import { SITE } from './site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} · ${SITE.city}`,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: SITE.primaryColor,
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
