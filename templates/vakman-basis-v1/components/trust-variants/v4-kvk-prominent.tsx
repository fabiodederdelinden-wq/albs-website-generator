import { StarsRating, hasValidKvk, type TrustProps } from './types'

export default function TrustV4KvkProminent(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const startYear = new Date().getFullYear() - years
  const kvkOk = hasValidKvk(p.kvk)

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 bg-[var(--color-ink-100)]">
      <style>{`
        @keyframes trust-v4-slide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes trust-v4-slide-r { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .trust-v4-l { animation: trust-v4-slide .7s cubic-bezier(.16,1,.3,1) both; }
        .trust-v4-r { animation: trust-v4-slide-r .7s cubic-bezier(.16,1,.3,1) .15s both; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v4-l, .trust-v4-r { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 items-stretch">
          <div className="trust-v4-l bg-[var(--color-ink-950)] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full opacity-[0.08]"
              style={{ background: p.primaryColor }}
            />
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-4">
              · OFFICIEEL GEREGISTREERD
            </p>
            {kvkOk ? (
              <>
                <p className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                  KvK <span style={{ color: p.primaryColor }}>{p.kvk}</span>
                </p>
                <p className="mt-3 text-base md:text-lg text-[var(--color-ink-300)]">
                  Ingeschreven sinds {startYear} · {years} jaar actief in het vak
                </p>
              </>
            ) : (
              <>
                <p className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                  KvK: <span style={{ color: p.primaryColor }}>niet beschikbaar</span>
                </p>
                <p className="mt-3 text-base md:text-lg text-[var(--color-ink-300)]">
                  {years} jaar actief in het vak
                </p>
              </>
            )}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={p.primaryColor} strokeWidth="2.5" aria-hidden="true">
                <path d="M12 2 L4 6 V12 C4 17 8 21 12 22 C16 21 20 17 20 12 V6 Z" strokeLinejoin="round" />
                <path d="M9 12 L11 14 L15 10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-mono tracking-wider uppercase">Officieel ingeschreven</span>
            </div>
          </div>

          <div className="trust-v4-r bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-[var(--color-ink-200)]">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
              · KLANTOORDEEL
            </p>
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-5xl md:text-6xl tracking-tight" style={{ color: p.primaryColor }}>
                {p.reviewRating.toFixed(1)}
              </span>
              <span className="text-2xl text-[var(--color-ink-400)]">/ 5.0</span>
            </div>
            <div className="mt-3">
              <StarsRating rating={p.reviewRating} color={p.primaryColor} size={22} />
            </div>
            <p className="mt-4 text-sm text-[var(--color-ink-600)]">
              Gebaseerd op <strong className="font-display font-bold text-[var(--color-ink-900)]">{p.reviewCount} reviews</strong> op Google.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
