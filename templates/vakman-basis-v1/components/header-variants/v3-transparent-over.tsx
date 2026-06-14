import { NAV_ITEMS, telHref, type HeaderProps } from './types'

export default function HeaderV3TransparentOver(p: HeaderProps) {
  return (
    <header className="absolute top-0 inset-x-0 z-40">
      <style>{`
        @keyframes v3-slide-down { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .v3-anim { animation: v3-slide-down .7s cubic-bezier(.16,1,.3,1) both; }
        .v3-cta {
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .v3-cta:hover { transform: scale(1.04); }
        .v3-link {
          position: relative;
        }
        .v3-link::after {
          content: '';
          position: absolute;
          left: 12px; right: 12px; bottom: 6px;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s ease;
        }
        .v3-link:hover::after { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .v3-anim, .v3-cta, .v3-link::after { animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div className="v3-anim max-w-6xl mx-auto px-4 md:px-8 pt-6 flex items-center justify-between text-white">
        <a href="#top" className="font-bold text-xl md:text-2xl tracking-tight text-white drop-shadow">
          {p.businessName}
        </a>

        <nav className="hidden md:flex items-center gap-2">
          {(p.navItems ?? NAV_ITEMS).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="v3-link px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={telHref(p.phone)}
          className="v3-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg"
          style={{ background: p.primaryColor, boxShadow: `0 8px 20px ${p.primaryColor}55` }}
        >
          <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span>{p.phone}</span>
        </a>
      </div>
    </header>
  )
}
