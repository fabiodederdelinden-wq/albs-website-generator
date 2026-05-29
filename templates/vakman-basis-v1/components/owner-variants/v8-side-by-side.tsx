import { PhotoOrFallback, cityLabel, foundedYear, yearsLabel, type OwnerProps } from './types'

export default function OwnerV8SideBySide(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const founded = foundedYear(p.yearsActive)
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes owner-v8-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v8-card { animation: owner-v8-rise .7s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease; }
        .owner-v8-card:nth-child(2) { animation-delay: .12s; }
        .owner-v8-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px -22px rgba(0,0,0,.18); }
        @media (prefers-reduced-motion: reduce) {
          .owner-v8-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · OVER ONS
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            De vakman en het bedrijf
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <article
            className="owner-v8-card rounded-2xl p-7 md:p-9 bg-zinc-50 border border-zinc-200 flex flex-col"
          >
            <div className="flex items-center gap-5 mb-6">
              <PhotoOrFallback
                photoUrl={p.photoUrl}
                alt={p.ownerName}
                ownerName={p.ownerName}
                primaryColor={p.primaryColor}
                accentColor={p.accentColor}
                shape="circle"
                size={96}
                fontScale={0.36}
              />
              <div>
                <p className="text-[10px] font-mono tracking-[0.26em] uppercase text-zinc-500 mb-1">
                  EIGENAAR
                </p>
                <h3 className="font-display font-bold text-xl">{p.ownerName}</h3>
                <p className="text-sm text-zinc-500">Vakman &middot; {years} jaar ervaring</p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-zinc-700 flex-1">
              Eerlijk advies, vaste prijs, geen onverwachte rekeningen. Ik kom zelf, ik werk zelf, en u krijgt mij aan de telefoon.
            </p>
            <div
              className="mt-6 pt-5 border-t text-sm font-mono tracking-wider"
              style={{ borderColor: 'rgba(0,0,0,.08)', color: p.primaryColor }}
            >
              Aanspreekpunt voor al uw vragen
            </div>
          </article>

          <article
            className="owner-v8-card rounded-2xl p-7 md:p-9 border-2 flex flex-col"
            style={{ borderColor: p.primaryColor, background: 'white' }}
          >
            <div className="mb-6">
              <p className="text-[10px] font-mono tracking-[0.26em] uppercase text-zinc-500 mb-1">
                BEDRIJF
              </p>
              <h3 className="font-display font-bold text-xl">{p.businessName}</h3>
              <p className="text-sm text-zinc-500">Opgericht {founded} &middot; gevestigd in {city}</p>
            </div>
            <dl className="space-y-3 text-sm flex-1">
              <div className="flex justify-between items-baseline border-b border-dashed border-zinc-200 pb-2">
                <dt className="text-zinc-600">Werkgebied</dt>
                <dd className="font-semibold">{city} en omstreken</dd>
              </div>
              <div className="flex justify-between items-baseline border-b border-dashed border-zinc-200 pb-2">
                <dt className="text-zinc-600">Reactie spoed</dt>
                <dd className="font-semibold">Binnen 2 uur</dd>
              </div>
              <div className="flex justify-between items-baseline border-b border-dashed border-zinc-200 pb-2">
                <dt className="text-zinc-600">Garantie</dt>
                <dd className="font-semibold">Op alle werk</dd>
              </div>
              <div className="flex justify-between items-baseline">
                <dt className="text-zinc-600">Klanten</dt>
                <dd className="font-semibold">Particulier &amp; zakelijk</dd>
              </div>
            </dl>
            <div
              className="mt-6 pt-5 border-t text-sm font-mono tracking-wider"
              style={{ borderColor: 'rgba(0,0,0,.08)', color: p.primaryColor }}
            >
              Vaste prijs, vakwerk, met garantie
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
