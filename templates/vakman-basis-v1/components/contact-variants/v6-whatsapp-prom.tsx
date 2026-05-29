import { type ContactProps, telHref, waHref } from './types'

const WA_GREEN = '#25D366'
const WA_DARK = '#128C7E'

export default function ContactV6WhatsappProm(p: ContactProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-neutral-50 overflow-hidden">
      <style>{`
        @keyframes wa-typing { 0%, 60%, 100% { opacity: .25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
        @keyframes wa-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,.45); } 70% { box-shadow: 0 0 0 22px rgba(37,211,102,0); } }
        .wa-dot-1 { animation: wa-typing 1.2s infinite; }
        .wa-dot-2 { animation: wa-typing 1.2s .15s infinite; }
        .wa-dot-3 { animation: wa-typing 1.2s .3s infinite; }
        .wa-pulse-btn { animation: wa-pulse 2.2s infinite; }
        @media (prefers-reduced-motion: reduce) { .wa-dot-1, .wa-dot-2, .wa-dot-3, .wa-pulse-btn { animation: none; } }
      `}</style>

      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· WHATSAPP</p>
        <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-2">App ons direct</h2>
        <p className="text-neutral-600 mb-10">Snelste manier om contact te krijgen. Foto's, locatie, alles werkt.</p>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-8 max-w-md mx-auto text-left">
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: WA_DARK }}>
              {p.businessName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{p.businessName}</p>
              <p className="text-xs flex items-center gap-1.5" style={{ color: WA_DARK }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: WA_GREEN }} aria-hidden="true" />
                online
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-end">
              <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-tr-sm text-sm" style={{ background: '#DCF8C6' }}>
                Hi, kun je vanmiddag komen kijken? Lekkage in de keuken.
                <div className="text-[10px] text-neutral-500 text-right mt-1">14:02 ✓✓</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-tl-sm bg-white border border-neutral-200 text-sm">
                Ja, ik ben rond 15:30 in de buurt. Stuur even je adres door?
                <div className="text-[10px] text-neutral-500 text-right mt-1">14:03</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-neutral-200 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 wa-dot-1" aria-hidden="true" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 wa-dot-2" aria-hidden="true" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 wa-dot-3" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
          className="wa-pulse-btn inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-xl shadow-lg hover:scale-[1.02] transition"
          style={{ background: WA_GREEN }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.45 1.29 4.89L2 22l5.25-1.37A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.16 14.06c-.22.62-1.27 1.18-1.79 1.22-.46.04-1.04.06-1.68-.11-.39-.1-.88-.27-1.51-.54-2.66-1.15-4.4-3.83-4.54-4-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.93-2.24.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.6.45.22.51.75 1.78.82 1.91.07.13.11.29.02.46-.09.18-.13.29-.27.45-.13.16-.29.36-.41.49-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.21 2.18 1.34.27.13.43.11.59-.07.16-.18.69-.79.87-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.86.88.27.13.46.2.53.31.07.11.07.65-.15 1.27z" />
          </svg>
          Start chat op WhatsApp
        </a>

        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-3">Liever bellen?</p>
          <a href={telHref(p.phone)} className="inline-block px-6 py-3 rounded-lg font-bold text-lg border-2 transition hover:bg-white"
            style={{ borderColor: p.primaryColor, color: p.primaryColor }}>
            {p.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
