import { CtaButtons } from './cta-buttons'
import type { HeroProps } from './types'

export default function HeroV5GridMorph(p: HeroProps) {
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden text-white" style={{ background: `linear-gradient(180deg, #1a1410 0%, #251a14 100%)` }}>
      <style>{`
        @keyframes grid-tilt {
          0%, 100% { transform: perspective(600px) rotateX(50deg) translateY(0) scale(1); }
          50% { transform: perspective(600px) rotateX(55deg) translateY(-20px) scale(1.05); }
        }
        @keyframes grid-shift {
          from { background-position: 0 0; }
          to { background-position: 80px 80px; }
        }
        @keyframes top-glow {
          0%, 100% { opacity: .4; }
          50% { opacity: .7; }
        }
        .grid-3d {
          position: absolute; inset: -10% 0 -50%;
          background-image:
            linear-gradient(var(--grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: grid-tilt 18s ease-in-out infinite, grid-shift 4s linear infinite;
          mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
        }
        .top-glow {
          position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
          width: 80%; height: 80%; border-radius: 50%;
          background: radial-gradient(circle, var(--glow) 0%, transparent 60%);
          filter: blur(60px);
          animation: top-glow 8s ease-in-out infinite;
        }
        @keyframes fade-up-5 { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v5-anim { animation: fade-up-5 .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .grid-3d, .top-glow, .v5-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div
        className="grid-3d"
        style={{
          ['--grid' as string]: `${p.accentColor}55`,
        } as React.CSSProperties}
      />
      <div className="top-glow" style={{ ['--glow' as string]: p.primaryColor } as React.CSSProperties} />
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="v5-anim text-xs uppercase tracking-[0.4em] text-white/60 mb-4">Industrieel · Vakkundig</p>
        <h1 className="v5-anim font-display text-5xl md:text-7xl font-black mb-5" style={{ animationDelay: '.1s' }}>{p.businessName}</h1>
        <p className="v5-anim text-xl text-white/90 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '.25s' }}>{p.tagline}</p>
        <div className="v5-anim" style={{ animationDelay: '.4s' }}>
          <CtaButtons phone={p.phone} whatsapp={p.whatsapp} primaryColor={p.primaryColor} accentColor={p.accentColor} variant="glass" />
        </div>
      </div>
    </section>
  )
}
