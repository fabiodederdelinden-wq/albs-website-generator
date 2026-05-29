import type { FooterProps } from './types'
import { telHref, waHref, mailHref, socialHrefs } from './types'

export default function FooterV5WithSocialLarge(p: FooterProps) {
  const year = new Date().getFullYear()
  const socials = socialHrefs(p.businessName)
  const icons: Array<{ key: string; href: string; label: string; svg: React.ReactNode }> = [
    {
      key: 'fb',
      href: socials.facebook,
      label: 'Facebook',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.5V4.2C16.3 4.1 15.4 4 14.4 4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3h2.5V21h3z" />
        </svg>
      ),
    },
    {
      key: 'ig',
      href: socials.instagram,
      label: 'Instagram',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: 'li',
      href: socials.linkedin,
      label: 'LinkedIn',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.56 0h4.37v2h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.27c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.63-2.41 3.32V22H7.78V8z" />
        </svg>
      ),
    },
    {
      key: 'g',
      href: socials.google,
      label: 'Google',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 11v3.2h5.3c-.2 1.4-1.6 4-5.3 4-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.7 4.1 14.6 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.6 8.6-8.8 0-.6-.1-1-.2-1.5H12z" />
        </svg>
      ),
    },
    {
      key: 'wa',
      href: waHref(p.whatsapp),
      label: 'WhatsApp',
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 3.5A10 10 0 0 0 3.7 16.8L2 22l5.4-1.7A10 10 0 1 0 20.5 3.5zM12 20.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.2 1 1-3.1-.2-.3a8.2 8.2 0 1 1 7.2 3.8zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.3-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.3c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.6 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.2-.5-.4z" />
        </svg>
      ),
    },
  ]
  return (
    <footer className="bg-neutral-900 text-neutral-300 px-6 md:px-12 py-14">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Volg ons
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
          Blijf {p.businessName} volgen
        </h3>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {icons.map((i) => (
            <a
              key={i.key}
              href={i.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={i.label}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-neutral-800 hover:scale-110 transition-transform"
              style={{ color: '#fff' }}
            >
              <span style={{ color: p.primaryColor }}>{i.svg}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-800 pt-10">
        <div>
          <p className="font-bold text-white" style={{ color: p.primaryColor }}>
            {p.businessName}
          </p>
          <p className="text-sm text-neutral-400 mt-2">
            {p.address}
            {p.address && (p.postcode || p.city) && <br />}
            {p.postcode} {p.city}
          </p>
          {p.kvk && <p className="text-xs text-neutral-500 mt-3">KvK {p.kvk}</p>}
        </div>
        <div className="md:text-right">
          <p className="font-semibold text-white text-sm">Direct contact</p>
          <div className="mt-2 space-y-1 text-sm">
            {p.phone && (
              <div>
                <a href={telHref(p.phone)} className="hover:text-white">
                  {p.phone}
                </a>
              </div>
            )}
            {p.email && (
              <div>
                <a href={mailHref(p.email)} className="hover:text-white break-all">
                  {p.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-neutral-500">
        <span>© {year} {p.businessName}</span>
        <span>
          Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
        </span>
      </div>
    </footer>
  )
}
