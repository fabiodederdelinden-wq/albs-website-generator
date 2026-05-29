import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV10DiagonalStreaks(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `linear-gradient(135deg, #1c1410, #2a1f18)` }}>
      <style>{`
        @keyframes streak-slide {
          0% { transform: translate(-30%, -30%) rotate(-25deg); }
          100% { transform: translate(30%, 30%) rotate(-25deg); }
        }
        .streak {
          position: absolute; inset: -30% -10% -10% -30%;
          background: repeating-linear-gradient(
            -25deg,
            transparent 0px,
            transparent 80px,
            var(--c) 80px,
            var(--c) 82px
          );
          opacity: .3;
          mix-blend-mode: screen;
        }
        .streak-1 { animation: streak-slide 18s linear infinite; }
        .streak-2 { animation: streak-slide 24s linear infinite reverse; }
        .streak-3 { animation: streak-slide 30s linear infinite; }
        @keyframes ribbon {
          0%, 100% { transform: translateX(-30%) skewX(-15deg); opacity: .4; }
          50% { transform: translateX(30%) skewX(-15deg); opacity: .7; }
        }
        .ribbon {
          position: absolute; top: 30%; left: -10%;
          width: 120%; height: 80px;
          background: linear-gradient(90deg, transparent, var(--c), transparent);
          filter: blur(20px);
          animation: ribbon 14s ease-in-out infinite;
        }
        .ribbon-1 { animation-delay: 0s; top: 25%; }
        .ribbon-2 { animation-delay: -7s; top: 55%; }
        .ribbon-3 { animation-delay: -3.5s; top: 75%; }
        @keyframes fade-up-10 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v10-anim { animation: fade-up-10 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .streak, .ribbon, .v10-anim { animation: none !important; transform: none !important; opacity: .3 !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="streak streak-1" style={{ ['--c' as string]: p.primaryColor } as React.CSSProperties} />
        <div className="streak streak-2" style={{ ['--c' as string]: p.accentColor } as React.CSSProperties} />
        <div className="streak streak-3" style={{ ['--c' as string]: aux1 } as React.CSSProperties} />
        <div className="ribbon ribbon-1" style={{ ['--c' as string]: p.primaryColor } as React.CSSProperties} />
        <div className="ribbon ribbon-2" style={{ ['--c' as string]: p.accentColor } as React.CSSProperties} />
        <div className="ribbon ribbon-3" style={{ ['--c' as string]: aux2 } as React.CSSProperties} />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v10-anim font-display text-5xl md:text-7xl font-black mb-5 drop-shadow-lg">{p.businessName}</h1>
        <p className="v10-anim text-xl text-white/90 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v10-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
