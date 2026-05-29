import { CtaButtons } from './cta-buttons'
import { iconsForNiche, type HeroProps } from './types'

export default function HeroV8IsoFloating(p: HeroProps) {
  const icons = iconsForNiche(p.niche)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-zinc-900" style={{ background: `linear-gradient(135deg, ${p.accentColor}22, ${p.primaryColor}22, ${p.accentColor}22)` }}>
      <style>{`
        @keyframes float-iso-a { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(20px,-40px) rotate(15deg); } }
        @keyframes float-iso-b { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-30px,30px) rotate(-12deg); } }
        @keyframes float-iso-c { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(35px,20px) rotate(8deg); } }
        @keyframes float-iso-d { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-25px,-35px) rotate(-18deg); } }
        @keyframes bg-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .iso { position: absolute; font-size: 3rem; opacity: .4; filter: drop-shadow(0 8px 16px rgba(0,0,0,.15)); }
        .iso-1 { animation: float-iso-a 9s ease-in-out infinite; }
        .iso-2 { animation: float-iso-b 11s ease-in-out infinite; }
        .iso-3 { animation: float-iso-c 13s ease-in-out infinite; }
        .iso-4 { animation: float-iso-d 8s ease-in-out infinite; }
        section { background-size: 200% 200%; animation: bg-shift 18s ease-in-out infinite; }
        @keyframes fade-up-8 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v8-anim { animation: fade-up-8 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .iso, .v8-anim, section { animation: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        {icons.map((icon, i) => {
          const cls = `iso iso-${(i % 4) + 1}`
          const positions: { top: string; left: string }[] = [
            { top: '10%', left: '8%' },
            { top: '15%', left: '85%' },
            { top: '35%', left: '20%' },
            { top: '70%', left: '12%' },
            { top: '60%', left: '80%' },
            { top: '85%', left: '50%' },
            { top: '25%', left: '60%' },
            { top: '50%', left: '90%' },
          ]
          const pos = positions[i]
          return (
            <span key={i} className={cls} style={{ top: pos.top, left: pos.left, animationDelay: `-${i * 1.3}s` }}>
              {icon}
            </span>
          )
        })}
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v8-anim font-display text-5xl md:text-7xl font-black mb-5" style={{ color: p.primaryColor }}>{p.businessName}</h1>
        <p className="v8-anim text-xl text-zinc-700 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v8-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="solid" />
        </div>
      </div>
    </section>
  )
}
