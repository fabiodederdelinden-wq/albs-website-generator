import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV1Carousel(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  return (
    <section className="py-20 md:py-24 px-6 bg-neutral-50">
      <style>{`
        .rv1-scroll { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
        .rv1-card { scroll-snap-align: start; }
        .rv1-scroll::-webkit-scrollbar { height: 6px; }
        .rv1-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 3px; }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">· Reviews</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Wat klanten zeggen</h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars rating={reviewRating} color={primaryColor} size={22} />
            <span className="text-2xl font-bold">{reviewRating.toFixed(1)}</span>
            <span className="text-sm text-neutral-500">· {reviewCount} reviews</span>
          </div>
        </div>

        <div className="rv1-scroll flex gap-5 overflow-x-auto pb-6 -mx-6 px-6">
          {reviews.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="rv1-card flex-none w-[300px] md:w-[360px] bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} />
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{r.author}</p>
                  <p className="text-[11px] text-neutral-500">{r.date}</p>
                </div>
              </div>
              <Stars rating={r.rating} color={primaryColor} size={15} />
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-800 flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <GoogleBadge />
              </div>
            </article>
          ))}
        </div>

        {sourceUrl && (
          <div className="mt-8 text-center">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold border-b-2 pb-1 transition-colors hover:opacity-70"
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
