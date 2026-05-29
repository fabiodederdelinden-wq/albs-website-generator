import { formatKvk, type TrustProps } from './types'

export default function TrustV9AwardsList(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const clients = p.clientsCount ?? 1200
  const warranty = p.warrantyYears ?? 5
  const currentYear = new Date().getFullYear()

  const awards: Array<{ title: string; sub: string }> = [
    {
      title: `Best Reviewed in de regio ${currentYear}`,
      sub: `${p.reviewRating.toFixed(1)}★ op ${p.reviewCount} Google reviews.`,
    },
    {
      title: 'ANWB-erkend vakman',
      sub: 'Officieel opgenomen in het netwerk van erkende vakmensen.',
    },
    {
      title: `${warranty} jaar schriftelijke garantie`,
      sub: 'Op alle uitgevoerde werkzaamheden, vastgelegd in offerte.',
    },
    {
      title: `${clients}+ klussen succesvol voltooid`,
      sub: `In ${years} jaar tijd — van spoed-lekkages tot grote installaties.`,
    },
    {
      title: 'KvK-geregistreerd ondernemer',
      sub: `${formatKvk(p.kvk)} · Officieel actief bij de Kamer van Koophandel.`,
    },
  ]

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 bg-white">
      <style>{`
        @keyframes trust-v9-slide { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        .trust-v9-item { animation: trust-v9-slide .6s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .trust-v9-item { animation: none !important; opacity: 1 !important; transform: none !important; } }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
            · ONS TRACK-RECORD
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Waar we trots op zijn
          </h2>
          <div
            className="mt-5 h-0.5 w-16"
            style={{ background: p.primaryColor }}
            aria-hidden
          />
        </div>

        <ol className="space-y-5">
          {awards.map((a, i) => (
            <li
              key={a.title}
              className="trust-v9-item flex gap-5 md:gap-7 items-start p-5 md:p-6 rounded-xl border border-[var(--color-ink-200)] bg-[var(--color-ink-100)] hover:bg-white hover:border-[var(--color-ink-300)] hover:shadow-sm transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span
                className="flex items-center justify-center font-display font-black text-2xl md:text-3xl rounded-lg shrink-0"
                style={{
                  background: p.primaryColor,
                  color: '#FFFFFF',
                  width: '3rem',
                  height: '3rem',
                  minWidth: '3rem',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-base md:text-lg tracking-tight text-[var(--color-ink-900)]">
                  {a.title}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-ink-600)] leading-relaxed">{a.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
