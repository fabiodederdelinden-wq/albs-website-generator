import type { FooterProps } from './types'
import { telHref, waHref, mailHref, socialHrefs } from './types'
import LegalLinks from './legal-links'

export default function FooterV7SitemapExtended(p: FooterProps) {
  const year = new Date().getFullYear()
  const services = (p.services ?? []).slice(0, 6)
  const baseCity = p.city ?? 'Utrecht'
  const regions = [baseCity, 'Nieuwegein', 'Houten', 'Maarssen', 'Vleuten', 'IJsselstein']
  const info = ['Over ons', 'Werkwijze', 'Reviews', 'Veelgestelde vragen', 'Garantie', 'Klachten']
  const socials = socialHrefs(p.businessName)
  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-14 pb-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <p className="font-bold text-lg" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Lokaal vakwerk in {baseCity} en omgeving. Bereikbaar en betrouwbaar.
          </p>
          {p.kvk && <p className="text-xs text-neutral-600 mt-3">KvK {p.kvk}</p>}
        </div>
        <div>
          <p className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Diensten</p>
          <ul className="space-y-1.5">
            {services.length > 0 ? (
              services.map((s) => (
                <li key={s} className="hover:text-white transition-colors">
                  {s}
                </li>
              ))
            ) : (
              <li>Alle diensten</li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Regio's</p>
          <ul className="space-y-1.5">
            {regions.map((r) => (
              <li key={r} className="hover:text-white transition-colors">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Info</p>
          <ul className="space-y-1.5">
            {info.map((i) => (
              <li key={i} className="hover:text-white transition-colors">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Contact</p>
          <ul className="space-y-1.5">
            {p.phone && (
              <li>
                <a href={telHref(p.phone)} className="hover:text-white">
                  {p.phone}
                </a>
              </li>
            )}
            {p.whatsapp && (
              <li>
                <a href={waHref(p.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            {p.email && (
              <li>
                <a href={mailHref(p.email)} className="hover:text-white break-all">
                  {p.email}
                </a>
              </li>
            )}
            <li className="pt-2 flex gap-2">
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-500 hover:text-white">
                FB
              </a>
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-500 hover:text-white">
                IG
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-500 hover:text-white">
                LI
              </a>
              <a href={socials.google} target="_blank" rel="noopener noreferrer" aria-label="Google" className="text-neutral-500 hover:text-white">
                G
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
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
