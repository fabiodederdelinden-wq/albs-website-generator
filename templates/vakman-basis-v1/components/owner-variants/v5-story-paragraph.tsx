import { PhotoOrFallback, cityLabel, foundedYear, yearsLabel, type OwnerProps } from './types'

export default function OwnerV5StoryParagraph(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const founded = foundedYear(p.yearsActive)
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes owner-v5-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v5-block > * { animation: owner-v5-fade .6s cubic-bezier(.16,1,.3,1) both; }
        .owner-v5-block > *:nth-child(2) { animation-delay: .1s; }
        .owner-v5-block > *:nth-child(3) { animation-delay: .2s; }
        .owner-v5-block > *:nth-child(4) { animation-delay: .3s; }
        .owner-v5-block > *:nth-child(5) { animation-delay: .4s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v5-block > * { animation: none !important; }
        }
      `}</style>
      <div className="max-w-3xl mx-auto owner-v5-block">
        <div className="flex items-center gap-4 mb-8">
          <PhotoOrFallback
            photoUrl={p.photoUrl}
            alt={p.ownerName}
            ownerName={p.ownerName}
            primaryColor={p.primaryColor}
            accentColor={p.accentColor}
            shape="circle"
            size={80}
            fontScale={0.36}
          />
          <div>
            <p
              className="text-[11px] font-mono tracking-[0.26em] uppercase mb-1"
              style={{ color: p.primaryColor }}
            >
              · MIJN VERHAAL
            </p>
            <p className="font-display font-bold text-lg leading-tight">{p.ownerName}</p>
            <p className="text-sm text-zinc-500">Sinds {founded} in {city}</p>
          </div>
        </div>
        <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight leading-tight mb-7">
          Een vak leer je niet uit een boekje. Je leert het door het te doen.
        </h2>
        <div
          className="space-y-5 text-base md:text-[17px] leading-[1.75] text-zinc-700"
          style={{ letterSpacing: '0.01em' }}
        >
          <p>
            Ik ben begonnen in {founded}, als jonge vakman die dacht alles te weten. {years} jaar later weet ik beter. Elke klus is anders, elke klant is anders, en geen huis is hetzelfde. Wat hetzelfde blijft is hoe je mensen behandelt.
          </p>
          <p>
            We zijn een klein bedrijf in {city}. Geen onderaannemers, geen vage offertes, geen rekeningen achteraf die plots dubbel zo hoog zijn. Als ik bij u thuis kom, kom ik zelf. Als u een vraag heeft, krijgt u mij aan de telefoon.
          </p>
          <p>
            Vakmanschap is geen reclamewoord. Het is opstaan om 6 uur als de cv kapot is bij iemand met een baby. Het is uitleggen waarom iets is wat het is, in begrijpelijke taal. Dat is waar {p.businessName} voor staat.
          </p>
        </div>
        <div
          className="mt-10 pt-6 border-t flex items-center gap-3"
          style={{ borderColor: `color-mix(in srgb, ${p.primaryColor} 18%, transparent)` }}
        >
          <span
            className="text-3xl"
            style={{
              fontFamily: '"Caveat", "Bradley Hand", cursive',
              color: p.primaryColor,
              fontStyle: 'italic',
            }}
            aria-hidden="true"
          >
            &mdash; {p.ownerName.split(' ')[0]}
          </span>
          <span className="text-sm text-zinc-500">Met vakgroet</span>
        </div>
      </div>
    </section>
  )
}
