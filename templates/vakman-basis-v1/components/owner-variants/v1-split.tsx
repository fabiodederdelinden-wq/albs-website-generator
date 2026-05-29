import { PhotoOrFallback, cityLabel, yearsLabel, type OwnerProps } from './types'

export default function OwnerV1Split(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes owner-v1-photo-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes owner-v1-text-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v1-photo { animation: owner-v1-photo-in .7s cubic-bezier(.16,1,.3,1) both; }
        .owner-v1-text > * { animation: owner-v1-text-in .6s cubic-bezier(.16,1,.3,1) both; }
        .owner-v1-text > *:nth-child(2) { animation-delay: .1s; }
        .owner-v1-text > *:nth-child(3) { animation-delay: .2s; }
        .owner-v1-text > *:nth-child(4) { animation-delay: .3s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v1-photo, .owner-v1-text > * { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,360px)_1fr] gap-10 md:gap-14 items-center">
        <div className="owner-v1-photo mx-auto md:mx-0 w-full max-w-[360px]">
          <PhotoOrFallback
            photoUrl={p.photoUrl}
            alt={p.ownerName}
            ownerName={p.ownerName}
            primaryColor={p.primaryColor}
            accentColor={p.accentColor}
            shape="portrait"
            size="100%"
            fontScale={0.32}
            imgStyle={{ boxShadow: '0 24px 60px -24px rgba(0,0,0,.22)' }}
          />
        </div>
        <div className="owner-v1-text">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · WIE IK BEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight mb-3">
            {p.ownerName}
          </h2>
          <p className="text-sm font-mono tracking-[0.18em] uppercase text-zinc-500 mb-6">
            Eigenaar &middot; {p.businessName}
          </p>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-zinc-700 max-w-xl">
            <p>
              Al {years} jaar lever ik vakwerk in {city}. Eerlijk advies, vaste prijs, en altijd binnen 2 uur ter plekke.
            </p>
            <p>
              Ik werk niet met onderaannemers. Wat ik aanneem, doe ik zelf. Zo weet u precies wie er in uw huis staat.
            </p>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2 max-w-xl">
            {[
              `${years} jaar ervaring`,
              'Eigen monteur',
              'Vaste prijs',
              'Garantie op werk',
            ].map((tag) => (
              <li
                key={tag}
                className="text-xs font-mono tracking-wider px-3 py-1.5 rounded-full border"
                style={{
                  color: p.primaryColor,
                  borderColor: `color-mix(in srgb, ${p.primaryColor} 30%, transparent)`,
                  background: `color-mix(in srgb, ${p.primaryColor} 6%, white)`,
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
