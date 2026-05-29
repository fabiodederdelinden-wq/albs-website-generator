import type { FooterProps } from './types'
import { telHref, mailHref, softTint } from './types'

export default function FooterV4WithNewsletter(p: FooterProps) {
  const year = new Date().getFullYear()
  const tint = softTint(p.primaryColor, 12)
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div
        className="px-6 md:px-12 py-12"
        style={{ background: `linear-gradient(180deg, ${tint} 0%, transparent 100%)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.primaryColor }}>
            Blijf op de hoogte
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mt-2">
            Tips, acties en onderhoudsherinneringen
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Eén mail per maand. Geen spam.
          </p>
          <form
            action="#"
            method="post"
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="je@emailadres.nl"
              aria-label="Emailadres"
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2"
              style={{ outlineColor: p.primaryColor }}
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-lg font-semibold text-white text-sm shadow-sm hover:opacity-90 transition-opacity"
              style={{ background: p.primaryColor }}
            >
              Aanmelden
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-neutral-900">{p.businessName}</p>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            Lokaal vakwerk in {p.city ?? 'de regio'}. Persoonlijke aanpak, eerlijk advies.
          </p>
          {p.kvk && <p className="text-xs text-neutral-500 mt-3">KvK {p.kvk}</p>}
        </div>
        <div>
          <p className="font-semibold text-neutral-900 text-sm mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-neutral-700">
            {p.phone && (
              <li>
                <a href={telHref(p.phone)} className="hover:underline">
                  {p.phone}
                </a>
              </li>
            )}
            {p.email && (
              <li>
                <a href={mailHref(p.email)} className="hover:underline break-all">
                  {p.email}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 text-sm mb-3">Bezoekadres</p>
          {p.address ? (
            <p className="text-sm text-neutral-700 leading-relaxed">
              {p.address}
              <br />
              {p.postcode} {p.city}
            </p>
          ) : (
            <p className="text-sm text-neutral-500">Op afspraak</p>
          )}
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
          <span>© {year} {p.businessName}</span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
