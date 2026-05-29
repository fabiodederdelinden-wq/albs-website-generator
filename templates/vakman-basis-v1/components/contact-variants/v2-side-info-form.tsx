import { type ContactProps, telHref, waHref, mailHref, softTint } from './types'

export default function ContactV2SideInfoForm(p: ContactProps) {
  const mailAction = p.email ? `mailto:${p.email}?subject=Contactaanvraag via website` : '#'
  return (
    <section className="py-20 px-6 md:px-12" style={{ background: softTint(p.primaryColor, 4) }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· CONTACT</p>
              <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">{p.businessName}</h2>
              <p className="text-neutral-600">Persoonlijk contact werkt het snelst. Bel of stuur een bericht, dan reageren we direct.</p>
            </div>

            <div className="space-y-3">
              <a href={telHref(p.phone)} className="flex items-center gap-3 group">
                <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                  style={{ background: p.primaryColor }}>T</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">Telefoon</p>
                  <p className="font-bold text-lg group-hover:underline">{p.phone}</p>
                </div>
              </a>

              {p.whatsapp ? (
                <a href={waHref(p.whatsapp)} target="_blank" rel="noopener" className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                    style={{ background: '#25D366' }}>W</span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">WhatsApp</p>
                    <p className="font-bold text-lg group-hover:underline">Direct chatten</p>
                  </div>
                </a>
              ) : null}

              {p.email ? (
                <a href={mailHref(p.email)} className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                    style={{ background: p.accentColor ?? '#2C2C2C' }}>@</span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">E-mail</p>
                    <p className="font-bold text-lg group-hover:underline break-all">{p.email}</p>
                  </div>
                </a>
              ) : null}

              {p.address ? (
                <div className="flex items-start gap-3 pt-2">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-neutral-200 text-neutral-700 font-bold">·</span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Adres</p>
                    <p className="font-medium">{p.address}</p>
                    <p className="text-neutral-600 text-sm">{p.postcode} {p.city}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <form action={mailAction} method="post" encType="text/plain" className="md:col-span-3 bg-white p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-2xl mb-2">Stuur een bericht</h3>

            <div>
              <label htmlFor="v2-name" className="block text-sm font-medium text-neutral-700 mb-1">Naam *</label>
              <input id="v2-name" name="naam" type="text" required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="v2-email" className="block text-sm font-medium text-neutral-700 mb-1">E-mail *</label>
                <input id="v2-email" name="email" type="email" required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties} />
              </div>
              <div>
                <label htmlFor="v2-tel" className="block text-sm font-medium text-neutral-700 mb-1">Telefoon</label>
                <input id="v2-tel" name="telefoon" type="tel"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties} />
              </div>
            </div>

            <div>
              <label htmlFor="v2-msg" className="block text-sm font-medium text-neutral-700 mb-1">Wat kunnen we voor je doen? *</label>
              <textarea id="v2-msg" name="bericht" rows={5} required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 resize-y"
                style={{ ['--tw-ring-color' as string]: p.primaryColor } as React.CSSProperties} />
            </div>

            <button type="submit"
              className="w-full py-4 rounded-lg font-bold text-white text-lg shadow-sm hover:shadow-md transition"
              style={{ background: p.primaryColor }}>
              Verstuur
            </button>
            <p className="text-xs text-neutral-500 text-center">We bellen of mailen binnen 1 werkdag terug.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
