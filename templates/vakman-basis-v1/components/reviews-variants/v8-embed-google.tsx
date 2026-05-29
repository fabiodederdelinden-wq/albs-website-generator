import { Stars, Avatar, GoogleG } from './_helpers'
import type { ReviewsProps } from './types'

export default function ReviewsV8EmbedGoogle(p: ReviewsProps) {
  const { reviews, reviewCount, reviewRating, sourceUrl, primaryColor } = p
  // Google-blue palette used inside the widget chrome
  const gBlue = '#1a73e8'

  return (
    <section className="py-20 md:py-24 px-6 bg-neutral-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
          {/* Widget header */}
          <header className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-neutral-200 bg-white">
            <div className="flex items-center gap-3">
              <GoogleG size={28} />
              <div>
                <p className="font-bold text-[15px] leading-tight">Google Reviews</p>
                <p className="text-[11px] text-neutral-500">Loodgieter Jansen</p>
              </div>
            </div>
            <a
              href={sourceUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold hover:underline"
              style={{ color: gBlue }}
            >
              Beoordeling schrijven
            </a>
          </header>

          {/* Big rating block */}
          <div className="px-5 md:px-6 py-6 border-b border-neutral-100 flex items-center gap-5">
            <div className="text-center">
              <p className="text-5xl font-black leading-none" style={{ color: '#202124' }}>
                {reviewRating.toFixed(1)}
              </p>
              <div className="mt-2">
                <Stars rating={reviewRating} color="#fbbc04" size={18} />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">{reviewCount} reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 85 : star === 4 ? 11 : star === 3 ? 2 : star === 2 ? 1 : 1
                return (
                  <div key={star} className="flex items-center gap-2 text-[11px]">
                    <span className="text-neutral-600 w-3">{star}</span>
                    <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${pct}%`, background: '#fbbc04' }} />
                    </div>
                    <span className="text-neutral-500 w-8 text-right">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reviews list */}
          <ul className="divide-y divide-neutral-100">
            {reviews.map((r, i) => (
              <li key={`${r.author}-${i}`} className="px-5 md:px-6 py-5">
                <div className="flex items-start gap-3">
                  <Avatar photoUrl={r.photoUrl} initials={r.initials} color={primaryColor} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px]" style={{ color: '#202124' }}>{r.author}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Stars rating={r.rating} color="#fbbc04" size={13} />
                      <span className="text-[11px] text-neutral-500">{r.date}</span>
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-neutral-700">{r.text}</p>
                    <div className="mt-3 flex items-center gap-4 text-[12px] text-neutral-500">
                      <button type="button" className="hover:text-neutral-800 inline-flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.3l1-4.6.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                        </svg>
                        Nuttig
                      </button>
                      <span>·</span>
                      <span>Op Google</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {sourceUrl && (
            <footer className="px-5 md:px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[13px] font-semibold hover:underline"
                style={{ color: gBlue }}
              >
                Bekijk alle {reviewCount} reviews op Google →
              </a>
            </footer>
          )}
        </div>
      </div>
    </section>
  )
}
