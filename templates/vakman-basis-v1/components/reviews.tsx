'use client'

import Reveal from './reveal'
import { Star } from 'lucide-react'

export interface ReviewItem {
  author: string // Geanonimiseerd: voornaam + initiaal
  initials: string // Avatar-letters
  /** @deprecated AVG: reviewer-foto's worden nooit gerenderd; veld genegeerd. */
  photoUrl?: string
  text: string
  rating: number
  date: string
}

export interface ReviewsProps {
  reviews: ReadonlyArray<ReviewItem>
  reviewCount: number
  reviewRating: number
  sourceUrl: string
  primaryColor: string
  /** Random kiezer in orchestrator: 1=cards, 2=quote-feature, 3=split-photo */
  variant?: 1 | 2 | 3
}

export default function Reviews({
  reviews,
  reviewCount,
  reviewRating,
  sourceUrl,
  primaryColor,
  variant = 1,
}: ReviewsProps) {
  if (!reviews || reviews.length === 0) return null
  if (variant === 2) return <ReviewsQuoteFeature {...{ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }} />
  if (variant === 3) return <ReviewsSplitPhoto {...{ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }} />
  return <ReviewsCards {...{ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }} />
}

function StarRow({ rating, color, size = 14 }: { rating: number; color: string; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          width={size}
          height={size}
          fill={s <= rating ? color : '#E5E5E5'}
          stroke="none"
        />
      ))}
    </div>
  )
}

// AVG: altijd initialen-cirkel in klantkleur. Foto's van reviewers (derden) mogen
// niet zonder hun toestemming gepubliceerd worden; photoUrl wordt bewust genegeerd.
function Avatar({ initials, color, size = 40 }: { photoUrl?: string; initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-display font-bold text-white shrink-0"
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
      aria-hidden
    >
      {initials}
    </div>
  )
}

function GoogleBadge({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-[var(--color-ink-500)]">
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <span>Google Review</span>
    </span>
  )
}

// ─────────────────────────── Variant 1 — Cards-grid ───────────────────────────
function ReviewsCards({ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }: Omit<ReviewsProps, 'variant'>) {
  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-ink-100)]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
                · WAT KLANTEN ZEGGEN
              </p>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Echte reviews</h2>
              <div className="flex items-center gap-3 mt-4">
                <StarRow rating={Math.round(reviewRating)} color={primaryColor} size={20} />
                <span className="font-display font-bold text-xl">{reviewRating.toFixed(1)}</span>
                <span className="text-sm text-[var(--color-ink-500)]">· {reviewCount} reviews op Google</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <Reveal key={`${r.author}-${i}`} delayMs={i * 80}>
              <article className="bg-white border border-[var(--color-ink-200)] rounded-lg p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm truncate">{r.author}</p>
                    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-[var(--color-ink-500)]">
                      {r.date}
                    </p>
                  </div>
                </div>
                <StarRow rating={r.rating} color={primaryColor} />
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-900)] flex-1">“{r.text}”</p>
                <div className="mt-5 pt-4 border-t border-[var(--color-ink-200)]">
                  <GoogleBadge color={primaryColor} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {sourceUrl && (
          <Reveal>
            <div className="mt-10 text-center">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] border-b border-[var(--color-ink-300)] hover:border-[var(--color-ink-900)] pb-1"
              >
                Bekijk alle reviews op Google →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────── Variant 2 — Quote-feature ───────────────────────────
function ReviewsQuoteFeature({ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }: Omit<ReviewsProps, 'variant'>) {
  const main = reviews[0]
  const rest = reviews.slice(1, 4)
  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-ink-950)] text-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight">
              {reviewRating.toFixed(1)}{' '}
              <span className="text-2xl" style={{ color: primaryColor }}>★</span>
              <span className="text-base font-mono ml-3 text-[var(--color-ink-400)]">· {reviewCount} reviews</span>
            </h2>
            <GoogleBadge color={primaryColor} />
          </div>
        </Reveal>

        {main && (
          <Reveal>
            <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-12">
              <div className="flex flex-col items-center md:items-start gap-3">
                <Avatar photoUrl={main.photoUrl} initials={main.initials} color={primaryColor} size={120} />
                <div className="text-center md:text-left">
                  <p className="font-display font-bold text-base">{main.author}</p>
                  <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-ink-400)]">{main.date}</p>
                </div>
                <StarRow rating={main.rating} color={primaryColor} size={16} />
              </div>
              <blockquote
                className="text-2xl md:text-3xl font-display leading-snug"
                style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '24px' }}
              >
                “{main.text}”
              </blockquote>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((r, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <article className="bg-[var(--color-ink-900)] border border-[var(--color-ink-800)] rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-display font-bold truncate">{r.author}</p>
                    <StarRow rating={r.rating} color={primaryColor} size={11} />
                  </div>
                </div>
                <p className="text-sm leading-relaxed line-clamp-4">“{r.text}”</p>
              </article>
            </Reveal>
          ))}
        </div>

        {sourceUrl && (
          <Reveal>
            <div className="mt-10 text-center">
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-400)] hover:text-white border-b border-[var(--color-ink-700)] pb-1">
                Alle reviews op Google →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────── Variant 3 — Split-photo ───────────────────────────
function ReviewsSplitPhoto({ reviews, reviewCount, reviewRating, sourceUrl, primaryColor }: Omit<ReviewsProps, 'variant'>) {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">· REVIEWS</p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-3">
            {reviewRating.toFixed(1)}{' '}
            <span style={{ color: primaryColor }}>★</span>
            <span className="text-base font-mono ml-3 text-[var(--color-ink-500)]">· {reviewCount} keer beoordeeld</span>
          </h2>
          <GoogleBadge color={primaryColor} />
        </Reveal>

        <div className="mt-12 space-y-6">
          {reviews.map((r, i) => (
            <Reveal key={i} delayMs={i * 80}>
              <article
                className={`grid md:grid-cols-[140px_1fr] gap-6 items-start p-6 rounded-lg ${
                  i % 2 === 0 ? 'bg-[var(--color-ink-100)]' : 'bg-white border border-[var(--color-ink-200)]'
                }`}
              >
                <div className="flex md:flex-col items-center md:items-start gap-3">
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={80} />
                  <div className="md:text-left">
                    <p className="font-display font-bold">{r.author}</p>
                    <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-ink-500)] mt-1">{r.date}</p>
                    <div className="mt-2">
                      <StarRow rating={r.rating} color={primaryColor} size={14} />
                    </div>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-[var(--color-ink-900)]">“{r.text}”</p>
              </article>
            </Reveal>
          ))}
        </div>

        {sourceUrl && (
          <Reveal>
            <div className="mt-10 text-center">
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] border-b border-[var(--color-ink-300)] pb-1">
                Alle reviews op Google →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
