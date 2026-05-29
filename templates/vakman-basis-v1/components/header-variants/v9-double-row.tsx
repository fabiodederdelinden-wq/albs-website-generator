import { NAV_ITEMS, telHref, waHref, type HeaderProps } from './types'

export default function HeaderV9DoubleRow(p: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <style>{`
        @keyframes v9-underline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .v9-link {
          position: relative;
        }
        .v9-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -6px;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .25s ease;
        }
        .v9-link:hover::after { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .v9-link::after { transition: none !important; }
        }
      `}</style>

      {/* Row 1: tel left + logo center + whatsapp right */}
      <div className="border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 grid grid-cols-3 items-center gap-3">
          <div className="hidden md:flex justify-start">
            <a
              href={telHref(p.phone)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:opacity-80 transition-opacity"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white" style={{ background: p.primaryColor }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500">Bel direct</span>
                <span>{p.phone}</span>
              </span>
            </a>
          </div>

          <div className="col-span-3 md:col-span-1 flex justify-center">
            <a href="#top" className="font-bold text-xl md:text-2xl tracking-tight text-center" style={{ color: p.primaryColor }}>
              {p.businessName}
            </a>
          </div>

          <div className="hidden md:flex justify-end">
            <a
              href={waHref(p.whatsapp)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:opacity-80 transition-opacity"
            >
              <span className="flex flex-col leading-tight text-right">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500">App ons</span>
                <span>WhatsApp</span>
              </span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white bg-[#25D366]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: centered nav */}
      <div
        className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex justify-center"
        style={{ ['--accent' as string]: p.primaryColor } as React.CSSProperties}
      >
        <nav className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="v9-link text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
