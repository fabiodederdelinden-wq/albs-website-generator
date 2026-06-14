import { ImageResponse } from 'next/og'
import { SITE } from './site-config'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// Favicon: monogram in klantkleur — elke site direct herkenbaar in de browser-tab.
export default function Icon() {
  const initial = (SITE.name.trim()[0] ?? 'A').toUpperCase()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: SITE.primaryColor,
          borderRadius: 14,
          color: '#ffffff',
          fontSize: 38,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        {initial}
      </div>
    ),
    size,
  )
}
