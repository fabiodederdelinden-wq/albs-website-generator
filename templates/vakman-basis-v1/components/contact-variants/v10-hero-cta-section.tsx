import { type ContactProps, telHref, waHref, darkTint } from './types'

export default function ContactV10HeroCtaSection(p: ContactProps) {
  const dark = darkTint(p.primaryColor, 30)
  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden text-white"
      style={{ background: `linear-gradient(135deg, ${p.primaryColor} 0%, ${dark} 100%)` }}
    >
      <style>{`
        @keyframes v10-float-1 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
        @keyframes v10-float-2 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-30px,40px); } }
        .v10-blob-1 { animation: v10-float-1 16s ease-in-out infinite; }
        .v10-blob-2 { animation: v10-float-2 22s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .v10-blob-1, .v10-blob-2 { animation: none; } }
      `}</style>

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="v10-blob-1 absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'white' }} />
        <div className="v10-blob-2 absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'white' }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="v10-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#v10-dots)" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/70 mb-5">· {p.businessName.toUpperCase()}</p>
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight mb-5 drop-shadow-md">
          Klaar voor een afspraak?
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10">
          Een belletje is genoeg. We denken mee, kijken vrijblijvend langs en maken een eerlijke prijs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href={telHref(p.phone)}
            className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-xl shadow-xl hover:scale-[1.02] transition bg-white"
            style={{ color: dark }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
            Bel {p.phone}
          </a>
          {p.whatsapp ? (
            <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-bold text-xl shadow-xl hover:scale-[1.02] transition text-white border-2 border-white/60"
              style={{ background: 'rgba(255,255,255,0.12)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.45 1.29 4.89L2 22l5.25-1.37A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.16 14.06c-.22.62-1.27 1.18-1.79 1.22-.46.04-1.04.06-1.68-.11-.39-.1-.88-.27-1.51-.54-2.66-1.15-4.4-3.83-4.54-4-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.93-2.24.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.6.45.22.51.75 1.78.82 1.91.07.13.11.29.02.46-.09.18-.13.29-.27.45-.13.16-.29.36-.41.49-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.21 2.18 1.34.27.13.43.11.59-.07.16-.18.69-.79.87-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.86.88.27.13.46.2.53.31.07.11.07.65-.15 1.27z" />
              </svg>
              WhatsApp
            </a>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
            Reactie binnen 15 min
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
            Vaste prijs vooraf
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
            Gratis kennismaking
          </span>
        </div>
      </div>
    </section>
  )
}
