import { formatKvk, type TrustProps } from './types'

export default function TrustV5GuaranteeBanner(p: TrustProps) {
  const warranty = p.warrantyYears ?? 5
  const metaLine = [formatKvk(p.kvk), `${p.reviewRating.toFixed(1)}★ op ${p.reviewCount} Google reviews`]
    .filter(Boolean)
    .join(' · ')

  const items: Array<{ icon: React.ReactNode; title: string; body: string }> = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M24 4 L42 12 V24 C42 34 33 42 24 44 C15 42 6 34 6 24 V12 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M16 24 L22 30 L33 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: `${warranty} jaar garantie`,
      body: 'Op alle uitgevoerde werkzaamheden.',
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
          <path d="M24 12 V24 L32 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      title: 'Binnen 2 uur',
      body: 'Spoed? We staan binnen 2u ter plekke.',
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="3" />
          <path d="M14 18 H34 M14 24 H30 M14 30 H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      title: 'Vaste prijs vooraf',
      body: 'Geen verrassingen achteraf, eerlijke offerte.',
    },
  ]

  return (
    <section
      className="relative py-16 md:py-20 px-6 md:px-12 overflow-hidden"
      style={{ background: p.primaryColor, color: '#FFFFFF' }}
    >
      <style>{`
        @keyframes trust-v5-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes trust-v5-pulse {
          0%, 100% { transform: scale(1); opacity: .15; }
          50% { transform: scale(1.1); opacity: .25; }
        }
        .trust-v5-anim { animation: trust-v5-fade .7s cubic-bezier(.16,1,.3,1) both; }
        .trust-v5-orb { animation: trust-v5-pulse 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v5-anim, .trust-v5-orb { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div
        aria-hidden
        className="trust-v5-orb absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white pointer-events-none"
      />
      <div
        aria-hidden
        className="trust-v5-orb absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="trust-v5-anim text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-80 mb-3">
            · ONZE BELOFTE
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            {warranty} jaar garantie · vaste prijs · binnen 2u ter plekke
          </h2>
          <p className="mt-3 text-base opacity-90 max-w-2xl mx-auto">
            {metaLine}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="trust-v5-anim flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              style={{ animationDelay: `${i * 120 + 200}ms` }}
            >
              <div className="text-white opacity-95">{item.icon}</div>
              <p className="mt-4 font-display font-black text-xl tracking-tight">{item.title}</p>
              <p className="mt-2 text-sm opacity-90 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
