import { type ContactProps, telHref, waHref, mailHref, softTint } from './types'

export default function ContactV4StickyCtaBar(p: ContactProps) {
  return (
    <section className="relative">
      <div className="py-20 px-6 md:px-12" style={{ background: softTint(p.primaryColor, 6) }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· CONTACT</p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-4">
            Iets stuk? <span style={{ color: p.primaryColor }}>Bel direct.</span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-xl mx-auto mb-8">
            Snelste hulp via de telefoon. We pakken meestal direct op, of bellen binnen 15 minuten terug.
          </p>

          <a href={telHref(p.phone)}
            className="inline-flex items-center gap-3 px-8 py-5 rounded-xl text-white font-bold text-2xl md:text-3xl shadow-lg hover:shadow-xl transition"
            style={{ background: p.primaryColor }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
            {p.phone}
          </a>

          <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
            {p.whatsapp ? (
              <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
                className="px-5 py-3 rounded-lg font-bold text-white shadow-sm hover:shadow-md transition"
                style={{ background: '#25D366' }}>
                WhatsApp
              </a>
            ) : null}
            {p.email ? (
              <a href={mailHref(p.email)}
                className="px-5 py-3 rounded-lg font-bold text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-500 transition">
                Mail
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              Nu bereikbaar
            </span>
            <span>· Spoed binnen 2 uur</span>
            <span>· Vaste prijzen</span>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 w-full md:hidden bg-white border-t-2 shadow-2xl"
        style={{ borderColor: p.primaryColor }}>
        <div className="grid grid-cols-2 divide-x divide-neutral-200">
          <a href={telHref(p.phone)} className="flex items-center justify-center gap-2 py-4 font-bold text-white"
            style={{ background: p.primaryColor }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
            Bellen
          </a>
          <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
            className="flex items-center justify-center gap-2 py-4 font-bold text-white"
            style={{ background: '#25D366' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.45 1.29 4.89L2 22l5.25-1.37A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.16 14.06c-.22.62-1.27 1.18-1.79 1.22-.46.04-1.04.06-1.68-.11-.39-.1-.88-.27-1.51-.54-2.66-1.15-4.4-3.83-4.54-4-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.93-2.24.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.6.45.22.51.75 1.78.82 1.91.07.13.11.29.02.46-.09.18-.13.29-.27.45-.13.16-.29.36-.41.49-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.21 2.18 1.34.27.13.43.11.59-.07.16-.18.69-.79.87-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.86.88.27.13.46.2.53.31.07.11.07.65-.15 1.27z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
