import { ServiceIcon, serviceDescriptions, indicativePrice, mixColor, type ServicesProps } from './types'

export default function ServicesV7PriceIndicative(p: ServicesProps) {
  const phoneHref = p.phone ? `tel:${p.phone.replace(/\s+/g, '')}` : undefined
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v7-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v7-card { animation: v7-rise .55s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease; }
        .v7-card:hover { transform: translateY(-4px); box-shadow: 0 22px 50px -22px rgba(0,0,0,.2); }
        @media (prefers-reduced-motion: reduce) {
          .v7-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · TARIEVEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Wat kost het ongeveer?
          </h2>
          <p className="mt-4 text-zinc-600">
            Indicatieve startprijzen. Vooraf krijgt u altijd een vaste prijsopgave.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {p.services.slice(0, 6).map((service, i) => {
            const price = indicativePrice(i)
            const isPopular = i === 1
            return (
              <article
                key={service}
                className="v7-card relative rounded-2xl border bg-white p-7 flex flex-col"
                style={{
                  animationDelay: `${i * 70}ms`,
                  borderColor: isPopular ? p.primaryColor : '#e4e4e7',
                  borderWidth: isPopular ? 2 : 1,
                }}
              >
                {isPopular ? (
                  <span
                    className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: p.primaryColor }}
                  >
                    Meest gevraagd
                  </span>
                ) : null}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: mixColor(p.primaryColor, 12), color: p.primaryColor }}
                >
                  <ServiceIcon service={service} className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{service}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-5 min-h-[44px]">
                  {serviceDescriptions(service)}
                </p>
                <div className="mb-5 flex items-baseline gap-2">
                  <span className="text-zinc-500 text-sm">vanaf</span>
                  <span
                    className="font-display font-black text-4xl tabular-nums"
                    style={{ color: p.primaryColor }}
                  >
                    €{price}
                  </span>
                  <span className="text-zinc-500 text-sm">excl. btw</span>
                </div>
                <ul className="space-y-1.5 text-sm text-zinc-700 mb-6">
                  <li>· Voorrijkosten inbegrepen</li>
                  <li>· Materiaal naar verbruik</li>
                  <li>· Garantie op uitvoering</li>
                </ul>
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="mt-auto text-center rounded-lg font-semibold px-5 py-3 text-white transition-opacity hover:opacity-90"
                    style={{ background: p.primaryColor }}
                  >
                    Bel voor offerte
                  </a>
                ) : (
                  <span
                    className="mt-auto text-center rounded-lg font-semibold px-5 py-3 text-white"
                    style={{ background: p.primaryColor }}
                  >
                    Vraag offerte aan
                  </span>
                )}
              </article>
            )
          })}
        </div>
        <p className="mt-10 text-center text-xs text-zinc-500 max-w-2xl mx-auto">
          Prijzen zijn indicatief en kunnen afhankelijk van locatie, materiaal en complexiteit verschillen. Geen kosten zonder uw goedkeuring.
        </p>
      </div>
    </section>
  )
}
