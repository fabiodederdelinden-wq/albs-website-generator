import { ServiceIcon, serviceDescriptions, placeholderPhoto, mixColor, type ServicesProps } from './types'

interface TileSpec {
  spanRow: number
  spanCol: number
  withPhoto: boolean
  variant: 'photo' | 'text' | 'wide' | 'tall' | 'accent'
}

const LAYOUT: TileSpec[] = [
  { spanRow: 2, spanCol: 1, withPhoto: true, variant: 'tall' },
  { spanRow: 1, spanCol: 2, withPhoto: false, variant: 'wide' },
  { spanRow: 1, spanCol: 1, withPhoto: false, variant: 'text' },
  { spanRow: 1, spanCol: 1, withPhoto: true, variant: 'photo' },
  { spanRow: 1, spanCol: 2, withPhoto: true, variant: 'wide' },
  { spanRow: 1, spanCol: 1, withPhoto: false, variant: 'accent' },
]

export default function ServicesV10Masonry(p: ServicesProps) {
  const list = p.services.slice(0, 6)
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v10-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        .v10-tile { animation: v10-in .55s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease; }
        .v10-tile:hover { transform: translateY(-3px); box-shadow: 0 18px 40px -18px rgba(0,0,0,.18); }
        @media (prefers-reduced-motion: reduce) {
          .v10-tile { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
              · MAGAZINE
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight max-w-xl">
              Onze diensten als magazine
            </h2>
          </div>
          <p className="text-zinc-600 max-w-sm">
            Een onregelmatig raster waarin elke dienst zijn eigen ruimte krijgt.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[200px] gap-4 md:gap-5">
          {list.map((service, i) => {
            const spec = LAYOUT[i % LAYOUT.length] ?? LAYOUT[0]
            const colSpan = spec.spanCol === 2 ? 'md:col-span-2' : ''
            const rowSpan = spec.spanRow === 2 ? 'row-span-2' : ''
            const photo = placeholderPhoto(640, 480, p.primaryColor.replace('#', ''), service)
            const baseClasses = `v10-tile relative rounded-2xl overflow-hidden flex flex-col ${colSpan} ${rowSpan}`

            if (spec.variant === 'photo' || spec.variant === 'tall') {
              return (
                <article
                  key={service}
                  className={baseClasses}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <img
                    src={photo}
                    alt={service}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,.65) 100%)`,
                    }}
                  />
                  <div className="relative mt-auto p-5 text-white">
                    <ServiceIcon service={service} className="w-7 h-7 mb-2 opacity-90" />
                    <h3 className="font-display font-black text-xl md:text-2xl leading-tight">
                      {service}
                    </h3>
                  </div>
                </article>
              )
            }

            if (spec.variant === 'wide' && spec.withPhoto) {
              return (
                <article
                  key={service}
                  className={`${baseClasses} flex-row`}
                  style={{ animationDelay: `${i * 60}ms`, background: mixColor(p.primaryColor, 8) }}
                >
                  <div className="w-1/2 relative">
                    <img
                      src={photo}
                      alt={service}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-5 flex flex-col justify-center">
                    <ServiceIcon service={service} className="w-6 h-6 mb-2" style={{ color: p.primaryColor }} />
                    <h3 className="font-display font-bold text-lg leading-tight mb-1">{service}</h3>
                    <p className="text-zinc-700 text-xs leading-snug line-clamp-3">
                      {serviceDescriptions(service)}
                    </p>
                  </div>
                </article>
              )
            }

            if (spec.variant === 'accent') {
              return (
                <article
                  key={service}
                  className={`${baseClasses} p-5 flex flex-col justify-between text-white`}
                  style={{
                    animationDelay: `${i * 60}ms`,
                    background: `linear-gradient(135deg, ${p.primaryColor}, ${p.accentColor ?? '#2C2C2C'})`,
                  }}
                >
                  <ServiceIcon service={service} className="w-7 h-7 opacity-80" />
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight mb-1">{service}</h3>
                    <p className="text-white/90 text-xs leading-snug">
                      {serviceDescriptions(service)}
                    </p>
                  </div>
                </article>
              )
            }

            return (
              <article
                key={service}
                className={`${baseClasses} p-5 border border-zinc-200 bg-zinc-50 flex flex-col justify-between`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: mixColor(p.primaryColor, 14), color: p.primaryColor }}
                >
                  <ServiceIcon service={service} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight mb-1">{service}</h3>
                  <p className="text-zinc-600 text-xs leading-snug">
                    {serviceDescriptions(service)}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
