import { Stars, Avatar, GoogleG } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV5WithSource(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">· Geverifieerde reviews</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Onafhankelijk beoordeeld</h2>
          </div>
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-neutral-200 bg-white">
            <GoogleG size={28} />
            <div>
              <div className="flex items-center gap-2">
                <Stars rating={reviewRating} color={primaryColor} size={16} />
                <span className="font-bold">{reviewRating.toFixed(1)}</span>
              </div>
              <p className="text-[11px] text-neutral-500">{reviewCount} reviews · Google</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="bg-white border border-neutral-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={48} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-[15px]">{r.author}</p>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: '#f1f5ff', color: '#1a73e8' }}
                    >
                      <GoogleG size={10} />
                      Google
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Stars rating={r.rating} color={primaryColor} size={13} />
                    <span className="text-[12px] text-neutral-500">· {r.date}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-800">&ldquo;{r.text}&rdquo;</p>
                </div>
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
              style={{ background: primaryColor }}
            >
              <GoogleG size={18} />
              Bekijk alle {reviewCount} reviews op Google
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
