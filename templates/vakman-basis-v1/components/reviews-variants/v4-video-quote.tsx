import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV4VideoQuote(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  return (
    <section className="py-20 md:py-24 px-6 bg-neutral-950 text-white">
      <style>{`
        @keyframes rv4-pulse {
          0%, 100% { transform: scale(1); opacity: .6; }
          50% { transform: scale(1.15); opacity: .9; }
        }
        .rv4-pulse { animation: rv4-pulse 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .rv4-pulse { animation: none !important; } }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-2">· Klant aan het woord</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Verhalen van klanten</h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars rating={reviewRating} color={primaryColor} size={22} />
            <span className="text-xl font-bold">{reviewRating.toFixed(1)}</span>
            <span className="text-sm text-neutral-400">· {reviewCount} reviews</span>
          </div>
        </div>

        <div className="space-y-10">
          {reviews.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-center"
            >
              <div className="relative mx-auto md:mx-0">
                <div
                  className="relative rounded-full overflow-hidden shadow-2xl"
                  style={{ width: 160, height: 160, border: `3px solid ${primaryColor}` }}
                >
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={160} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div
                      className="rv4-pulse rounded-full flex items-center justify-center shadow-lg"
                      style={{ width: 56, height: 56, background: primaryColor }}
                      aria-label="Speel video"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Stars rating={r.rating} color={primaryColor} size={18} />
                <blockquote className="mt-3 text-lg md:text-xl leading-relaxed italic text-neutral-100">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <span className="font-bold">{r.author}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400">{r.date}</span>
                  <span className="text-neutral-500">·</span>
                  <GoogleBadge />
                </div>
              </div>
            </article>
          ))}
        </div>

        {sourceUrl && (
          <div className="mt-12 text-center">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold border-b-2 pb-1"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Bekijk alle {reviewCount} reviews op Google →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
