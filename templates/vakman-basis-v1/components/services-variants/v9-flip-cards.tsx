import { ServiceIcon, serviceDescriptions, mixColor, type ServicesProps } from './types'

export default function ServicesV9FlipCards(p: ServicesProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v9-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v9-card { animation: v9-rise .55s ease-out both; perspective: 1200px; }
        .v9-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .7s cubic-bezier(.7,0,.3,1); }
        .v9-card:hover .v9-inner, .v9-card:focus-within .v9-inner { transform: rotateY(180deg); }
        .v9-face { position: absolute; inset: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 1rem; overflow: hidden; }
        .v9-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .v9-card, .v9-inner { animation: none !important; transition: none !important; }
          .v9-card:hover .v9-inner, .v9-card:focus-within .v9-inner { transform: none; }
          .v9-back { position: relative; transform: none; margin-top: .75rem; }
          .v9-front { position: relative; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · DIENSTEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Beweeg over een kaart
          </h2>
          <p className="mt-4 text-zinc-600">
            Vooraan staat de dienst, achterop de toelichting.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.services.slice(0, 6).map((service, i) => (
            <button
              key={service}
              type="button"
              tabIndex={0}
              className="v9-card relative h-64 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl"
              style={{ animationDelay: `${i * 70}ms` }}
              aria-label={`${service} info`}
            >
              <div className="v9-inner">
                <div
                  className="v9-face v9-front flex flex-col items-center justify-center p-6 border-2 text-center"
                  style={{
                    background: mixColor(p.primaryColor, 6),
                    borderColor: p.primaryColor,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: p.primaryColor, color: '#fff' }}
                  >
                    <ServiceIcon service={service} className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-xl md:text-2xl">{service}</h3>
                  <span className="mt-3 text-xs font-mono tracking-wider uppercase opacity-60">
                    hover voor info
                  </span>
                </div>
                <div
                  className="v9-face v9-back flex flex-col items-start justify-between p-6 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${p.primaryColor} 0%, ${p.accentColor ?? '#2C2C2C'} 100%)`,
                  }}
                >
                  <ServiceIcon service={service} className="w-8 h-8 opacity-70" />
                  <div className="text-left">
                    <h3 className="font-display font-bold text-lg mb-2">{service}</h3>
                    <p className="text-sm leading-relaxed text-white/95">
                      {serviceDescriptions(service)}
                    </p>
                  </div>
                  <span className="text-xs font-semibold border-b border-white/70 self-start">
                    Meer info →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
