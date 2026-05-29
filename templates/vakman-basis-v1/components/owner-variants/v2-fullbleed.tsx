import { PhotoFallback, cityLabel, isPhotoMissing, yearsLabel, type OwnerProps } from './types'

export default function OwnerV2Fullbleed(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const missing = isPhotoMissing(p.photoUrl)
  return (
    <section className="relative w-full overflow-hidden text-white">
      <style>{`
        @keyframes owner-v2-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        @keyframes owner-v2-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v2-bg { animation: owner-v2-zoom 1.4s cubic-bezier(.16,1,.3,1) both; }
        .owner-v2-panel { animation: owner-v2-rise .8s cubic-bezier(.16,1,.3,1) both; animation-delay: .2s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v2-bg, .owner-v2-panel { animation: none !important; }
        }
      `}</style>
      <div className="relative w-full" style={{ height: 'clamp(420px, 60vh, 640px)' }}>
        {missing ? (
          <div
            className="owner-v2-bg absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${p.primaryColor} 0%, ${p.accentColor ?? '#2C2C2C'} 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <PhotoFallback
                ownerName={p.ownerName}
                primaryColor={p.primaryColor}
                accentColor={p.accentColor}
                shape="circle"
                size={220}
                fontScale={0.36}
                style={{ opacity: 0.35 }}
              />
            </div>
          </div>
        ) : (
          <img
            src={p.photoUrl}
            alt={p.ownerName}
            loading="lazy"
            className="owner-v2-bg absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,.0) 0%, rgba(0,0,0,.15) 35%, rgba(0,0,0,.7) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-10 md:pb-14">
          <div className="owner-v2-panel max-w-4xl mx-auto md:mx-0">
            <div
              className="backdrop-blur-md rounded-2xl px-6 md:px-9 py-7 md:py-8 border border-white/15"
              style={{ background: 'rgba(20,20,22,0.55)' }}
            >
              <p
                className="text-[11px] font-mono tracking-[0.28em] uppercase mb-3"
                style={{ color: p.primaryColor }}
              >
                · DIT BEN IK
              </p>
              <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
                {p.ownerName}
              </h2>
              <p className="mt-2 text-sm md:text-base font-mono tracking-[0.18em] uppercase text-white/70">
                Eigenaar {p.businessName} &middot; {city}
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-white/90 max-w-2xl">
                {years} jaar in het vak. Geen verkooppraat, geen verrassingen achteraf. Wat ik zeg, dat doe ik. Daarom komen mensen in {city} terug, en sturen ze hun buren door.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
