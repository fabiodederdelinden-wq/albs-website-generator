import { PhotoOrFallback, cityLabel, foundedYear, getFirstName, yearsLabel, type OwnerProps } from './types'

export default function OwnerV7Polaroid(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const founded = foundedYear(p.yearsActive)
  const firstName = getFirstName(p.ownerName)
  const warmBg = `color-mix(in srgb, ${p.primaryColor} 8%, #faf6f1)`
  return (
    <section
      className="py-20 md:py-28 px-6 text-zinc-900"
      style={{ background: warmBg }}
    >
      <style>{`
        @keyframes owner-v7-drop { from { opacity: 0; transform: translateY(-10px) rotate(-6deg); } to { opacity: 1; transform: translateY(0) rotate(-2deg); } }
        @keyframes owner-v7-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v7-polaroid { animation: owner-v7-drop .9s cubic-bezier(.16,1,.3,1) both; transform-origin: center; transition: transform .4s ease; }
        .owner-v7-polaroid:hover { transform: rotate(0deg) scale(1.02); }
        .owner-v7-text > * { animation: owner-v7-fade .6s cubic-bezier(.16,1,.3,1) both; }
        .owner-v7-text > *:nth-child(2) { animation-delay: .15s; }
        .owner-v7-text > *:nth-child(3) { animation-delay: .3s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v7-polaroid { animation: none !important; transform: rotate(-2deg) !important; }
          .owner-v7-polaroid:hover { transform: rotate(-2deg) !important; }
          .owner-v7-text > * { animation: none !important; }
        }
      `}</style>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[260px_1fr] gap-12 md:gap-16 items-center">
        <div className="flex justify-center md:justify-start">
          <div
            className="owner-v7-polaroid bg-white p-4 pb-14 relative"
            style={{
              boxShadow: '0 20px 40px -16px rgba(0,0,0,.25), 0 6px 12px -6px rgba(0,0,0,.15)',
              transform: 'rotate(-2deg)',
            }}
          >
            <PhotoOrFallback
              photoUrl={p.photoUrl}
              alt={p.ownerName}
              ownerName={p.ownerName}
              primaryColor={p.primaryColor}
              accentColor={p.accentColor}
              shape="square"
              size={220}
              fontScale={0.34}
              style={{ borderRadius: '2px' }}
              imgStyle={{ borderRadius: '2px' }}
            />
            <p
              className="absolute bottom-3 left-0 right-0 text-center text-zinc-700 text-sm"
              style={{
                fontFamily: '"Caveat", "Bradley Hand", "Segoe Script", cursive',
                fontStyle: 'italic',
                fontSize: '18px',
              }}
            >
              &mdash; {firstName}, sinds {founded}
            </p>
          </div>
        </div>
        <div className="owner-v7-text text-center md:text-left">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · PERSOONLIJK
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-4">
            Een vakman die u kent
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-zinc-700 max-w-xl md:mx-0 mx-auto">
            Al {years} jaar in {city}. Geen anoniem callcenter, geen monteur die u nooit eerder zag. Ik kom zelf, ik werk zelf, ik bel zelf na om te vragen of alles goed is. Zo werkten we vroeger, en zo werken we nog steeds.
          </p>
        </div>
      </div>
    </section>
  )
}
