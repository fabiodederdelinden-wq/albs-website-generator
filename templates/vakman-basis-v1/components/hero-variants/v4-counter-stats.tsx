import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV4WaveSea(p: HeroProps) {
  const { aux1 } = deriveAuxColors(p.primaryColor, p.accentColor)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `linear-gradient(180deg, #1a1410 0%, #2a1f18 100%)` }}>
      <style>{`
        @keyframes wave-slide-1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
        }
        @keyframes wave-slide-2 {
          0%, 100% { transform: translateX(-15%); }
          50% { transform: translateX(20%); }
        }
        @keyframes wave-slide-3 {
          0%, 100% { transform: translateX(10%); }
          50% { transform: translateX(-30%); }
        }
        @keyframes wave-rise {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .wave-1 { animation: wave-slide-1 18s ease-in-out infinite, wave-rise 9s ease-in-out infinite; }
        .wave-2 { animation: wave-slide-2 22s ease-in-out infinite, wave-rise 11s ease-in-out infinite; }
        .wave-3 { animation: wave-slide-3 26s ease-in-out infinite, wave-rise 13s ease-in-out infinite; }
        @keyframes fade-up-4 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v4-anim { animation: fade-up-4 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .wave-1, .wave-2, .wave-3, .v4-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <svg className="absolute inset-x-0 bottom-0 w-[200%] h-[60%] pointer-events-none wave-1" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,200 Q150,100 300,200 T600,200 T900,200 T1200,200 V400 H0 Z" fill={p.primaryColor} opacity="0.5" />
      </svg>
      <svg className="absolute inset-x-0 bottom-0 w-[200%] h-[50%] pointer-events-none wave-2" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,250 Q200,150 400,250 T800,250 T1200,250 V400 H0 Z" fill={p.accentColor} opacity="0.4" />
      </svg>
      <svg className="absolute inset-x-0 bottom-0 w-[200%] h-[40%] pointer-events-none wave-3" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,300 Q300,200 600,300 T1200,300 V400 H0 Z" fill={aux1} opacity="0.3" />
      </svg>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v4-anim font-display text-5xl md:text-7xl font-black mb-5">{p.businessName}</h1>
        <p className="v4-anim text-xl text-white/90 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v4-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
