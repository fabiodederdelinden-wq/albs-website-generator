import { BadgeIcon, formatKvk, type BadgeIconProps, type TrustProps } from './types'

export default function TrustV8BadgesGridLg(p: TrustProps) {
  const certs: Array<{ kind: BadgeIconProps['kind']; label: string; tagline: string }> = [
    { kind: 'vca', label: 'VCA*', tagline: 'Veilig werken op locatie' },
    { kind: 'kiwa', label: 'KIWA', tagline: 'Erkend voor installaties' },
    { kind: 'isso', label: 'ISSO', tagline: 'Kennisinstituut-norm' },
    { kind: 'anwb', label: 'ANWB', tagline: 'Erkend vakman' },
    { kind: 'bovag', label: 'Vakman+', tagline: 'Branche-keurmerk' },
    { kind: 'sbr', label: 'SBR', tagline: 'Bouw-richtlijn' },
    { kind: 'erkend', label: 'Erkend', tagline: 'Door brancheraad' },
    { kind: 'garantie', label: 'Garantie', tagline: 'Onze beloften, vastgelegd' },
  ]

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[var(--color-ink-100)]">
      <style>{`
        @keyframes trust-v8-in { from { opacity: 0; transform: translateY(20px) scale(.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .trust-v8-tile { animation: trust-v8-in .7s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .trust-v8-tile { animation: none !important; opacity: 1 !important; transform: none !important; } }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
            · ERKENNINGEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Gecertificeerd op acht fronten
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--color-ink-500)] max-w-2xl mx-auto">
            Niet voor de show. Elke erkenning betekent dat we ergens aantoonbaar voldoen aan de norm.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {certs.map((c, i) => (
            <div
              key={`${c.kind}-${i}`}
              className="trust-v8-tile group flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white border border-[var(--color-ink-200)] hover:border-[var(--color-ink-400)] hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <BadgeIcon kind={c.kind} color={p.primaryColor} size={80} />
              </div>
              <p className="mt-5 font-display font-black text-lg md:text-xl tracking-tight">{c.label}</p>
              <p className="mt-1.5 text-xs text-[var(--color-ink-500)] font-mono tracking-wider uppercase">{c.tagline}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs font-mono tracking-wider uppercase text-[var(--color-ink-500)]">
          {formatKvk(p.kvk)} · {p.reviewRating.toFixed(1)}★ op {p.reviewCount} reviews
        </p>
      </div>
    </section>
  )
}
