import { type ContactProps, telHref, waHref, mailHref, softTint, darkTint } from './types'

export default function ContactV3MapInfoSide(p: ContactProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <style>{`
        @keyframes v3-map-pulse { 0%, 100% { r: 32px; fill-opacity: .25; } 50% { r: 48px; fill-opacity: 0; } }
        .v3-map-pulse { animation: v3-map-pulse 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .v3-map-pulse { animation: none; } }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· VIND ONS</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight">Werkgebied & contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 min-h-[320px] md:min-h-[420px]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="v3-map-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={softTint(p.primaryColor, 10)} />
                  <stop offset="100%" stopColor={softTint(p.primaryColor, 25)} />
                </linearGradient>
                <pattern id="v3-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke={darkTint(p.primaryColor, 20)} strokeOpacity="0.18" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#v3-map-bg)" />
              <rect width="400" height="400" fill="url(#v3-grid)" />
              <path d="M 0 240 Q 100 200 200 230 T 400 220" stroke={p.primaryColor} strokeWidth="3" strokeOpacity="0.45" fill="none" />
              <path d="M 0 130 Q 130 170 240 140 T 400 160" stroke={p.primaryColor} strokeWidth="2" strokeOpacity="0.3" fill="none" />
              <path d="M 180 0 Q 200 120 220 180 T 240 400" stroke={p.primaryColor} strokeWidth="2" strokeOpacity="0.3" fill="none" />
              <circle cx="120" cy="100" r="18" fill={softTint(p.primaryColor, 40)} stroke={p.primaryColor} strokeWidth="1.5" />
              <circle cx="320" cy="300" r="14" fill={softTint(p.primaryColor, 40)} stroke={p.primaryColor} strokeWidth="1.5" />
              <circle cx="80" cy="320" r="10" fill={softTint(p.primaryColor, 40)} stroke={p.primaryColor} strokeWidth="1.5" />
              <g transform="translate(200 200)">
                <circle className="v3-map-pulse" r="32" fill={p.primaryColor} fillOpacity="0.2" />
                <path d="M 0 -22 C -12 -22 -20 -12 -20 0 C -20 14 0 28 0 28 C 0 28 20 14 20 0 C 20 -12 12 -22 0 -22 Z"
                  fill={p.primaryColor} stroke="white" strokeWidth="2.5" />
                <circle r="5" fill="white" cy="-4" />
              </g>
            </svg>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-3 rounded-lg shadow-md text-sm">
              <p className="font-bold">{p.businessName}</p>
              <p className="text-neutral-600">{p.address ?? 'Centraal in de regio'}{p.address && p.city ? ', ' : ''}{p.city ?? ''}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5">
            {p.address ? (
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Bezoekadres</p>
                <p className="font-display font-bold text-2xl">{p.businessName}</p>
                <p className="text-neutral-700">{p.address}</p>
                <p className="text-neutral-700">{p.postcode} {p.city}</p>
              </div>
            ) : null}

            <div className="space-y-2">
              <a href={telHref(p.phone)}
                className="flex items-center justify-between p-4 rounded-lg text-white shadow-sm hover:shadow-md transition"
                style={{ background: p.primaryColor }}>
                <span className="font-bold text-lg">Bel {p.phone}</span>
                <span aria-hidden="true">→</span>
              </a>
              {p.whatsapp ? (
                <a href={waHref(p.whatsapp)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border-2 transition hover:bg-neutral-50"
                  style={{ borderColor: p.primaryColor, color: p.primaryColor }}>
                  <span className="font-bold">Stuur WhatsApp</span>
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
              {p.email ? (
                <a href={mailHref(p.email)}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-300 hover:border-neutral-500 transition">
                  <span className="font-medium break-all">{p.email}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>

            <p className="text-sm text-neutral-500 pt-2 border-t border-neutral-200">
              Werkgebied: {p.city ?? 'jouw regio'} en omliggende plaatsen. Gratis voorrijden binnen 20 km.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
