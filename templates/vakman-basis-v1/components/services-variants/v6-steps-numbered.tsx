import { ServiceIcon, serviceDescriptions, mixColor, type ServicesProps } from './types'

export default function ServicesV6StepsNumbered(p: ServicesProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 text-zinc-900 relative overflow-hidden">
      <style>{`
        @keyframes v6-step { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        .v6-step { animation: v6-step .55s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .v6-step { animation: none !important; }
        }
      `}</style>
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
        style={{ background: p.primaryColor, filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto relative">
        <div className="mb-14 md:mb-20">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · ONS PROCES
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight max-w-2xl">
            Vakwerk in stappen
          </h2>
          <p className="mt-4 text-zinc-600 max-w-xl">
            Van eerste contact tot oplevering, dit is wat {p.businessName ?? 'wij'} doet.
          </p>
        </div>
        <ol className="space-y-8 md:space-y-12 relative">
          <div
            className="hidden md:block absolute left-[60px] top-4 bottom-4 w-px"
            style={{
              background: `linear-gradient(180deg, ${p.primaryColor} 0%, ${mixColor(p.primaryColor, 25)} 100%)`,
            }}
            aria-hidden="true"
          />
          {p.services.slice(0, 6).map((service, i) => (
            <li
              key={service}
              className="v6-step flex flex-col md:flex-row gap-5 md:gap-8 items-start relative"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div
                className="font-display font-black text-6xl md:text-7xl leading-none shrink-0 w-[120px] tabular-nums"
                style={{ color: p.primaryColor }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: mixColor(p.primaryColor, 12), color: p.primaryColor }}
                  >
                    <ServiceIcon service={service} className="w-5 h-5" />
                  </span>
                  <h3 className="font-display font-bold text-xl md:text-2xl">{service}</h3>
                </div>
                <p className="text-zinc-700 text-base md:text-lg leading-relaxed max-w-2xl">
                  {serviceDescriptions(service)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
