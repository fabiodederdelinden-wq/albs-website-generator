import { type ContactProps, telHref, waHref, mailHref, softTint } from './types'

export default function ContactV1FormClassic(p: ContactProps) {
  const mailAction = p.email ? `mailto:${p.email}?subject=Contactaanvraag via website` : '#'
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· CONTACT</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">Stuur ons een bericht</h2>
          <p className="text-neutral-600">We reageren meestal binnen 1 werkdag. Voor spoed: bel direct.</p>
        </div>

        <form action={mailAction} method="post" encType="text/plain" className="space-y-4">
          <div>
            <label htmlFor="v1-name" className="block text-sm font-medium text-neutral-700 mb-1">Naam</label>
            <input id="v1-name" name="naam" type="text" required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="v1-email" className="block text-sm font-medium text-neutral-700 mb-1">E-mail</label>
              <input id="v1-email" name="email" type="email" required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties}
              />
            </div>
            <div>
              <label htmlFor="v1-tel" className="block text-sm font-medium text-neutral-700 mb-1">Telefoon</label>
              <input id="v1-tel" name="telefoon" type="tel"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties}
              />
            </div>
          </div>

          <div>
            <label htmlFor="v1-msg" className="block text-sm font-medium text-neutral-700 mb-1">Bericht</label>
            <textarea id="v1-msg" name="bericht" rows={5} required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 resize-y"
              style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties}
            />
          </div>

          <button type="submit"
            className="w-full py-4 rounded-lg font-bold text-white text-lg shadow-sm hover:shadow-md transition"
            style={{ background: p.primaryColor }}
          >
            Verstuur bericht
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-200 grid sm:grid-cols-2 gap-3 text-sm">
          <a href={telHref(p.phone)} className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition" style={{ background: softTint(p.primaryColor, 5) }}>
            <span className="font-mono text-xs text-neutral-500">TEL</span>
            <span className="font-semibold">{p.phone}</span>
          </a>
          {p.whatsapp ? (
            <a href={waHref(p.whatsapp)} target="_blank" rel="noopener" className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition" style={{ background: softTint(p.primaryColor, 5) }}>
              <span className="font-mono text-xs text-neutral-500">WA</span>
              <span className="font-semibold">WhatsApp</span>
            </a>
          ) : null}
          {p.email ? (
            <a href={mailHref(p.email)} className="flex items-center gap-2 p-3 rounded-lg hover:bg-neutral-50 transition sm:col-span-2" style={{ background: softTint(p.primaryColor, 5) }}>
              <span className="font-mono text-xs text-neutral-500">MAIL</span>
              <span className="font-semibold">{p.email}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
