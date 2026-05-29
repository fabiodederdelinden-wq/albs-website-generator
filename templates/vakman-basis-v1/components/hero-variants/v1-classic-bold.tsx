import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV1AuroraFlow(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `linear-gradient(180deg, #1a1410 0%, #2a1f18 100%)` }}>
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(-15%, -10%) scale(1); }
          50% { transform: translate(20%, 15%) scale(1.3); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(20%, 0%) scale(1.2); }
          50% { transform: translate(-25%, 25%) scale(.9); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(-10%, 20%) scale(1.1); }
          50% { transform: translate(30%, -20%) scale(1.4); }
        }
        @keyframes aurora-4 {
          0%, 100% { transform: translate(40%, 30%) scale(.8); }
          50% { transform: translate(-30%, -20%) scale(1.3); }
        }
        .aurora-1 { animation: aurora-1 18s ease-in-out infinite; }
        .aurora-2 { animation: aurora-2 22s ease-in-out infinite; }
        .aurora-3 { animation: aurora-3 26s ease-in-out infinite; }
        .aurora-4 { animation: aurora-4 30s ease-in-out infinite; }
        @keyframes fade-up-1 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v1-anim { animation: fade-up-1 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .aurora-1, .aurora-2, .aurora-3, .aurora-4, .v1-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-1 absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-60" style={{ background: p.primaryColor, filter: 'blur(120px)' }} />
        <div className="aurora-2 absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: p.accentColor, filter: 'blur(120px)' }} />
        <div className="aurora-3 absolute bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full opacity-45" style={{ background: aux1, filter: 'blur(140px)' }} />
        <div className="aurora-4 absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full opacity-40" style={{ background: aux2, filter: 'blur(130px)' }} />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v1-anim font-display text-5xl md:text-7xl font-black mb-5 drop-shadow-lg">{p.businessName}</h1>
        <p className="v1-anim text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v1-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
