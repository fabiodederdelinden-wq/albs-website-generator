import { Stars, Avatar, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV3Spotlight(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  const main = reviews[0]
  const thumbs = reviews.slice(1)

  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-neutral-50 to-white">
      <style>{`
        @keyframes rv3-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .rv3-anim { animation: rv3-fade .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .rv3-anim { animation: none !important; } }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 rv3-anim">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">· Reviews</p>
          <div className="flex items-center justify-center gap-3">
            <Stars rating={reviewRating} color={primaryColor} size={26} />
            <span className="text-3xl font-black">{reviewRating.toFixed(1)}</span>
            <span className="text-neutral-500">· {reviewCount} reviews</span>
          </div>
        </div>

        {main && (
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 md:p-12 shadow-lg rv3-anim text-center" style={{ animationDelay: '.1s' }}>
            <div
              className="text-6xl leading-none mb-4 inline-block"
              style={{ color: primaryColor, fontFamily: 'Georgia, serif' }}
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <blockquote className="text-xl md:text-2xl leading-relaxed text-neutral-800 italic mb-6">
              {main.text}
            </blockquote>
            <Stars rating={main.rating} color={primaryColor} size={20} />
            <div className="flex items-center justify-center gap-3 mt-5">
              <Avatar photoUrl={main.photoUrl} initials={main.initials} color={primaryColor} size={44} />
              <div className="text-left">
                <p className="font-bold">{main.author}</p>
                <p className="text-[12px] text-neutral-500">{main.date}</p>
              </div>
            </div>
            <div className="mt-5">
              <GoogleBadge />
            </div>
          </div>
        )}

        {thumbs.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rv3-anim" style={{ animationDelay: '.2s' }}>
            {thumbs.map((r, i) => (
              <div
                key={`${r.author}-${i}`}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-neutral-200 shadow-sm"
                title={r.text}
              >
                <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={28} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold leading-tight">{r.author.split(' ')[0]}</span>
                  <Stars rating={r.rating} color={primaryColor} size={10} />
                </div>
              </div>
            ))}
          </div>
        )}

        {sourceUrl && (
          <div className="mt-10 text-center">
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
      </div>
    </section>
  )
}
