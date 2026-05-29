import { CtaButtons } from './cta-buttons'
import { deriveAuxColors, type HeroProps } from './types'

export default function HeroV3ParticleDrift(p: HeroProps) {
  const { aux1, aux2 } = deriveAuxColors(p.primaryColor, p.accentColor)
  const particles = Array.from({ length: 60 }, (_, i) => i)
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `linear-gradient(160deg, ${p.primaryColor}, #1a1410 60%, ${p.accentColor})` }}>
      <style>{`
        @keyframes drift-up {
          0% { transform: translateY(120vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(60px); opacity: 0; }
        }
        @keyframes drift-side {
          0% { transform: translateX(-10vw); }
          100% { transform: translateX(110vw); }
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
          animation: drift-up 14s linear infinite;
        }
        @keyframes fade-up-3 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v3-anim { animation: fade-up-3 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .particle, .v3-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => {
          const size = 3 + (i % 4) * 2
          const left = (i * 13) % 100
          const delay = (i * 0.23) % 14
          const duration = 10 + (i % 7) * 2
          const colors = [p.primaryColor, p.accentColor, '#ffffff', aux1, aux2]
          const color = colors[i % colors.length]
          return (
            <span
              key={i}
              className="particle"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                background: color,
                opacity: 0.5 + (i % 5) * 0.1,
                animationDelay: `-${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: `0 0 ${size * 3}px ${color}`,
              }}
            />
          )
        })}
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="v3-anim font-display text-5xl md:text-7xl font-black mb-5">{p.businessName}</h1>
        <p className="v3-anim text-xl text-white/90 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.15s' }}>{p.tagline}</p>
        <div className="v3-anim" style={{ animationDelay: '.3s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
