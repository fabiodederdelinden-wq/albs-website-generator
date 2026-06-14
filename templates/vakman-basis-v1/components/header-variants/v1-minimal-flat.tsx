import { NAV_ITEMS, telHref, type HeaderProps } from './types'

export default function HeaderV1MinimalFlat(p: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <style>{`
        @keyframes v1-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .v1-fade { animation: v1-fade-in .5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .v1-fade { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div className="v1-fade max-w-6xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold text-base md:text-lg tracking-tight" style={{ color: p.primaryColor }}>
          {p.businessName}
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {(p.navItems ?? NAV_ITEMS).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={telHref(p.phone)}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:opacity-80 transition-opacity"
        >
          <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span className="hidden sm:inline">{p.phone}</span>
        </a>
      </div>
    </header>
  )
}
