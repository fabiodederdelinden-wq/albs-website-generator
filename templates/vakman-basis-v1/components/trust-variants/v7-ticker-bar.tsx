import { formatKvk, type TrustProps } from './types'

export default function TrustV7TickerBar(p: TrustProps) {
  const years = p.yearsActive ?? 18
  const warranty = p.warrantyYears ?? 5
  const clients = p.clientsCount ?? 1200

  const items: string[] = [
    `★ ${p.reviewRating.toFixed(1)} op Google`,
    formatKvk(p.kvk),
    `${years} jaar actief`,
    `${warranty} jaar garantie`,
    'ANWB-erkend vakman',
    `${clients}+ klussen voltooid`,
    `${p.reviewCount} 5-sterren reviews`,
    'Vaste prijs vooraf',
    'Binnen 2u ter plekke',
  ].filter(Boolean)

  // Dubbel renderen voor naadloze marquee-loop
  const doubled = [...items, ...items]

  return (
    <section
      className="relative py-5 md:py-6 overflow-hidden border-y"
      style={{ background: p.accentColor ?? '#2C2C2C', borderColor: 'rgba(255,255,255,0.08)' }}
      aria-label="Vertrouwens-statements"
    >
      <style>{`
        @keyframes trust-v7-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .trust-v7-track {
          display: inline-flex;
          gap: 3rem;
          padding-right: 3rem;
          animation: trust-v7-marquee 38s linear infinite;
          white-space: nowrap;
        }
        .trust-v7-wrap:hover .trust-v7-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v7-track { animation: none !important; transform: translateX(0) !important; flex-wrap: wrap; white-space: normal; }
        }
        .trust-v7-fade-l, .trust-v7-fade-r {
          position: absolute; top: 0; bottom: 0; width: 80px; pointer-events: none; z-index: 2;
        }
      `}</style>
      <div
        aria-hidden
        className="trust-v7-fade-l"
        style={{ left: 0, background: `linear-gradient(90deg, ${p.accentColor ?? '#2C2C2C'} 0%, transparent 100%)` }}
      />
      <div
        aria-hidden
        className="trust-v7-fade-r"
        style={{ right: 0, background: `linear-gradient(270deg, ${p.accentColor ?? '#2C2C2C'} 0%, transparent 100%)` }}
      />
      <div className="trust-v7-wrap relative overflow-hidden">
        <div className="trust-v7-track text-white text-sm md:text-base font-mono tracking-wider">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="opacity-95">{item}</span>
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: p.primaryColor }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
