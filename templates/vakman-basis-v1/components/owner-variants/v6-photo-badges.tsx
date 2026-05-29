import { PhotoOrFallback, cityLabel, foundedYear, yearsLabel, type OwnerProps } from './types'

interface Badge {
  label: string
  value: string
}

export default function OwnerV6PhotoBadges(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const founded = foundedYear(p.yearsActive)
  const tint = `color-mix(in srgb, ${p.primaryColor} 12%, white)`
  const badges: Badge[] = [
    { label: 'Ervaring', value: `${years} jaar` },
    { label: 'Werkgebied', value: city },
    { label: 'Opgericht', value: `${founded}` },
    { label: 'KvK', value: 'Geregistreerd' },
    { label: 'Verzekerd', value: 'Aansprakelijk' },
    { label: 'Garantie', value: 'Op alle werk' },
  ]
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 text-zinc-900">
      <style>{`
        @keyframes owner-v6-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v6-photo { animation: owner-v6-fade .7s cubic-bezier(.16,1,.3,1) both; }
        .owner-v6-text > * { animation: owner-v6-fade .6s cubic-bezier(.16,1,.3,1) both; }
        .owner-v6-text > *:nth-child(2) { animation-delay: .08s; }
        .owner-v6-text > *:nth-child(3) { animation-delay: .16s; }
        .owner-v6-text > *:nth-child(4) { animation-delay: .24s; }
        .owner-v6-badge { animation: owner-v6-fade .55s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v6-photo, .owner-v6-text > *, .owner-v6-badge { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_minmax(0,360px)] gap-10 md:gap-14 items-center">
        <div className="owner-v6-text order-2 md:order-1">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · WIE WIJ ZIJN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            {p.ownerName}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-zinc-700 max-w-xl mb-7">
            {years} jaar vakwerk in {city}. Geen mooie praatjes, gewoon doen wat is afgesproken. Hieronder de cijfers en garanties die u mag verwachten.
          </p>
          <ul className="grid grid-cols-2 gap-3 max-w-xl">
            {badges.map((b, i) => (
              <li
                key={b.label}
                className="owner-v6-badge rounded-xl bg-white border border-zinc-200 px-4 py-3 flex flex-col"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-zinc-500">
                  {b.label}
                </span>
                <span
                  className="mt-1 font-display font-bold text-base md:text-lg"
                  style={{ color: p.primaryColor }}
                >
                  {b.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="owner-v6-photo order-1 md:order-2 mx-auto md:mx-0 relative">
          <div
            className="absolute -inset-4 rounded-2xl"
            style={{ background: tint }}
            aria-hidden="true"
          />
          <PhotoOrFallback
            photoUrl={p.photoUrl}
            alt={p.ownerName}
            ownerName={p.ownerName}
            primaryColor={p.primaryColor}
            accentColor={p.accentColor}
            shape="square"
            size={320}
            fontScale={0.34}
            style={{ position: 'relative' }}
            imgStyle={{ position: 'relative', boxShadow: '0 24px 60px -24px rgba(0,0,0,.22)' }}
          />
        </div>
      </div>
    </section>
  )
}
