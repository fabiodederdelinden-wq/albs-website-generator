import { ImageResponse } from 'next/og'
import { SITE } from './site-config'

export const alt = `${'{{BUSINESS_NAME}}'} · ${'{{BUSINESS_CITY}}'}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// OG-image voor WhatsApp/socials: donker canvas, klantkleur-accent, naam + tagline.
// Gegenereerd bij build — geen externe assets nodig.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0d',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', width: 120, height: 10, background: SITE.primaryColor, borderRadius: 999 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>
            {SITE.name}
          </div>
          {SITE.tagline && (
            <div style={{ display: 'flex', fontSize: 34, color: '#b0b0bc' }}>{SITE.tagline}</div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 26, color: '#8a8a96' }}>
            {[SITE.city, SITE.phone].filter(Boolean).join('  ·  ')}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              background: SITE.primaryColor,
              borderRadius: 16,
              color: '#ffffff',
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            {(SITE.name.trim()[0] ?? 'A').toUpperCase()}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
