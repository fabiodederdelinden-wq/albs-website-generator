import { PhotoOrFallback, cityLabel, yearsLabel, type OwnerProps } from './types'

export default function OwnerV3TeamGrid(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  const tint = `color-mix(in srgb, ${p.primaryColor} 10%, white)`
  const border = `color-mix(in srgb, ${p.primaryColor} 30%, #e4e4e7)`
  return (
    <section className="py-20 md:py-28 px-6 bg-zinc-50 text-zinc-900">
      <style>{`
        @keyframes owner-v3-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v3-card { animation: owner-v3-rise .65s cubic-bezier(.16,1,.3,1) both; transition: transform .35s ease, box-shadow .35s ease; }
        .owner-v3-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px -22px rgba(0,0,0,.18); }
        @media (prefers-reduced-motion: reduce) {
          .owner-v3-card { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <p
            className="text-xs font-mono tracking-[0.28em] uppercase mb-3"
            style={{ color: p.primaryColor }}
          >
            · ONS TEAM
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            De mensen achter {p.businessName}
          </h2>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
            Klein, ervaren team. Korte lijnen. U weet wie er aan uw deur staat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          <article
            className="owner-v3-card md:col-span-1 rounded-2xl p-7 bg-white border-2 relative"
            style={{ borderColor: p.primaryColor, animationDelay: '0ms' }}
          >
            <span
              className="absolute -top-3 left-7 text-[10px] font-mono tracking-[0.22em] uppercase px-2.5 py-1 rounded-full text-white"
              style={{ background: p.primaryColor }}
            >
              EIGENAAR
            </span>
            <div className="flex justify-center mb-5 mt-2">
              <PhotoOrFallback
                photoUrl={p.photoUrl}
                alt={p.ownerName}
                ownerName={p.ownerName}
                primaryColor={p.primaryColor}
                accentColor={p.accentColor}
                shape="circle"
                size={140}
                fontScale={0.36}
              />
            </div>
            <h3 className="font-display font-bold text-xl text-center">{p.ownerName}</h3>
            <p className="text-sm text-zinc-500 text-center mt-1">
              {years} jaar &middot; {city}
            </p>
            <p className="mt-4 text-sm text-zinc-700 leading-relaxed text-center">
              Vakman in hart en nieren. U krijgt mij aan de telefoon en aan de werkbank.
            </p>
          </article>

          <article
            className="owner-v3-card rounded-2xl p-7 border-2 border-dashed"
            style={{ borderColor: border, background: tint, animationDelay: '120ms' }}
          >
            <div
              className="w-[140px] h-[140px] rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'white', border: `2px dashed ${border}` }}
            >
              <span className="text-4xl" style={{ color: p.primaryColor }} aria-hidden="true">
                +
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-center">Wij groeien</h3>
            <p className="text-sm text-zinc-500 text-center mt-1">Junior monteur gezocht</p>
            <p className="mt-4 text-sm text-zinc-700 leading-relaxed text-center">
              Vakmanschap doorgeven aan een nieuwe generatie. Ken jij iemand? Bel ons.
            </p>
          </article>

          <article
            className="owner-v3-card rounded-2xl p-7 border-2 border-dashed"
            style={{ borderColor: border, background: tint, animationDelay: '240ms' }}
          >
            <div
              className="w-[140px] h-[140px] rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'white', border: `2px dashed ${border}` }}
            >
              <span className="text-4xl" style={{ color: p.primaryColor }} aria-hidden="true">
                ?
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-center">Wil je meedoen?</h3>
            <p className="text-sm text-zinc-500 text-center mt-1">Ervaren vakman welkom</p>
            <p className="mt-4 text-sm text-zinc-700 leading-relaxed text-center">
              We breiden uit. Eerlijk loon, korte lijnen, geen weekenddiensten. Stuur een appje.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
