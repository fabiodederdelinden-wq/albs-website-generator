import { ServiceIcon, serviceDescriptions, mixColor, type ServicesProps } from './types'

export default function ServicesV1IconGrid(p: ServicesProps) {
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v1-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .v1-card { animation: v1-fade-up .6s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
        .v1-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px -18px rgba(0,0,0,.15); }
        @media (prefers-reduced-motion: reduce) {
          .v1-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · WAT WIJ DOEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Onze diensten
          </h2>
          <p className="mt-4 text-zinc-600 text-base md:text-lg max-w-2xl">
            Specialistisch vakwerk voor particulier en bedrijf. {p.businessName ? `${p.businessName} levert` : 'Wij leveren'} kwaliteit met garantie.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {p.services.slice(0, 6).map((service, i) => (
            <article
              key={service}
              className="v1-card group rounded-xl border border-zinc-200 bg-white p-7 flex flex-col"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                style={{ background: mixColor(p.primaryColor, 12), color: p.primaryColor }}
              >
                <ServiceIcon service={service} className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl leading-tight mb-2">{service}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed flex-1">
                {serviceDescriptions(service)}
              </p>
              <div
                className="mt-5 text-sm font-semibold inline-flex items-center gap-1"
                style={{ color: p.primaryColor }}
              >
                Meer info
                <span aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
