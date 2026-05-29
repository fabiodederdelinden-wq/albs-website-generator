import { StarsRating, formatKvk, type TrustProps } from './types'

export default function TrustV2StatsCounter(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const clients = p.clientsCount ?? 1200
  const warranty = p.warrantyYears ?? 5

  const stats: Array<{ value: string; label: string; sub?: React.ReactNode }> = [
    {
      value: p.reviewRating.toFixed(1),
      label: `${p.reviewCount} reviews op Google`,
      sub: <StarsRating rating={p.reviewRating} color={p.primaryColor} size={18} />,
    },
    {
      value: `${years}`,
      label: 'jaar ervaring in het vak',
    },
    {
      value: `${clients}+`,
      label: 'klussen succesvol voltooid',
    },
    {
      value: `${warranty}`,
      label: 'jaar garantie op werk',
    },
  ]

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-[var(--color-ink-950)] text-white overflow-hidden">
      <style>{`
        @keyframes trust-v2-rise {
          0% { opacity: 0; transform: translateY(28px); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes trust-v2-pop {
          0% { opacity: 0; transform: scale(.7); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .trust-v2-num { animation: trust-v2-pop 1.1s cubic-bezier(.16,1,.3,1) both; }
        .trust-v2-row { animation: trust-v2-rise .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v2-num, .trust-v2-row { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${p.primaryColor} 1px, transparent 1px), linear-gradient(to bottom, ${p.primaryColor} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="trust-v2-row text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-3">
            · CIJFERS DIE TELLEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Bewijs in plaats van beloftes
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--color-ink-300)] max-w-2xl mx-auto">
            {formatKvk(p.kvk)} · ingeschreven bij de Kamer van Koophandel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="trust-v2-row text-center md:text-left"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <p
                className="trust-v2-num font-display font-black text-5xl md:text-7xl tracking-tight leading-none"
                style={{ color: p.primaryColor, animationDelay: `${i * 120 + 200}ms` }}
              >
                {s.value}
              </p>
              {s.sub && <div className="mt-3">{s.sub}</div>}
              <p className="mt-3 text-xs md:text-sm text-[var(--color-ink-300)] leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
