import { ServiceIcon, serviceDescriptions, mixColor, type ServicesProps } from './types'

export default function ServicesV2Accordion(p: ServicesProps) {
  const phoneHref = p.phone ? `tel:${p.phone.replace(/\s+/g, '')}` : undefined
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 text-zinc-900">
      <style>{`
        @keyframes v2-row { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        .v2-row { animation: v2-row .55s ease-out both; }
        details.v2-item summary::-webkit-details-marker { display: none; }
        details.v2-item summary { list-style: none; cursor: pointer; }
        details.v2-item .v2-chev { transition: transform .3s ease; }
        details.v2-item[open] .v2-chev { transform: rotate(45deg); }
        details.v2-item .v2-body { max-height: 0; overflow: hidden; transition: max-height .4s ease, opacity .3s ease; opacity: 0; }
        details.v2-item[open] .v2-body { max-height: 240px; opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .v2-row, .v2-chev, .v2-body { animation: none !important; transition: none !important; }
          details.v2-item .v2-body { max-height: none; opacity: 1; }
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 md:mb-14">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · DIENSTEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Klik open en lees meer
          </h2>
        </div>
        <div className="divide-y divide-zinc-200 bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          {p.services.slice(0, 6).map((service, i) => (
            <details
              key={service}
              className="v2-item v2-row"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <summary className="flex items-center gap-4 px-5 md:px-7 py-5 hover:bg-zinc-50">
                <span
                  className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: mixColor(p.primaryColor, 14), color: p.primaryColor }}
                >
                  <ServiceIcon service={service} className="w-6 h-6" />
                </span>
                <span className="font-display font-bold text-lg md:text-xl flex-1">{service}</span>
                <span
                  className="v2-chev shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xl font-light"
                  style={{ background: mixColor(p.primaryColor, 10), color: p.primaryColor }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="v2-body px-5 md:px-7">
                <div className="pb-6 pt-1 pl-15 md:pl-[60px] text-zinc-600 leading-relaxed">
                  <p className="mb-3">{serviceDescriptions(service)}</p>
                  <ul className="text-sm space-y-1 text-zinc-700">
                    <li>· Vaste prijs vooraf, geen verrassingen</li>
                    <li>· Garantie op materiaal en arbeid</li>
                    <li>· Spoed mogelijk binnen 2 uur</li>
                  </ul>
                  {phoneHref ? (
                    <a
                      href={phoneHref}
                      className="inline-block mt-4 text-sm font-semibold"
                      style={{ color: p.primaryColor }}
                    >
                      Bel direct {p.phone} →
                    </a>
                  ) : null}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
