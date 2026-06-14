import { telHref, mailHref, type FooterProps } from './types'
import LegalLinks from './legal-links'

export default function FooterV1MinimalOneCol(p: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-neutral-200 py-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-neutral-900">{p.businessName}</span>
          {p.kvk && (
            <>
              <span className="text-neutral-300">·</span>
              <span>KvK {p.kvk}</span>
            </>
          )}
          {p.address ? (
            <>
              <span className="text-neutral-300">·</span>
              <span>
                {p.address}
                {(p.postcode || p.city) && `, ${[p.postcode, p.city].filter(Boolean).join(' ')}`}
              </span>
            </>
          ) : (
            p.city && (
              <>
                <span className="text-neutral-300">·</span>
                <span>{p.city}</span>
              </>
            )
          )}
          {p.phone && (
            <>
              <span className="text-neutral-300">·</span>
              <a href={telHref(p.phone)} className="hover:text-neutral-900 transition-colors">
                {p.phone}
              </a>
            </>
          )}
          {p.email && (
            <>
              <span className="text-neutral-300">·</span>
              <a href={mailHref(p.email)} className="hover:text-neutral-900 transition-colors">
                {p.email}
              </a>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span>
            © {year} {p.businessName}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
          <span className="text-neutral-300">·</span>
          <LegalLinks tone="light" />
        </div>
      </div>
    </footer>
  )
}
