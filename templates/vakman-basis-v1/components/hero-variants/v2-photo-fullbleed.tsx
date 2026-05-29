import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV2RadialPulse(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `radial-gradient(ellipse at top, ${p.primaryColor}30 0%, #14100c 70%)` }}>
      <style>{`
        @keyframes ring-expand {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
        }
        @keyframes radial-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .4; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: .6; }
        }
        .ring {
          position: absolute; top: 50%; left: 50%;
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 2px solid var(--ring-color);
          animation: ring-expand 6s ease-out infinite;
        }
        .ring-1 { animation-delay: 0s; }
        .ring-2 { animation-delay: 1.5s; }
        .ring-3 { animation-delay: 3s; }
        .ring-4 { animation-delay: 4.5s; }
        .pulse-core {
          position: absolute; top: 50%; left: 50%;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(80px);
          animation: radial-pulse 6s ease-in-out infinite;
        }
        @keyframes fade-up-2 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v2-anim { animation: fade-up-2 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .ring, .pulse-core, .v2-anim { animation: none !important; opacity: .3 !important; transform: translate(-50%, -50%) !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="pulse-core" style={{ background: p.primaryColor }} />
        <span className="ring ring-1" style={{ ['--ring-color' as string]: p.accentColor } as React.CSSProperties} />
        <span className="ring ring-2" style={{ ['--ring-color' as string]: aux1 } as React.CSSProperties} />
        <span className="ring ring-3" style={{ ['--ring-color' as string]: p.primaryColor } as React.CSSProperties} />
        <span className="ring ring-4" style={{ ['--ring-color' as string]: aux2 } as React.CSSProperties} />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="v2-anim text-xs uppercase tracking-[0.3em] text-white/60 mb-4">Vakman in jouw regio</p>
        <h1 className="v2-anim font-display text-5xl md:text-7xl font-black mb-5" style={{ animationDelay: '.1s' }}>{p.businessName}</h1>
        <p className="v2-anim text-xl text-white/90 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.25s' }}>{p.tagline}</p>
        <div className="v2-anim" style={{ animationDelay: '.4s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
