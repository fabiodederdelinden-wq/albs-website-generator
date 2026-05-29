import { Stars, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV7StarGrid(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">· Reviews</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">
            <span style={{ color: primaryColor }}>{reviewRating.toFixed(1)}</span>{' '}
            <span className="text-neutral-900">van 5 sterren</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars rating={reviewRating} color={primaryColor} size={22} />
            <span className="text-sm text-neutral-500 ml-2">· {reviewCount} reviews op Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 flex flex-col text-center"
            >
              <div className="flex justify-center mb-3">
                <Stars rating={r.rating} color={primaryColor} size={18} />
              </div>
              <p className="text-[14px] leading-relaxed text-neutral-800 flex-1 mb-4">
                &ldquo;{r.text.length > 140 ? r.text.slice(0, 137) + '...' : r.text}&rdquo;
              </p>
              <div className="pt-3 border-t border-neutral-200">
                <p className="font-bold text-sm">{r.author}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{r.date}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <GoogleBadge size={16} />
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold border-b-2 pb-1 hover:opacity-70"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Bekijk alle {reviewCount} reviews op Google →
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
