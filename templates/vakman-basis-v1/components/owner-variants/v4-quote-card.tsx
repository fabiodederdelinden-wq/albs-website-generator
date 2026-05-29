import { PhotoOrFallback, cityLabel, yearsLabel, type OwnerProps } from './types'

export default function OwnerV4QuoteCard(p: OwnerProps) {
  const years = yearsLabel(p.yearsActive)
  const city = cityLabel(p.city)
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes owner-v4-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .owner-v4-photo { animation: owner-v4-rise .7s cubic-bezier(.16,1,.3,1) both; }
        .owner-v4-quote { animation: owner-v4-rise .7s cubic-bezier(.16,1,.3,1) both; animation-delay: .15s; }
        @media (prefers-reduced-motion: reduce) {
          .owner-v4-photo, .owner-v4-quote { animation: none !important; }
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-center">
          <div className="owner-v4-photo mx-auto md:mx-0 relative">
            <div
              className="absolute -inset-3 rounded-full opacity-20 blur-xl"
              style={{ background: p.primaryColor }}
              aria-hidden="true"
            />
            <div className="relative">
              <PhotoOrFallback
                photoUrl={p.photoUrl}
                alt={p.ownerName}
                ownerName={p.ownerName}
                primaryColor={p.primaryColor}
                accentColor={p.accentColor}
                shape="circle"
                size={200}
                fontScale={0.34}
                imgStyle={{
                  border: '4px solid white',
                  boxShadow: '0 20px 40px -16px rgba(0,0,0,.2)',
                }}
                style={{
                  border: '4px solid white',
                  boxShadow: '0 20px 40px -16px rgba(0,0,0,.2)',
                }}
              />
            </div>
          </div>
          <div className="owner-v4-quote">
            <span
              className="block font-serif text-7xl md:text-8xl leading-none mb-2"
              style={{ color: p.primaryColor, fontFamily: 'Georgia, "Times New Roman", serif' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-800"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Een goede vakman komt op tijd, ruimt op, en doet wat hij belooft. Klinkt simpel. Daarom zijn we al {years} jaar in {city} de mensen die klanten doorsturen naar hun buren.
            </blockquote>
            <div className="mt-7 flex items-center gap-4">
              <div
                className="h-px flex-1 max-w-[60px]"
                style={{ background: p.primaryColor }}
                aria-hidden="true"
              />
              <div>
                <p className="font-display font-bold text-lg text-zinc-900">{p.ownerName}</p>
                <p className="text-sm font-mono tracking-[0.16em] uppercase text-zinc-500 mt-0.5">
                  Eigenaar &middot; {p.businessName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
