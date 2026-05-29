import { ServiceIcon, serviceDescriptions, type ServicesProps } from './types'

export default function ServicesV4CardsHover(p: ServicesProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-950 text-white">
      <style>{`
        @keyframes v4-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        .v4-card { animation: v4-in .5s ease-out both; }
        .v4-card .v4-overlay { transition: opacity .4s ease, transform .4s ease; }
        .v4-card .v4-bg { transition: transform .8s ease; }
        .v4-card:hover .v4-bg { transform: scale(1.08); }
        .v4-card:hover .v4-overlay { opacity: 1; transform: translateY(0); }
        .v4-card .v4-title { transition: transform .4s ease; }
        .v4-card:hover .v4-title { transform: translateY(-8px); }
        @media (prefers-reduced-motion: reduce) {
          .v4-card, .v4-bg, .v4-overlay, .v4-title { animation: none !important; transition: none !important; transform: none !important; }
          .v4-overlay { opacity: 1; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · DIENSTEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Beweeg over een card voor meer info
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {p.services.slice(0, 6).map((service, i) => {
            const gradient = `linear-gradient(135deg, ${p.primaryColor} 0%, ${p.accentColor ?? '#2C2C2C'} 100%)`
            return (
              <article
                key={service}
                className="v4-card relative h-72 rounded-2xl overflow-hidden cursor-pointer group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="v4-bg absolute inset-0"
                  style={{
                    background: gradient,
                    opacity: 0.85,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,.35), transparent 60%)',
                  }}
                />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="mb-3 w-12 h-12 rounded-lg flex items-center justify-center bg-white/15 backdrop-blur-sm text-white">
                    <ServiceIcon service={service} className="w-6 h-6" />
                  </div>
                  <h3 className="v4-title font-display font-black text-2xl md:text-3xl mb-2 drop-shadow">
                    {service}
                  </h3>
                  <div className="v4-overlay opacity-0 transform translate-y-2">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {serviceDescriptions(service)}
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-white border-b border-white/60">
                      Vraag offerte aan →
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
