import type { FooterProps } from './types'
import { telHref, waHref, darkTint } from './types'

export default function FooterV6BigCtaStack(p: FooterProps) {
  const year = new Date().getFullYear()
  const darker = darkTint(p.primaryColor, 70)
  return (
    <footer>
      <div
        className="px-6 md:px-12 py-16"
        style={{
          background: `linear-gradient(135deg, ${darker} 0%, #0a0a0a 100%)`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: p.primaryColor }}
          >
            Direct hulp nodig?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Klaar voor je klus?
          </h2>
          <p className="text-base md:text-lg text-neutral-300 mt-4">
            Bel direct of stuur een WhatsApp. Binnen een dag een antwoord.
          </p>
          {p.phone && (
            <a
              href={telHref(p.phone)}
              className="block mt-8 text-4xl md:text-6xl font-bold tracking-tight hover:opacity-90 transition-opacity"
              style={{ color: p.primaryColor }}
            >
              {p.phone}
            </a>
          )}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            {p.phone && (
              <a
                href={telHref(p.phone)}
                className="px-8 py-4 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                style={{ background: p.primaryColor }}
              >
                Bel nu
              </a>
            )}
            {p.whatsapp && (
              <a
                href={waHref(p.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg font-semibold border-2 text-white hover:bg-white/10 transition-colors"
                style={{ borderColor: p.primaryColor }}
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black text-neutral-400 px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-white">{p.businessName}</span>
            {p.kvk && <span>· KvK {p.kvk}</span>}
            {p.address && (
              <span>
                · {p.address}, {p.postcode} {p.city}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {year}</span>
            <span>·</span>
            <span>
              Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
