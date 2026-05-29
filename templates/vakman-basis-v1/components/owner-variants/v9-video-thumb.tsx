import { PhotoFallback, cityLabel, isPhotoMissing, yearsLabel, type OwnerProps } from './types'

export default function OwnerV9VideoThumb(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const missing = isPhotoMissing(p.photoUrl)
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-950 text-white">
      <style>{`
        @keyframes owner-v9-pulse { 0%, 100% { transform: scale(1); opacity: .55; } 50% { transform: scale(1.35); opacity: 0; } }
        @keyframes owner-v9-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v9-thumb { animation: owner-v9-rise .8s cubic-bezier(.16,1,.3,1) both; transition: transform .4s ease; }
        .owner-v9-thumb:hover { transform: scale(1.01); }
        .owner-v9-pulse-1 { animation: owner-v9-pulse 2.4s ease-out infinite; }
        .owner-v9-pulse-2 { animation: owner-v9-pulse 2.4s ease-out infinite; animation-delay: .8s; }
        .owner-v9-text > * { animation: owner-v9-rise .6s cubic-bezier(.16,1,.3,1) both; }
        .owner-v9-text > *:nth-child(2) { animation-delay: .12s; }
        .owner-v9-text > *:nth-child(3) { animation-delay: .24s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v9-thumb, .owner-v9-text > * { animation: none !important; transition: none !important; transform: none !important; }
          .owner-v9-pulse-1, .owner-v9-pulse-2 { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="text-center owner-v9-text mb-10 md:mb-12">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · MAAK KENNIS
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Bekijk wie wij zijn
          </h2>
          <p className="mt-4 text-zinc-300 max-w-2xl mx-auto">
            In 1 minuut vertelt {p.ownerName} u hoe wij werken, waarom we al {years} jaar in {city} actief zijn, en wat u van ons kunt verwachten.
          </p>
        </div>
        <div className="owner-v9-thumb relative mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', maxWidth: '900px' }}>
          {missing ? (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${p.primaryColor} 0%, ${p.accentColor ?? '#2C2C2C'} 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <PhotoFallback
                  ownerName={p.ownerName}
                  primaryColor={p.primaryColor}
                  accentColor={p.accentColor}
                  shape="circle"
                  size={200}
                  fontScale={0.4}
                />
              </div>
            </div>
          ) : (
            <img
              src={p.photoUrl}
              alt={p.ownerName}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,.6) 0%, rgba(0,0,0,.15) 50%, rgba(0,0,0,.35) 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span
                className="owner-v9-pulse-1 absolute inset-0 rounded-full"
                style={{ background: p.primaryColor }}
                aria-hidden="true"
              />
              <span
                className="owner-v9-pulse-2 absolute inset-0 rounded-full"
                style={{ background: p.primaryColor }}
                aria-hidden="true"
              />
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: p.primaryColor }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-9 h-9 md:w-11 md:h-11 ml-1"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-end justify-between">
            <div>
              <p className="font-display font-bold text-lg md:text-xl drop-shadow">{p.ownerName}</p>
              <p className="text-sm md:text-base text-white/80 drop-shadow">
                Eigenaar &middot; {p.businessName}
              </p>
            </div>
            <span className="text-xs md:text-sm font-mono tracking-wider bg-black/50 backdrop-blur px-2.5 py-1 rounded">
              1:02
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
