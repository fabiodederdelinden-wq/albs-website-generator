import { PhotoOrFallback, cityLabel, foundedYear, getFirstName, yearsLabel, type OwnerProps } from './types'

export default function OwnerV10SignatureCard(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const founded = foundedYear(p.yearsActive)
  const firstName = getFirstName(p.ownerName) || 'Vakman'
  const warmBg = `color-mix(in srgb, ${p.primaryColor} 6%, #fbf8f3)`
  return (
    <section
      className="py-20 md:py-28 px-6 text-zinc-900"
      style={{ background: warmBg }}
    >
      <style>{`
        @keyframes owner-v10-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes owner-v10-draw { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
        .owner-v10-card { animation: owner-v10-rise .75s cubic-bezier(.16,1,.3,1) both; }
        .owner-v10-signature path { stroke-dasharray: 600; stroke-dashoffset: 600; animation: owner-v10-draw 2.2s cubic-bezier(.65,0,.35,1) .4s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v10-card { animation: none !important; }
          .owner-v10-signature path { stroke-dashoffset: 0 !important; animation: none !important; }
        }
      `}</style>
      <div className="max-w-3xl mx-auto">
        <div
          className="owner-v10-card bg-white rounded-2xl px-8 md:px-12 py-10 md:py-14 text-center relative"
          style={{
            boxShadow: '0 30px 80px -30px rgba(0,0,0,.18), 0 6px 20px -8px rgba(0,0,0,.08)',
            border: `1px solid color-mix(in srgb, ${p.primaryColor} 14%, white)`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute top-5 left-5 right-5 h-px"
            style={{ background: `color-mix(in srgb, ${p.primaryColor} 30%, transparent)` }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-5 right-5 h-px"
            style={{ background: `color-mix(in srgb, ${p.primaryColor} 30%, transparent)` }}
          />
          <p
            className="text-[11px] font-mono tracking-[0.32em] uppercase mb-6"
            style={{ color: p.primaryColor }}
          >
            &middot; SINDS {founded} &middot;
          </p>
          <div className="flex justify-center mb-6">
            <PhotoOrFallback
              photoUrl={p.photoUrl}
              alt={p.ownerName}
              ownerName={p.ownerName}
              primaryColor={p.primaryColor}
              accentColor={p.accentColor}
              shape="circle"
              size={120}
              fontScale={0.36}
              imgStyle={{
                border: '3px solid white',
                boxShadow: `0 0 0 2px ${p.primaryColor}, 0 12px 30px -12px rgba(0,0,0,.2)`,
              }}
              style={{
                border: '3px solid white',
                boxShadow: `0 0 0 2px ${p.primaryColor}, 0 12px 30px -12px rgba(0,0,0,.2)`,
              }}
            />
          </div>
          <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight mb-3">
            {p.ownerName}
          </h2>
          <p className="text-sm font-mono tracking-[0.2em] uppercase text-zinc-500 mb-7">
            Eigenaar &middot; {p.businessName} &middot; {city}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-zinc-700 max-w-xl mx-auto mb-9">
            {years} jaar vakmanschap. Geen verkooppraat, geen verborgen kosten. Wat ik teken, dat lever ik. Mijn naam staat ervoor.
          </p>
          <div className="flex flex-col items-center">
            <svg
              className="owner-v10-signature"
              viewBox="0 0 220 80"
              width="200"
              height="72"
              aria-label={`Handtekening ${firstName}`}
              role="img"
            >
              <path
                d="M10 55 C 18 28, 30 18, 38 42 C 42 56, 36 62, 32 56 C 50 30, 60 38, 64 52 C 68 60, 72 56, 78 36 C 84 18, 92 26, 98 50 C 104 64, 110 60, 116 40 C 122 20, 134 24, 142 50 C 148 66, 158 60, 168 38 C 178 18, 194 22, 210 30"
                fill="none"
                stroke={p.primaryColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: `drop-shadow(0 1px 0 color-mix(in srgb, ${p.primaryColor} 50%, transparent))`,
                }}
              />
            </svg>
            <p
              className="mt-2 italic tracking-wider"
              style={{
                fontFamily: '"Caveat", "Bradley Hand", "Segoe Script", cursive',
                color: p.primaryColor,
                fontSize: '22px',
                letterSpacing: '0.05em',
              }}
            >
              &mdash; {firstName}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
