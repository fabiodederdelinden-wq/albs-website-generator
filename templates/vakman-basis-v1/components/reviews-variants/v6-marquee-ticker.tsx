import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV6MarqueeTicker(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  // duplicate for seamless loop
  const loop = [...reviews, ...reviews, ...reviews]

  return (
    <section className="py-20 md:py-24 bg-neutral-50 overflow-hidden">
      <style>{`
        @keyframes rv6-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .rv6-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: rv6-scroll 60s linear infinite;
        }
        .rv6-track:hover { animation-play-state: paused; }
        .rv6-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .rv6-track { animation: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2">· Live feed</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Reviews die binnenkomen</h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars rating={reviewRating} color={primaryColor} size={20} />
            <span className="text-xl font-bold">{reviewRating.toFixed(1)}</span>
            <span className="text-sm text-neutral-500">· {reviewCount} reviews</span>
          </div>
        </div>
      </div>

      <div className="rv6-mask">
        <div className="rv6-track py-3">
          {loop.map((r, i) => (
            <article
              key={`${r.author}-${i}`}
              className="flex-none w-[300px] bg-white border border-neutral-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate">{r.author}</p>
                  <Stars rating={r.rating} color={primaryColor} size={11} />
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-neutral-700 line-clamp-4">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <GoogleBadge />
                <span className="text-[10px] text-neutral-400">{r.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {sourceUrl && (
        <div className="max-w-6xl mx-auto px-6 mt-10 text-center">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold border-b-2 pb-1 hover:opacity-70"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            Bekijk alle {reviewCount} reviews op Google →
          </a>
        </div>
      )}
    </section>
  )
}
