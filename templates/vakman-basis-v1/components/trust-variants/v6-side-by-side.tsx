import { StarsRating, formatKvk, type TrustProps } from './types'

export default function TrustV6SideBySide(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const clients = p.clientsCount ?? 1200
  const warranty = p.warrantyYears ?? 5

  const bullets: Array<{ value: string; label: string }> = [
    { value: `${years}`, label: 'jaar in het vak — vakmanschap dat zichzelf bewijst.' },
    { value: `${clients}+`, label: 'klussen voltooid — van lekkages tot grote installaties.' },
    { value: `${warranty} jr`, label: 'garantie — wij staan achter wat we leveren.' },
  ]

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 bg-white">
      <style>{`
        @keyframes trust-v6-l { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes trust-v6-r { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        .trust-v6-l { animation: trust-v6-l .8s cubic-bezier(.16,1,.3,1) both; }
        .trust-v6-r { animation: trust-v6-r .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v6-l, .trust-v6-r { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="trust-v6-l text-center md:text-left">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-4">
              · KLANTOORDEEL
            </p>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span
                className="font-display font-black tracking-tight leading-none"
                style={{ color: p.primaryColor, fontSize: 'clamp(5rem, 14vw, 10rem)' }}
              >
                {p.reviewRating.toFixed(1)}
              </span>
              <span className="text-2xl text-[var(--color-ink-400)] font-display">/ 5</span>
            </div>
            <div className="mt-4 flex justify-center md:justify-start">
              <StarsRating rating={p.reviewRating} color={p.primaryColor} size={28} />
            </div>
            <p className="mt-5 text-sm text-[var(--color-ink-600)]">
              <strong className="font-display font-bold text-[var(--color-ink-900)]">{p.reviewCount}</strong> reviews op Google · {formatKvk(p.kvk)}
            </p>
          </div>

          <div className="trust-v6-r">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-6">
              · WAT JE KRIJGT
            </p>
            <ul className="space-y-6">
              {bullets.map((b) => (
                <li key={b.label} className="flex items-start gap-4">
                  <span
                    className="font-display font-black text-3xl md:text-4xl tracking-tight leading-none shrink-0"
                    style={{ color: p.primaryColor, minWidth: '4rem' }}
                  >
                    {b.value}
                  </span>
                  <span className="text-sm md:text-base text-[var(--color-ink-700)] leading-relaxed pt-2">
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
