import { NAV_ITEMS, telHref, type HeaderProps } from './types'

export default function HeaderV8TopBarInfo(p: HeaderProps) {
  return (
    <header className="w-full bg-white">
      <style>{`
        @keyframes v8-dot {
          0%, 100% { transform: scale(1); opacity: .9; }
          50% { transform: scale(1.4); opacity: .5; }
        }
        .v8-dot { animation: v8-dot 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v8-dot { animation: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Top info bar */}
      <div className="text-white text-[11px] md:text-xs" style={{ background: p.primaryColor }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-8 flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-4 md:gap-6 truncate">
            <span className="inline-flex items-center gap-1.5">
              <span className="v8-dot inline-block w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-medium">Ma-Vr 08:00 - 18:00</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Utrecht en omstreken</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>KvK 12345678</span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3 h-3 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>4.9 / 5 — 47 reviews</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="font-bold text-lg md:text-xl" style={{ color: p.primaryColor }}>
            {p.businessName}
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={telHref(p.phone)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold text-white"
            style={{ background: p.primaryColor }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span className="hidden sm:inline">{p.phone}</span>
            <span className="sm:hidden">Bel</span>
          </a>
        </div>
      </div>
    </header>
  )
}
