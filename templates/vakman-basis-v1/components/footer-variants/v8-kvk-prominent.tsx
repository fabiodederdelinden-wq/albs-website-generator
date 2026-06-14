import type { FooterProps } from './types'
import { telHref, mailHref } from './types'
import LegalLinks from './legal-links'

export default function FooterV8KvkProminent(p: FooterProps) {
  const year = new Date().getFullYear()
  const btw = p.btw || null
  return (
    <footer className="bg-white border-t-2 border-neutral-300 px-6 md:px-12 py-12 font-serif">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Bedrijfsgegevens
          </p>
          <p className="font-bold text-2xl text-neutral-900 mt-2" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {p.kvk && (
              <div className="border-l-2 pl-3" style={{ borderColor: p.primaryColor }}>
                <dt className="text-xs uppercase tracking-wider text-neutral-500">KvK-nummer</dt>
                <dd className="font-semibold text-neutral-900 mt-0.5">{p.kvk}</dd>
              </div>
            )}
            {btw && (
              <div className="border-l-2 pl-3" style={{ borderColor: p.primaryColor }}>
                <dt className="text-xs uppercase tracking-wider text-neutral-500">BTW-nummer</dt>
                <dd className="font-semibold text-neutral-900 mt-0.5">{btw}</dd>
              </div>
            )}
            {p.address && (
              <div className="border-l-2 pl-3" style={{ borderColor: p.primaryColor }}>
                <dt className="text-xs uppercase tracking-wider text-neutral-500">Vestigingsadres</dt>
                <dd className="font-semibold text-neutral-900 mt-0.5">
                  {p.address}
                  <br />
                  {p.postcode} {p.city}
                </dd>
              </div>
            )}
            {p.phone && (
              <div className="border-l-2 pl-3" style={{ borderColor: p.primaryColor }}>
                <dt className="text-xs uppercase tracking-wider text-neutral-500">Telefoon</dt>
                <dd className="font-semibold text-neutral-900 mt-0.5">
                  <a href={telHref(p.phone)} className="hover:underline">
                    {p.phone}
                  </a>
                </dd>
              </div>
            )}
            {p.email && (
              <div className="border-l-2 pl-3" style={{ borderColor: p.primaryColor }}>
                <dt className="text-xs uppercase tracking-wider text-neutral-500">Email</dt>
                <dd className="font-semibold text-neutral-900 mt-0.5">
                  <a href={mailHref(p.email)} className="hover:underline break-all">
                    {p.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="md:border-l md:border-neutral-200 md:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Algemeen
          </p>
          <p className="text-sm text-neutral-700 mt-3 leading-relaxed">
            Op alle werkzaamheden zijn onze algemene voorwaarden van toepassing.
            Op verzoek toezenden wij u graag een afschrift.
          </p>
          <div className="mt-6 pt-6 border-t border-neutral-200 text-xs text-neutral-500 space-y-1">
            <p>© {year} {p.businessName}</p>
            <p>Alle rechten voorbehouden</p>
            <p>
              <LegalLinks tone="light" />
            </p>
            <p className="pt-2">
              Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
