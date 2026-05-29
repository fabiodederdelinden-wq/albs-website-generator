import type { FooterProps } from './types'
import { telHref, mailHref, softTint } from './types'

export default function FooterV10SignatureHand(p: FooterProps) {
  const year = new Date().getFullYear()
  const signatory = p.ownerName ?? p.businessName
  const tint = softTint(p.primaryColor, 6)
  const initials = signatory
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="px-6 md:px-12 py-14" style={{ background: tint }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ background: p.primaryColor }}
            >
              {initials || 'A'}
            </div>
            <p className="font-bold text-neutral-900 text-lg">{p.businessName}</p>
          </div>
          <p
            className="text-2xl md:text-3xl text-neutral-800 leading-relaxed"
            style={{
              fontFamily:
                '"Brush Script MT", "Snell Roundhand", "Apple Chancery", cursive',
              fontStyle: 'italic',
            }}
          >
            Gemaakt met passie door {signatory}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="block h-px w-12 bg-neutral-300" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill={p.primaryColor} aria-hidden="true">
              <path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" opacity="0.8" />
            </svg>
            <span className="block h-px w-12 bg-neutral-300" />
          </div>
          <p className="mt-6 text-sm text-neutral-600 max-w-md mx-auto">
            Bedankt voor je bezoek. Laten we kennismaken, een vraag stellen mag altijd.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-neutral-700">
            {p.phone && (
              <a href={telHref(p.phone)} className="hover:underline font-medium">
                {p.phone}
              </a>
            )}
            {p.email && (
              <a href={mailHref(p.email)} className="hover:underline font-medium break-all">
                {p.email}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="py-4 px-6 md:px-12 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
          <span>
            © {year} {p.businessName}
            {p.kvk && <span> · KvK {p.kvk}</span>}
          </span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
