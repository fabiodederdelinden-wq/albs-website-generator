'use client'

import { useEffect, useState } from 'react'
import { NAV_ITEMS, telHref, waHref, type HeaderProps } from './types'

export default function HeaderV5DrawerMobile(p: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="w-full bg-white border-b border-neutral-200 relative z-50">
      <style>{`
        @keyframes v5-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes v5-drawer-in { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .v5-overlay { animation: v5-overlay-in .25s ease-out both; }
        .v5-drawer { animation: v5-drawer-in .35s cubic-bezier(.16,1,.3,1) both; }
        .v5-link {
          opacity: 0;
          animation: v5-drawer-in .4s cubic-bezier(.16,1,.3,1) both;
        }
        .v5-link:nth-child(1) { animation-delay: .08s; }
        .v5-link:nth-child(2) { animation-delay: .14s; }
        .v5-link:nth-child(3) { animation-delay: .20s; }
        .v5-link:nth-child(4) { animation-delay: .26s; }
        @media (prefers-reduced-motion: reduce) {
          .v5-overlay, .v5-drawer, .v5-link { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="font-semibold text-base" style={{ color: p.primaryColor }}>
          {p.businessName}
        </a>

        <div className="flex items-center gap-2">
          <a
            href={telHref(p.phone)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white"
            style={{ background: p.primaryColor }}
          >
            <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span className="hidden sm:inline">{p.phone}</span>
            <span className="sm:hidden">Bel</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menu openen"
            aria-expanded={open}
            className="inline-flex items-center justify-center w-10 h-10 rounded border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Menu sluiten"
            onClick={() => setOpen(false)}
            className="v5-overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="v5-drawer absolute inset-0 bg-white flex flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg" style={{ color: p.primaryColor }}>
                {p.businessName}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Sluiten"
                className="inline-flex items-center justify-center w-10 h-10 rounded border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {(p.navItems ?? NAV_ITEMS).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="v5-link block py-3 text-2xl font-semibold text-neutral-900 border-b border-neutral-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
              <a
                href={telHref(p.phone)}
                className="flex items-center justify-center gap-2 py-3 rounded font-semibold text-white"
                style={{ background: p.primaryColor }}
              >
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <span>Bel</span>
              </a>
              <a
                href={waHref(p.whatsapp)}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 py-3 rounded font-semibold text-white bg-[#25D366]"
              >
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
