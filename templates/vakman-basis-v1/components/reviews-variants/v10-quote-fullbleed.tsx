import { Stars, GoogleBadge } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV10QuoteFullbleed(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor, accentColor } = p
  const tint = accentColor || '#2C2C2C'

  return (
    <section className="bg-neutral-950 text-white">
      <style>{`
        @keyframes rv10-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rv10-rise { animation: rv10-rise .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .rv10-rise { animation: none !important; }
        }
      `}</style>

      {/* Intro band */}
      <div className="px-6 py-16 md:py-20 text-center border-b border-white/10">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50 mb-3">· Reviews</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">In hun eigen woorden</h2>
        <div className="inline-flex items-center gap-3">
          <Stars rating={reviewRating} color={primaryColor} size={22} />
          <span className="text-xl font-bold">{reviewRating.toFixed(1)}</span>
          <span className="text-white/60">· {reviewCount} reviews</span>
        </div>
      </div>

      {/* One quote per "screen" */}
      {reviews.map((r, i) => {
        const gradient =
          i % 2 === 0
            ? `radial-gradient(ellipse at top, ${primaryColor}22, transparent 55%), linear-gradient(180deg, #0a0a0a, #161616)`
            : `radial-gradient(ellipse at bottom, ${tint}55, transparent 55%), linear-gradient(180deg, #111, #050505)`
        return (
          <div
            key={`${r.author}-${i}`}
            className="relative px-6 py-24 md:py-32 flex items-center justify-center min-h-[60vh] border-b border-white/10"
            style={{ background: gradient }}
          >
            <div className="max-w-3xl text-center rv10-rise">
              <Stars rating={r.rating} color={primaryColor} size={26} />
              <div
                className="text-7xl leading-none mt-6 mb-2 select-none"
                style={{ color: primaryColor, fontFamily: 'Georgia, serif' }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote className="text-2xl md:text-4xl leading-snug font-light italic text-white">
                {r.text}
              </blockquote>
              <div className="mt-10 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-white/30" aria-hidden="true" />
                <div className="text-left">
                  <p className="font-bold text-base">{r.author}</p>
                  <p className="text-[12px] text-white/50">{r.date}</p>
                </div>
                <span className="h-px w-10 bg-white/30" aria-hidden="true" />
              </div>
              <div className="mt-5 flex justify-center opacity-70">
                <GoogleBadge />
              </div>
            </div>
          </div>
        )
      })}

      {sourceUrl && (
        <div className="px-6 py-16 text-center">
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
