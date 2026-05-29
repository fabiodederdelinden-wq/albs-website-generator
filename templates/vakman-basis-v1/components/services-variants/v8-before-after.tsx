import { ServiceIcon, serviceDescriptions, placeholderPhoto, mixColor, type ServicesProps } from './types'

export default function ServicesV8BeforeAfter(p: ServicesProps) {
  const list = p.services.slice(0, 6)
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 text-zinc-900">
      <style>{`
        @keyframes v8-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .v8-pair { animation: v8-in .6s ease-out both; }
        .v8-thumb { transition: transform .5s ease; }
        .v8-pair:hover .v8-thumb-after { transform: scale(1.04); }
        @media (prefers-reduced-motion: reduce) {
          .v8-pair, .v8-thumb { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · RESULTAAT
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Voor en na
          </h2>
          <p className="mt-4 text-zinc-600">
            Echte projecten, eerlijke resultaten. Hieronder een greep uit ons recente werk.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {list.map((service, i) => {
            const beforeHex = '6b7280'
            const afterHex = p.primaryColor.replace('#', '')
            return (
              <article
                key={service}
                className="v8-pair bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid grid-cols-2 gap-px bg-zinc-200">
                  <div className="relative overflow-hidden bg-zinc-200 aspect-square">
                    <img
                      src={placeholderPhoto(400, 400, beforeHex, 'Voor')}
                      alt={`${service} voor`}
                      className="v8-thumb w-full h-full object-cover grayscale opacity-90"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono uppercase tracking-wider">
                      Voor
                    </span>
                  </div>
                  <div className="relative overflow-hidden bg-zinc-200 aspect-square">
                    <img
                      src={placeholderPhoto(400, 400, afterHex, 'Na')}
                      alt={`${service} na`}
                      className="v8-thumb v8-thumb-after w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded text-white text-[10px] font-mono uppercase tracking-wider"
                      style={{ background: p.primaryColor }}
                    >
                      Na
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: mixColor(p.primaryColor, 12), color: p.primaryColor }}
                    >
                      <ServiceIcon service={service} className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-bold text-lg">{service}</h3>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
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
