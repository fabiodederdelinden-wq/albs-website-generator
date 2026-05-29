import { NAV_ITEMS, telHref, type HeaderProps } from './types'

export default function HeaderV4SideTabs(p: HeaderProps) {
  return (
    <>
      <style>{`
        @keyframes v4-fade { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        .v4-tab { animation: v4-fade .5s ease-out both; }
        .v4-tab:nth-child(1) { animation-delay: .05s; }
        .v4-tab:nth-child(2) { animation-delay: .12s; }
        .v4-tab:nth-child(3) { animation-delay: .19s; }
        .v4-tab:nth-child(4) { animation-delay: .26s; }
        .v4-tab {
          position: relative;
          transition: color .2s ease;
        }
        .v4-tab::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          width: 3px; height: 0;
          background: var(--accent);
          transform: translateY(-50%);
          transition: height .25s ease;
        }
        .v4-tab:hover::before { height: 60%; }
        @media (prefers-reduced-motion: reduce) {
          .v4-tab, .v4-tab::before { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Mobile / small: classic top header */}
      <header className="md:hidden w-full bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold text-base" style={{ color: p.primaryColor }}>
            {p.businessName}
          </a>
          <a href={telHref(p.phone)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold text-white" style={{ background: p.primaryColor }}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span>{p.phone}</span>
          </a>
        </div>
      </header>

      {/* Desktop: side bar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-[60px] z-40 flex-col items-center justify-between py-6 bg-white border-r border-neutral-200"
        style={{ ['--accent' as string]: p.primaryColor } as React.CSSProperties}
      >
        <a href="#top" className="font-bold text-xs tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: p.primaryColor }}>
          {p.businessName.toUpperCase()}
        </a>

        <nav className="flex flex-col items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="v4-tab text-xs font-medium tracking-widest text-neutral-700 hover:text-neutral-950 pl-3 pr-2 py-3"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {item.label.toUpperCase()}
            </a>
          ))}
        </nav>

        <a
          href={telHref(p.phone)}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white shadow"
          style={{ background: p.primaryColor }}
          aria-label={`Bel ${p.phone}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        </a>
      </aside>
    </>
  )
}
