import { StarsRating, formatKvk, type TrustProps } from './types'

export default function TrustV1BadgeRow(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const warranty = p.warrantyYears ?? 5
  const kvkLabel = formatKvk(p.kvk)

  const badges: Array<{ key: string; node: React.ReactNode }> = [
    {
      key: 'rating',
      node: (
        <>
          <StarsRating rating={p.reviewRating} color={p.primaryColor} size={14} />
          <span className="font-display font-bold">{p.reviewRating.toFixed(1)}</span>
          <span className="text-[var(--color-ink-500)] text-xs">({p.reviewCount})</span>
        </>
      ),
    },
    {
      key: 'kvk',
      node: <span className="font-mono text-xs tracking-wider">{kvkLabel}</span>,
    },
    {
      key: 'years',
      node: <span className="text-sm"><strong className="font-display font-bold">{years}</strong> jaar actief</span>,
    },
    {
      key: 'warranty',
      node: <span className="text-sm"><strong className="font-display font-bold">{warranty} jaar</strong> garantie</span>,
    },
    {
      key: 'anwb',
      node: <span className="text-sm font-mono tracking-wide">ANWB-erkend</span>,
    },
  ]

  return (
    <section className="py-12 md:py-16 px-6 md:px-12 bg-white border-y border-[var(--color-ink-200)]">
      <style>{`
        @keyframes trust-v1-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .trust-v1-pill { animation: trust-v1-fade .5s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .trust-v1-pill { animation: none !important; opacity: 1 !important; transform: none !important; } }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-5 text-center">
          · WAAROM KIES JE ONS
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {badges.map((b, i) => (
            <div
              key={b.key}
              className="trust-v1-pill inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-ink-200)] bg-[var(--color-ink-100)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {b.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
