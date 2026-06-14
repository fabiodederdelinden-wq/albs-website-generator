export interface TrustProps {
  reviewCount: number
  reviewRating: number
  kvk: string
  primaryColor: string
  accentColor?: string
  yearsActive?: number
  clientsCount?: number
  warrantyYears?: number
}

export const DEFAULT_TRUST_PROPS: TrustProps = {
  reviewCount: 47,
  reviewRating: 4.9,
  kvk: '12345678',
  primaryColor: '#FF8C42',
  accentColor: '#2C2C2C',
  yearsActive: 18,
  clientsCount: 1200,
  warrantyYears: 5,
}

/** True wanneer KvK leeg is of placeholder-bullets bevat. */
export function hasValidKvk(kvk: string | undefined | null): boolean {
  if (!kvk) return false
  const trimmed = kvk.trim()
  if (trimmed.length === 0) return false
  if (trimmed.includes('•')) return false
  return /\d/.test(trimmed)
}

/** Render-veilige KvK-string, of lege string wanneer onbekend (dan segment weglaten). */
export function formatKvk(kvk: string | undefined | null): string {
  return hasValidKvk(kvk) ? `KvK ${kvk}` : ''
}

/** 5 sterren SVG inline, gevuld op basis van rating. */
export interface StarsRatingProps {
  rating: number
  size?: number
  color: string
  emptyColor?: string
}

export function StarsRating({ rating, size = 18, color, emptyColor = '#E5E5E5' }: StarsRatingProps) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? color : emptyColor}
          aria-hidden="true"
        >
          <path d="M12 2l2.92 6.32L22 9.27l-5.5 4.93L18.18 22 12 18.27 5.82 22 7.5 14.2 2 9.27l7.08-.95L12 2z" />
        </svg>
      ))}
    </span>
  )
}

/** Geometric badge-icon helper props. */
export interface BadgeIconProps {
  kind: 'vca' | 'kiwa' | 'isso' | 'anwb' | 'garantie' | 'erkend' | 'bovag' | 'sbr'
  size?: number
  color: string
  bg?: string
}

export function BadgeIcon({ kind, size = 56, color, bg = '#FFFFFF' }: BadgeIconProps) {
  const s = size
  if (kind === 'vca') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 4 L56 14 V32 C56 46 44 56 32 60 C20 56 8 46 8 32 V14 Z" fill={color} />
        <text x="32" y="40" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24" fill={bg}>V</text>
      </svg>
    )
  }
  if (kind === 'kiwa') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill={color} />
        <text x="32" y="41" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="26" fill={bg}>K</text>
      </svg>
    )
  }
  if (kind === 'isso') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <rect x="6" y="6" width="52" height="52" rx="6" fill={color} />
        <text x="32" y="39" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" fill={bg}>ISSO</text>
      </svg>
    )
  }
  if (kind === 'anwb') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 12 H54 V40 L32 58 L10 40 Z" fill={color} />
        <text x="32" y="34" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="11" fill={bg}>ERKEND</text>
      </svg>
    )
  }
  if (kind === 'garantie') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 6 L58 32 L32 58 L6 32 Z" fill={color} />
        <text x="32" y="37" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" fill={bg}>5 JR</text>
      </svg>
    )
  }
  if (kind === 'erkend') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill={color} />
        <path d="M20 33 L29 42 L46 24" stroke={bg} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === 'bovag') {
    return (
      <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
        <rect x="6" y="14" width="52" height="36" rx="4" fill={color} />
        <text x="32" y="38" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="12" fill={bg}>VAKMAN</text>
      </svg>
    )
  }
  // sbr
  return (
    <svg width={s} height={s} viewBox="0 0 64 64" aria-hidden="true">
      <polygon points="32,6 58,20 58,44 32,58 6,44 6,20" fill={color} />
      <text x="32" y="38" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="14" fill={bg}>SBR</text>
    </svg>
  )
}
