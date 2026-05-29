import { type ContactProps, telHref, waHref, mailHref, softTint } from './types'

export default function ContactV7ThreePaths(p: ContactProps) {
  const cards = [
    {
      label: 'Bel direct',
      sub: 'Snelste contact, direct antwoord',
      detail: p.phone,
      href: telHref(p.phone),
      external: false,
      bg: p.primaryColor,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      sub: 'Stuur foto of locatie',
      detail: 'Direct chatten',
      href: waHref(p.whatsapp),
      external: true,
      bg: '#25D366',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.45 1.29 4.89L2 22l5.25-1.37A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.16 14.06c-.22.62-1.27 1.18-1.79 1.22-.46.04-1.04.06-1.68-.11-.39-.1-.88-.27-1.51-.54-2.66-1.15-4.4-3.83-4.54-4-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.93-2.24.24-.27.53-.34.71-.34h.51c.16 0 .38-.06.6.45.22.51.75 1.78.82 1.91.07.13.11.29.02.46-.09.18-.13.29-.27.45-.13.16-.29.36-.41.49-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.21 2.18 1.34.27.13.43.11.59-.07.16-.18.69-.79.87-1.06.18-.27.36-.22.61-.13.25.09 1.58.74 1.86.88.27.13.46.2.53.31.07.11.07.65-.15 1.27z" />
        </svg>
      ),
    },
    {
      label: 'Mail ons',
      sub: 'Voor uitgebreide vragen',
      detail: p.email ?? 'Stuur e-mail',
      href: mailHref(p.email),
      external: false,
      bg: p.accentColor ?? '#2C2C2C',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ] as const

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· CONTACT</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">Kies wat het beste past</h2>
          <p className="text-neutral-600 max-w-xl mx-auto">Drie manieren om in contact te komen. Kies wat voor jou het makkelijkst is.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c) => {
            if (c.label === 'WhatsApp' && !p.whatsapp) return null
            if (c.label === 'Mail ons' && !p.email) return null
            return (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="group relative rounded-2xl p-7 bg-white border-2 border-neutral-200 hover:border-transparent hover:shadow-xl transition overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: softTint(c.bg, 6) }} />
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm"
                    style={{ background: c.bg }}>
                    {c.icon}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">{c.label}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{c.sub}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="font-semibold break-all">{c.detail}</span>
                    <span className="text-xl" aria-hidden="true" style={{ color: c.bg }}>→</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <p className="text-center mt-10 text-sm text-neutral-500">
          Reactietijd: binnen 1 werkdag. Voor spoed bellen we direct terug.
        </p>
      </div>
    </section>
  )
}
