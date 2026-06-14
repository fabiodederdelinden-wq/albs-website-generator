import type { FooterProps } from './types'
import { telHref, waHref, mailHref, softTint } from './types'
import LegalLinks from './legal-links'

interface PartnerLogoProps {
  color: string
  index: number
  label: string
}

function PartnerLogo({ color, index, label }: PartnerLogoProps) {
  const shapes = [
    <svg key="0" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <circle cx="20" cy="20" r="12" fill="none" stroke={color} strokeWidth="2" />
      <text x="40" y="25" fontSize="11" fontWeight="700" fill={color}>KEUR</text>
    </svg>,
    <svg key="1" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <polygon points="14,4 26,12 26,28 14,36 2,28 2,12" fill="none" stroke={color} strokeWidth="2" />
      <text x="32" y="25" fontSize="11" fontWeight="700" fill={color}>VAK</text>
    </svg>,
    <svg key="2" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <rect x="4" y="6" width="20" height="28" rx="2" fill="none" stroke={color} strokeWidth="2" />
      <line x1="8" y1="14" x2="20" y2="14" stroke={color} strokeWidth="2" />
      <line x1="8" y1="20" x2="20" y2="20" stroke={color} strokeWidth="2" />
      <text x="30" y="25" fontSize="10" fontWeight="700" fill={color}>ISO</text>
    </svg>,
    <svg key="3" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <path d="M 12 4 L 24 14 L 20 32 L 4 32 L 0 14 Z" fill="none" stroke={color} strokeWidth="2" transform="translate(4,0)" />
      <text x="34" y="25" fontSize="10" fontWeight="700" fill={color}>BOVAG</text>
    </svg>,
    <svg key="4" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <circle cx="14" cy="20" r="10" fill={color} opacity="0.15" />
      <circle cx="14" cy="20" r="10" fill="none" stroke={color} strokeWidth="2" />
      <text x="9" y="24" fontSize="10" fontWeight="700" fill={color}>NL</text>
      <text x="28" y="25" fontSize="11" fontWeight="700" fill={color}>STAR</text>
    </svg>,
    <svg key="5" width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <path d="M 4 30 L 14 8 L 24 30 Z" fill="none" stroke={color} strokeWidth="2" />
      <text x="30" y="25" fontSize="10" fontWeight="700" fill={color}>ECO</text>
    </svg>,
  ]
  return (
    <div
      className="flex items-center justify-center px-4 py-3 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 transition-colors"
      aria-label={label}
    >
      {shapes[index % shapes.length]}
    </div>
  )
}

export default function FooterV9PartnerLogos(p: FooterProps) {
  const year = new Date().getFullYear()
  const tint = softTint(p.primaryColor, 6)
  const partners = ['Keurmerk Vakman', 'VAK Garant', 'ISO 9001', 'BOVAG Pro', 'NL Star', 'Eco Plus']
  return (
    <footer className="bg-neutral-50">
      <div className="px-6 md:px-12 py-10 border-b border-neutral-200" style={{ background: tint }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Aangesloten bij & gecertificeerd door
          </p>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {partners.map((label, i) => (
              <PartnerLogo key={label} color={p.primaryColor} index={i} label={label} />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-bold text-neutral-900" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <p className="text-neutral-600 mt-2 leading-relaxed">
            Lokaal vakwerk in {p.city ?? 'de regio'} met gecertificeerd vakmanschap.
          </p>
          {p.kvk && <p className="text-xs text-neutral-500 mt-3">KvK {p.kvk}</p>}
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Bereikbaar</p>
          <ul className="space-y-1.5 text-neutral-700">
            {p.phone && (
              <li>
                <a href={telHref(p.phone)} className="hover:underline">{p.phone}</a>
              </li>
            )}
            {p.whatsapp && (
              <li>
                <a href={waHref(p.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp
                </a>
              </li>
            )}
            {p.email && (
              <li>
                <a href={mailHref(p.email)} className="hover:underline break-all">{p.email}</a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Bezoek</p>
          {p.address ? (
            <p className="text-neutral-700">
              {p.address}
              <br />
              {p.postcode} {p.city}
            </p>
          ) : (
            <p className="text-neutral-500">Op afspraak</p>
          )}
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-2">
            © {year} {p.businessName}
            <span aria-hidden className="text-neutral-300">·</span>
            <LegalLinks tone="light" />
          </span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
