import { NAV_ITEMS, telHref, waHref, type HeaderProps } from './types'

export default function HeaderV10LogoCenter(p: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <style>{`
        @keyframes v10-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .v10-anim { animation: v10-fade-up .55s cubic-bezier(.16,1,.3,1) both; }
        .v10-pill {
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .v10-pill:hover {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          transform: translateY(-1px);
        }
        @media (prefers-reduced-motion: reduce) {
          .v10-anim, .v10-pill { animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div
        className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex flex-col items-center gap-3"
        style={{ ['--accent' as string]: p.primaryColor } as React.CSSProperties}
      >
        {/* Top row: tel left, logo center, whatsapp right */}
        <div className="w-full grid grid-cols-3 items-center gap-3">
          <div className="flex justify-start">
            <a
              href={telHref(p.phone)}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-neutral-800 hover:opacity-80 transition-opacity"
              aria-label={`Bel ${p.phone}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-white" style={{ background: p.primaryColor }}>
                <svg aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span className="hidden md:inline">{p.phone}</span>
            </a>
          </div>

          <a
            href="#top"
            className="v10-anim font-bold text-lg md:text-2xl tracking-tight text-center"
            style={{ color: p.primaryColor }}
          >
            {p.businessName}
          </a>

          <div className="flex justify-end">
            <a
              href={waHref(p.whatsapp)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-neutral-800 hover:opacity-80 transition-opacity"
              aria-label="WhatsApp ons"
            >
              <span className="hidden md:inline">WhatsApp</span>
              <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-white bg-[#25D366]">
                <svg aria-hidden="true" className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom row: nav pills centered */}
        <nav className="flex items-center gap-2 flex-wrap justify-center">
          {(p.navItems ?? NAV_ITEMS).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="v10-pill px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium text-neutral-700 border border-neutral-300"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
