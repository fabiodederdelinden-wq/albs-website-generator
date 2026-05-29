interface StarsProps {
  rating: number
  color?: string
  size?: number
}

export function Stars({ rating, color = 'currentColor', size = 16 }: StarsProps) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color}
          style={{ opacity: i < filled ? 1 : 0.25 }}
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.5 21.7l1.8-7.3L1.6 9.5l7.5-.6L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

interface AvatarProps {
  photoUrl?: string
  initials: string
  color: string
  size?: number
}

export function Avatar({ photoUrl, initials, color, size = 40 }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function GoogleBadge({ size = 14 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
      <GoogleG size={size} />
      <span>Google Review</span>
    </span>
  )
}
