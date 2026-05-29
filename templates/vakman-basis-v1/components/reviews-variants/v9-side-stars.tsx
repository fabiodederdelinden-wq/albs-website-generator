import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV9SideStars(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  const recent = reviews.slice(0, 4)

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">
          {/* LEFT — big aggregate */}
          <aside className="lg:sticky lg:top-24">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">· Reviews</p>
            <div
              className="text-7xl md:text-8xl font-black leading-none mb-4"
              style={{ color: primaryColor }}
            >
              {reviewRating.toFixed(1)}
            </div>
            <Stars rating={reviewRating} color={primaryColor} size={28} />
            <p className="mt-3 text-lg text-neutral-700">
              gemiddeld op <span className="font-bold">{reviewCount}</span> reviews
            </p>
            <div className="mt-4">
              <GoogleBadge size={16} />
            </div>

            {/* mini-distributie */}
            <div className="mt-8 space-y-2 max-w-[280px]">
              {[
                { label: 'Vakkundigheid', pct: 98 },
                { label: 'Op tijd', pct: 95 },
                { label: 'Communicatie', pct: 92 },
                { label: 'Prijs/kwaliteit', pct: 90 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="text-neutral-600">{m.label}</span>
                    <span className="font-bold">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${m.pct}%`, background: primaryColor }} />
                  </div>
                </div>
              ))}
            </div>

            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm font-semibold border-b-2 pb-1 hover:opacity-70"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Alle {reviewCount} reviews →
              </a>
            )}
          </aside>

          {/* RIGHT — list of recent reviews */}
          <div className="space-y-5">
            {recent.map((r, i) => (
              <article
                key={`${r.author}-${i}`}
                className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="font-bold">{r.author}</p>
                      <span className="text-[11px] text-neutral-500">{r.date}</span>
                    </div>
                    <Stars rating={r.rating} color={primaryColor} size={14} />
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-800">&ldquo;{r.text}&rdquo;</p>
                  </div>
                </div>
              </article>
            ))}
            {reviews.length > recent.length && (
              <p className="text-center text-sm text-neutral-500">+ {reviewCount - recent.length} meer reviews</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
