import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV7LiquidMesh(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-zinc-900" style={{ background: '#f8f5f0' }}>
      <style>{`
        @keyframes liquid-1 {
          0%, 100% { transform: translate(-20%, -10%) scale(1.2) rotate(0deg); }
          33% { transform: translate(30%, 15%) scale(1.6) rotate(120deg); }
          66% { transform: translate(-10%, 30%) scale(1.3) rotate(240deg); }
        }
        @keyframes liquid-2 {
          0%, 100% { transform: translate(30%, 20%) scale(1.4) rotate(0deg); }
          50% { transform: translate(-30%, -20%) scale(1.1) rotate(180deg); }
        }
        @keyframes liquid-3 {
          0%, 100% { transform: translate(-40%, 40%) scale(1.5) rotate(0deg); }
          33% { transform: translate(40%, -30%) scale(1.2) rotate(-150deg); }
          66% { transform: translate(20%, 20%) scale(1.7) rotate(-300deg); }
        }
        .liquid {
          position: absolute; top: 50%; left: 50%;
          width: 700px; height: 700px;
          border-radius: 60% 40% 50% 60% / 50% 60% 40% 50%;
          filter: blur(60px);
          opacity: .55;
          mix-blend-mode: multiply;
        }
        .liquid-1 { animation: liquid-1 24s ease-in-out infinite; }
        .liquid-2 { animation: liquid-2 28s ease-in-out infinite; }
        .liquid-3 { animation: liquid-3 32s ease-in-out infinite; }
        @keyframes fade-up-7 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v7-anim { animation: fade-up-7 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .liquid, .v7-anim { animation: none !important; opacity: .4 !important; transform: translate(-50%, -50%) !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="liquid liquid-1" style={{ background: p.primaryColor }} />
        <div className="liquid liquid-2" style={{ background: p.accentColor }} />
        <div className="liquid liquid-3" style={{ background: aux1 }} />
        <div className="liquid liquid-1" style={{ background: aux2, animationDelay: '-12s' }} />
      </div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v7-anim font-display text-5xl md:text-7xl font-black mb-5" style={{ color: p.primaryColor }}>{p.businessName}</h1>
        <p className="v7-anim text-xl md:text-2xl text-zinc-700 max-w-2xl mx-auto mb-10" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v7-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="solid" />
        </div>
      </div>
    </section>
  )
}
