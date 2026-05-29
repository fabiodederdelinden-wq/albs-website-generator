import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV9AuroraCycle(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white">
      <style>{`
        @keyframes aurora-cycle {
          0% { background: linear-gradient(135deg, var(--c1) 0%, var(--c2) 50%, var(--c3) 100%); }
          25% { background: linear-gradient(135deg, var(--c2) 0%, var(--c3) 50%, var(--c4) 100%); }
          50% { background: linear-gradient(135deg, var(--c3) 0%, var(--c4) 50%, var(--c1) 100%); }
          75% { background: linear-gradient(135deg, var(--c4) 0%, var(--c1) 50%, var(--c2) 100%); }
          100% { background: linear-gradient(135deg, var(--c1) 0%, var(--c2) 50%, var(--c3) 100%); }
        }
        @keyframes shimmer-band {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .aurora-bg {
          position: absolute; inset: 0;
          animation: aurora-cycle 24s ease-in-out infinite;
        }
        .shimmer-band {
          position: absolute; top: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
          animation: shimmer-band 10s linear infinite;
        }
        @keyframes fade-up-9 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v9-anim { animation: fade-up-9 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aurora-bg, .shimmer-band, .v9-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div
        className="aurora-bg"
        style={{
          background: `linear-gradient(135deg, ${p.primaryColor} 0%, ${p.accentColor} 50%, ${aux1} 100%)`,
          ['--c1' as string]: p.primaryColor,
          ['--c2' as string]: p.accentColor,
          ['--c3' as string]: aux1,
          ['--c4' as string]: aux2,
        } as React.CSSProperties}
      />
      <div className="shimmer-band" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v9-anim font-display text-5xl md:text-7xl font-black mb-5 drop-shadow-lg">{p.businessName}</h1>
        <p className="v9-anim text-xl text-white/95 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v9-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="inverted" />
        </div>
      </div>
    </section>
  )
}
