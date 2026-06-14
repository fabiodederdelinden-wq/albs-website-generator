import { NAV_ITEMS, telHref, type HeaderProps } from './types'

export default function HeaderV2StickyBlur(p: HeaderProps) {
  return (
    <header className="v2-header sticky top-0 z-40">
      <style>{`
        .v2-header {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: background .3s ease, box-shadow .3s ease;
        }
        @supports (animation-timeline: scroll()) {
          .v2-header {
            animation: v2-scroll-shadow linear both;
            animation-timeline: scroll();
            animation-range: 0 120px;
          }
          @keyframes v2-scroll-shadow {
            from { box-shadow: 0 0 0 rgba(0,0,0,0); background: rgba(255,255,255,.72); }
            to { box-shadow: 0 8px 24px rgba(0,0,0,.08); background: rgba(255,255,255,.92); }
          }
        }
        .v2-pill {
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .v2-pill:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,.12); }
        @media (prefers-reduced-motion: reduce) {
          .v2-header, .v2-pill { animation: none !important; transition: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold text-lg tracking-tight" style={{ color: p.primaryColor }}>
          {p.businessName}
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {(p.navItems ?? NAV_ITEMS).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={telHref(p.phone)}
          className="v2-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: p.primaryColor }}
        >
          <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span>Bel ons</span>
        </a>
      </div>
    </header>
  )
}
