import type { FooterProps } from './types'
import { telHref, waHref, mailHref, softTint } from './types'
import LegalLinks from './legal-links'

export default function FooterV3WithMap(p: FooterProps) {
  const year = new Date().getFullYear()
  const tint = softTint(p.primaryColor, 18)
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div
          className="relative rounded-2xl overflow-hidden h-64 md:h-full min-h-[260px] border border-neutral-200"
          style={{
            background: `linear-gradient(135deg, ${tint} 0%, #f4f4f5 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div
            className="absolute opacity-30"
            style={{
              left: '20%',
              top: '40%',
              width: '60%',
              height: '8px',
              background: '#fff',
              borderRadius: 999,
              transform: 'rotate(-12deg)',
            }}
          />
          <div
            className="absolute opacity-30"
            style={{
              left: '30%',
              top: '55%',
              width: '50%',
              height: '6px',
              background: '#fff',
              borderRadius: 999,
              transform: 'rotate(20deg)',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: p.primaryColor }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2C8 2 5 5 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>
            <div className="mt-3 px-3 py-1.5 bg-white rounded-md shadow-md text-xs font-semibold text-neutral-800">
              {p.city ?? 'Onze locatie'}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-2xl text-neutral-900" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <p className="text-sm text-neutral-600 mt-2">Vakman uit {p.city ?? 'de regio'}</p>
          <div className="mt-6 space-y-3 text-sm text-neutral-700">
            {p.address && (
              <div className="flex items-start gap-3">
                <span className="text-neutral-400 mt-0.5">📍</span>
                <span>
                  {p.address}
                  <br />
                  {p.postcode} {p.city}
                </span>
              </div>
            )}
            {p.phone && (
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">📞</span>
                <a href={telHref(p.phone)} className="font-semibold hover:underline">
                  {p.phone}
                </a>
              </div>
            )}
            {p.email && (
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">✉️</span>
                <a href={mailHref(p.email)} className="hover:underline break-all">
                  {p.email}
                </a>
              </div>
            )}
            {p.whatsapp && (
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">💬</span>
                <a
                  href={waHref(p.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
          <span>
            © {year} {p.businessName} {p.kvk && <span className="text-neutral-400">· KvK {p.kvk}</span>}{' '}
            <span className="text-neutral-400">·</span> <LegalLinks tone="light" />
          </span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
