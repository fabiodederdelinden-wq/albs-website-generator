'use client'

import Reveal from './reveal'

export interface OwnerProps {
  businessName: string
  ownerName?: string
  ownerRole?: string
  photoUrl?: string
  intro?: string
  primaryColor: string
  /** 1=portrait-left, 2=center-card, 3=full-width */
  variant?: 1 | 2 | 3
}

export default function OwnerSection({
  businessName,
  ownerName,
  ownerRole,
  photoUrl,
  intro,
  primaryColor,
  variant = 1,
}: OwnerProps) {
  // Geen foto en geen naam → skip sectie helemaal
  if (!photoUrl && !ownerName) return null

  const headline = ownerName ? `Dit ben ik` : `Dit zijn wij`
  const displayName = ownerName ?? businessName
  const displayRole = ownerRole ?? 'Eigenaar'
  const displayIntro =
    intro ??
    `Bij ${businessName} staat persoonlijke service voorop. Korte lijntjes, eerlijke prijzen, vakkundig werk.`

  if (variant === 3) {
    return (
      <section className="relative py-24 px-6 md:px-12 bg-[var(--color-ink-950)] text-white overflow-hidden">
        {photoUrl && (
          <img
            src={photoUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink-950)] via-[var(--color-ink-950)]/80 to-transparent" />
        <div className="relative max-w-3xl">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-3">· {headline.toUpperCase()}</p>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight mb-4">{displayName}</h2>
            <p className="text-sm font-mono tracking-[0.2em] uppercase mb-6" style={{ color: primaryColor }}>{displayRole}</p>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-200)] max-w-2xl">
              {displayIntro}
            </p>
          </Reveal>
        </div>
      </section>
    )
  }

  if (variant === 2) {
    return (
      <section className="py-24 px-6 md:px-12 bg-[var(--color-ink-100)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-6">· {headline.toUpperCase()}</p>
            {photoUrl && (
              <img
                src={photoUrl}
                alt={displayName}
                width={160}
                height={160}
                loading="lazy"
                className="rounded-full object-cover mx-auto shadow-lg ring-4 ring-white"
                style={{ width: 160, height: 160 }}
              />
            )}
            <h2 className="mt-8 font-display font-black text-3xl md:text-4xl tracking-tight">{displayName}</h2>
            <p className="text-sm font-mono tracking-[0.2em] uppercase mt-2" style={{ color: primaryColor }}>{displayRole}</p>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-ink-900)] max-w-xl mx-auto">
              {displayIntro}
            </p>
          </Reveal>
        </div>
      </section>
    )
  }

  // Variant 1 — portrait-left default
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-12 items-center">
        <Reveal>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={displayName}
              width={280}
              height={350}
              loading="lazy"
              className="rounded-lg object-cover w-full"
              style={{ aspectRatio: '4/5' }}
            />
          ) : (
            <div
              className="rounded-lg flex items-center justify-center text-6xl font-display font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, var(--color-ink-900))`,
                aspectRatio: '4/5',
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </Reveal>
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">· {headline.toUpperCase()}</p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-3">{displayName}</h2>
          <p className="text-sm font-mono tracking-[0.2em] uppercase mb-6" style={{ color: primaryColor }}>{displayRole}</p>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-900)]">{displayIntro}</p>
        </Reveal>
      </div>
    </section>
  )
}
