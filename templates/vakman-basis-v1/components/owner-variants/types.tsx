import type { CSSProperties, ReactElement } from 'react'

export interface OwnerProps {
  businessName: string
  ownerName: string
  photoUrl: string
  primaryColor: string
  accentColor?: string
  yearsActive?: number
  city?: string
}

export function isPhotoMissing(url: string | undefined | null): boolean {
  if (!url) return true
  const trimmed = url.trim()
  if (trimmed === '') return true
  if (trimmed.startsWith('{{')) return true
  return false
}

export function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0)
  if (parts.length === 0) return '?'
  const letters = parts.map((p) => p[0]?.toUpperCase() ?? '').filter(Boolean)
  return letters.slice(0, 2).join('')
}

export function getFirstName(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return ''
  const parts = trimmed.split(/\s+/)
  return parts[0] ?? ''
}

export function yearsLabel(years: number | undefined): number {
  return typeof years === 'number' && years > 0 ? years : 18
}

export function cityLabel(city: string | undefined): string {
  return city && city.trim().length > 0 ? city : 'de regio'
}

export function foundedYear(years: number | undefined): number {
  const currentYear = new Date().getFullYear()
  return currentYear - yearsLabel(years)
}

interface PhotoFallbackProps {
  ownerName: string
  primaryColor: string
  accentColor?: string
  shape?: 'circle' | 'square' | 'portrait'
  size?: number | string
  className?: string
  style?: CSSProperties
  fontScale?: number
}

export function PhotoFallback({
  ownerName,
  primaryColor,
  accentColor,
  shape = 'circle',
  size = 160,
  className = '',
  style,
  fontScale = 0.4,
}: PhotoFallbackProps): ReactElement {
  const initials = getInitials(ownerName)
  const radius = shape === 'circle' ? '9999px' : '14px'
  const aspectRatio = shape === 'portrait' ? '4/5' : '1/1'
  const second = accentColor ?? '#2C2C2C'
  const numericSize = typeof size === 'number' ? size : undefined
  const cssSize: string =
    typeof size === 'number' ? `${size}px` : size
  const fontSize =
    numericSize !== undefined ? `${Math.round(numericSize * fontScale)}px` : `${Math.round(fontScale * 100)}%`
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center text-white font-semibold tracking-wide select-none ${className}`}
      style={{
        width: cssSize,
        height: shape === 'portrait' ? undefined : cssSize,
        aspectRatio: shape === 'portrait' ? aspectRatio : undefined,
        borderRadius: radius,
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${second} 100%)`,
        fontSize,
        ...style,
      }}
    >
      {initials}
    </div>
  )
}

interface PhotoOrFallbackProps extends PhotoFallbackProps {
  photoUrl: string
  alt: string
  imgClassName?: string
  imgStyle?: CSSProperties
}

export function PhotoOrFallback({
  photoUrl,
  alt,
  ownerName,
  primaryColor,
  accentColor,
  shape = 'circle',
  size = 160,
  className = '',
  style,
  imgClassName,
  imgStyle,
  fontScale = 0.4,
}: PhotoOrFallbackProps): ReactElement {
  if (isPhotoMissing(photoUrl)) {
    return (
      <PhotoFallback
        ownerName={ownerName}
        primaryColor={primaryColor}
        accentColor={accentColor}
        shape={shape}
        size={size}
        className={className}
        style={style}
        fontScale={fontScale}
      />
    )
  }
  const radius = shape === 'circle' ? '9999px' : '14px'
  const cssSize = typeof size === 'number' ? `${size}px` : size
  return (
    <img
      src={photoUrl}
      alt={alt}
      loading="lazy"
      className={`object-cover ${imgClassName ?? className}`}
      style={{
        width: cssSize,
        height: shape === 'portrait' ? undefined : cssSize,
        aspectRatio: shape === 'portrait' ? '4/5' : undefined,
        borderRadius: radius,
        ...style,
        ...imgStyle,
      }}
    />
  )
}
