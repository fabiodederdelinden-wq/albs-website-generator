import { NAV_ITEMS, telHref, waHref, type HeaderProps } from './types'

export default function HeaderV7CtaProminent(p: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <style>{`
        @keyframes v7-pulse {
          0%, 100% { box-shadow: 0 4px 14px rgba(0,0,0,.12), 0 0 0 0 var(--ring); }
          50% { box-shadow: 0 4px 14px rgba(0,0,0,.12), 0 0 0 8px transparent; }
        }
        .v7-tel {
          background: linear-gradient(135deg, var(--c1), var(--c2));
          animation: v7-pulse 2.4s ease-in-out infinite;
          transition: transform .2s ease;
        }
        .v7-tel:hover { transform: translateY(-1px) scale(1.02); }
        .v7-wa {
          background: linear-gradient(135deg, #25D366, #128C7E);
          transition: transform .2s ease, box-shadow .2s ease;
          box-shadow: 0 4px 14px rgba(18,140,126,.3);
        }
        .v7-wa:hover { transform: translateY(-1px) scale(1.02); box-shadow: 0 8px 22px rgba(18,140,126,.4); }
        @media (prefers-reduced-motion: reduce) {
          .v7-tel, .v7-wa { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3">
        <a href="#top" className="font-bold text-lg md:text-xl flex-shrink-0" style={{ color: p.primaryColor }}>
          {p.businessName}
        </a>

        <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
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

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={telHref(p.phone)}
            className="v7-tel inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-lg text-sm font-bold text-white"
            style={{
              ['--c1' as string]: p.primaryColor,
              ['--c2' as string]: p.primaryColor,
              ['--ring' as string]: `${p.primaryColor}55`,
            } as React.CSSProperties}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-90">Bel direct</span>
              <span className="text-sm">{p.phone}</span>
            </span>
          </a>

          <a
            href={waHref(p.whatsapp)}
            target="_blank"
            rel="noopener"
            className="v7-wa inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-lg text-sm font-bold text-white"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-90">App ons</span>
              <span className="text-sm hidden sm:inline">WhatsApp</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
