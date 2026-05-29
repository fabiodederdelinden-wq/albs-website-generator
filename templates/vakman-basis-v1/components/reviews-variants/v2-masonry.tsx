import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV2Masonry(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">· Reviews</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Echt waardering</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100">
            <Stars rating={reviewRating} color={primaryColor} size={18} />
            <span className="font-bold">{reviewRating.toFixed(1)}</span>
            <span className="text-neutral-500 text-sm">· {reviewCount} reviews op Google</span>
          </div>
        </div>

        <div
          className="md:columns-2 lg:columns-3 gap-5"
          style={{ columnFill: 'balance' }}
        >
          {reviews.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="break-inside-avoid mb-5 bg-neutral-50 border border-neutral-200 rounded-xl p-5 inline-block w-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate">{r.author}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars rating={r.rating} color={primaryColor} size={12} />
                    <span className="text-[11px] text-neutral-500">{r.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-neutral-800">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-3 pt-2 border-t border-neutral-200/70">
                <GoogleBadge />
              </div>
            </article>
          ))}
        </div>

        {sourceUrl && (
          <div className="mt-10 text-center">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold underline underline-offset-4 hover:no-underline"
              style={{ color: primaryColor }}
            >
              Alle {reviewCount} reviews op Google →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
