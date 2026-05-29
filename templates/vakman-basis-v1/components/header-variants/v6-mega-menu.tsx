import { NAV_ITEMS, telHref, type HeaderProps } from './types'

const DEFAULT_SERVICES = ['CV-installatie', 'Sanitair', 'Lekkages', 'Ontstopping', 'Boiler-onderhoud', 'Renovatie']

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'CV-installatie': 'Nieuwe CV-ketel of vervanging, A-label garantie.',
  'Sanitair': 'Toilet, kraan en douche, nette afwerking.',
  'Lekkages': 'Snel opsporen en verhelpen, 24/7 spoedhulp.',
  'Ontstopping': 'Verstopte afvoer? Binnen 2 uur ter plaatse.',
  'Boiler-onderhoud': 'Jaarlijkse keuring en service, vaste prijs.',
  'Renovatie': 'Badkamer en keuken van A tot Z, één aanspreekpunt.',
}

function ServiceIcon({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded text-xs font-bold text-white" style={{ background: 'currentColor' }}>
      <span className="text-white">{initial}</span>
    </span>
  )
}

export default function HeaderV6MegaMenu(p: HeaderProps) {
  const services = (p.services && p.services.length > 0 ? p.services : DEFAULT_SERVICES).slice(0, 6)

  return (
    <header className="w-full bg-white border-b border-neutral-200 relative z-30">
      <style>{`
        .v6-trigger { position: relative; }
        .v6-mega {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-6px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .v6-trigger:hover > .v6-mega,
        .v6-trigger:focus-within > .v6-mega {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .v6-chevron { transition: transform .25s ease; }
        .v6-trigger:hover .v6-chevron { transform: rotate(180deg); }
        .v6-card { transition: background .2s ease, transform .2s ease; }
        .v6-card:hover { background: #f5f5f5; transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .v6-mega, .v6-chevron, .v6-card { transition: none !important; transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold text-lg" style={{ color: p.primaryColor }}>
          {p.businessName}
        </a>

        <nav className="hidden md:flex items-center gap-1">
          <div className="v6-trigger">
            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm text-neutral-700 rounded hover:bg-neutral-100 transition-colors"
              aria-haspopup="true"
            >
              Diensten
              <svg className="v6-chevron w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="v6-mega absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[680px] bg-white border border-neutral-200 rounded-xl shadow-2xl p-5">
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <a
                    key={service}
                    href={`#diensten-${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="v6-card flex items-start gap-3 p-3 rounded-lg"
                  >
                    <span style={{ color: p.primaryColor }}>
                      <ServiceIcon name={service} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-sm text-neutral-900">{service}</span>
                      <span className="block text-xs text-neutral-600 mt-0.5">
                        {SERVICE_DESCRIPTIONS[service] ?? `Vakwerk in ${service.toLowerCase()}, vaste prijs.`}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {NAV_ITEMS.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-neutral-700 rounded hover:bg-neutral-100 transition-colors"
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
        </a>
      </div>
    </header>
  )
}
