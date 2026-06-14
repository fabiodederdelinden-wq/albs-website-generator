import { ImageResponse } from 'next/og'
import { SITE } from './site-config'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          color: '#ffffff',
          fontSize: 104,
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
