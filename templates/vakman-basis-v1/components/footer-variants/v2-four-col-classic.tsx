import type { FooterProps } from './types'
import { telHref, waHref, mailHref } from './types'
import LegalLinks from './legal-links'

export default function FooterV2FourColClassic(p: FooterProps) {
  const year = new Date().getFullYear()
  const services = (p.services ?? []).slice(0, 5)
  const hours: Array<{ day: string; time: string }> = [
    { day: 'Maandag — Vrijdag', time: '08:00 — 18:00' },
    { day: 'Zaterdag', time: '09:00 — 14:00' },
    { day: 'Zondag', time: 'Spoed op afspraak' },
  ]
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-14 pb-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-bold text-white text-lg" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <p className="text-sm mt-3 text-neutral-400 leading-relaxed">
            Vakwerk uit {p.city ?? 'de regio'}. Snelle service, eerlijke prijs,
            persoonlijk contact.
          </p>
          {p.kvk && <p className="text-xs mt-4 text-neutral-500">KvK {p.kvk}</p>}
        </div>
        <div>
          <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Diensten
          </p>
          <ul className="space-y-2 text-sm">
            {services.length > 0 ? (
              services.map((s) => (
                <li key={s} className="text-neutral-400 hover:text-white transition-colors">
                  {s}
                </li>
              ))
            ) : (
              <li className="text-neutral-500">Alle vakdiensten</li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Contact
          </p>
          <ul className="space-y-2 text-sm">
            {p.phone && (
              <li>
                <a href={telHref(p.phone)} className="hover:text-white transition-colors">
                  {p.phone}
                </a>
              </li>
            )}
            {p.whatsapp && (
              <li>
                <a
                  href={waHref(p.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {p.email && (
              <li>
                <a href={mailHref(p.email)} className="hover:text-white transition-colors break-all">
                  {p.email}
                </a>
              </li>
            )}
            {p.address && (
              <li className="text-neutral-400">
                {p.address}
                <br />
                {p.postcode} {p.city}
              </li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Openingstijden
          </p>
          <ul className="space-y-2 text-sm">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-3">
                <span className="text-neutral-400">{h.day}</span>
                <span className="text-neutral-300">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-neutral-500">
        <span className="inline-flex flex-wrap items-center gap-2">
          <span>© {year} {p.businessName}. Alle rechten voorbehouden.</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <LegalLinks tone="dark" />
        </span>
        <span>
          Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
        </span>
      </div>
    </footer>
  )
}
