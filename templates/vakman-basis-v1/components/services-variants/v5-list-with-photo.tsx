import { ServiceIcon, serviceDescriptions, placeholderPhoto, mixColor, type ServicesProps } from './types'

export default function ServicesV5ListWithPhoto(p: ServicesProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v5-slide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v5-row { animation: v5-slide .65s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v5-row { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · DIENSTEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Elke klus in beeld
          </h2>
          <p className="mt-4 text-zinc-600">
            Een korte uitleg per dienst zodat u weet wat u kunt verwachten van {p.businessName ?? 'ons team'}.
          </p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {p.services.slice(0, 6).map((service, i) => {
            const reverse = i % 2 === 1
            const photo = placeholderPhoto(
              640,
              480,
              p.primaryColor.replace('#', ''),
              service
            )
            return (
              <div
                key={service}
                className="v5-row grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`${reverse ? 'md:order-2' : ''}`}>
                  <div
                    className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg relative"
                    style={{ background: mixColor(p.primaryColor, 18) }}
                  >
                    <img
                      src={photo}
                      alt={service}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                      style={{ background: p.primaryColor, color: '#fff' }}
                    >
                      <ServiceIcon service={service} className="w-10 h-10" />
                    </div>
                  </div>
                </div>
                <div className={`${reverse ? 'md:order-1' : ''}`}>
                  <p
                    className="text-sm font-mono tracking-[0.2em] uppercase mb-2"
                    style={{ color: p.primaryColor }}
                  >
                    {`Dienst ${String(i + 1).padStart(2, '0')}`}
                  </p>
                  <h3 className="font-display font-black text-2xl md:text-4xl mb-4 leading-tight">
                    {service}
                  </h3>
                  <p className="text-zinc-700 text-base md:text-lg leading-relaxed mb-5">
                    {serviceDescriptions(service)}
                  </p>
                  <ul className="space-y-2 text-zinc-700">
                    <li className="flex items-start gap-2">
                      <span style={{ color: p.primaryColor }} className="mt-1">✓</span>
                      <span>Geen voorrijkosten binnen Utrecht</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: p.primaryColor }} className="mt-1">✓</span>
                      <span>Vaste prijs vooraf bevestigd</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: p.primaryColor }} className="mt-1">✓</span>
                      <span>Garantie op materiaal en arbeid</span>
                    </li>
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
