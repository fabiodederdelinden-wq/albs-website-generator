import { BadgeIcon, formatKvk, type BadgeIconProps, type TrustProps } from './types'

export default function TrustV3CertificateGrid(p: TrustProps) {
  const metaLine = [formatKvk(p.kvk), `${p.reviewRating.toFixed(1)}★ (${p.reviewCount} reviews)`]
    .filter(Boolean)
    .join(' · ')

  const certs: Array<{ kind: BadgeIconProps['kind']; label: string; sub: string }> = [
    { kind: 'vca', label: 'VCA', sub: 'Veiligheids-checklist' },
    { kind: 'kiwa', label: 'KIWA', sub: 'Erkend installateur' },
    { kind: 'isso', label: 'ISSO', sub: 'Vakkennis-norm' },
    { kind: 'anwb', label: 'ANWB', sub: 'Erkend vakman' },
    { kind: 'bovag', label: 'Vakman+', sub: 'Branche-keurmerk' },
    { kind: 'sbr', label: 'SBR', sub: 'Bouwtechnische norm' },
  ]

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 bg-white">
      <style>{`
        @keyframes trust-v3-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .trust-v3-card { animation: trust-v3-in .6s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) { .trust-v3-card { animation: none !important; opacity: 1 !important; transform: none !important; } }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
            · KEURMERKEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Erkend en gecertificeerd
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-500)] font-mono tracking-wider">
            {metaLine}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {certs.map((c, i) => (
            <div
              key={c.kind}
              className="trust-v3-card flex flex-col items-center text-center p-6 rounded-xl border border-[var(--color-ink-200)] bg-[var(--color-ink-100)] hover:bg-white hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <BadgeIcon kind={c.kind} color={p.primaryColor} size={64} />
              <p className="mt-4 font-display font-black text-base tracking-tight">{c.label}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-500)] font-mono tracking-wider">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
