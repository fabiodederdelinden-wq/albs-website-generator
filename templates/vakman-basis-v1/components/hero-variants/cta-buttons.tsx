interface CtaButtonsProps {
  phone: string
  whatsapp?: string
  primaryColor: string
  accentColor: string
  variant?: 'solid' | 'glass' | 'inverted'
  align?: 'left' | 'center'
}

export function CtaButtons({ phone, whatsapp, primaryColor, accentColor, variant = 'solid', align = 'center' }: CtaButtonsProps) {
  const wrapJustify = align === 'center' ? 'justify-center' : 'justify-start'
  const phoneStyle =
    variant === 'glass'
      ? { background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(14px)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }
      : variant === 'inverted'
        ? { background: '#fff', color: primaryColor }
        : { background: primaryColor, color: '#fff' }
  const waStyle =
    variant === 'glass'
      ? { background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(14px)', color: '#fff', border: `2px solid ${accentColor}` }
      : variant === 'inverted'
        ? { background: 'transparent', color: '#fff', border: `2px solid #fff` }
        : { background: 'transparent', color: accentColor, border: `2px solid ${accentColor}` }
  return (
    <div className={`flex flex-wrap items-center gap-3 ${wrapJustify}`}>
      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="cta-pulse inline-flex items-center gap-3 px-6 py-4 rounded-lg font-bold text-base shadow-lg hover:scale-105 transition"
        style={phoneStyle}
      >
        <span className="text-xl">📞</span>
        <span className="leading-tight text-left">
          Bel nu
          <span className="block text-xs font-normal opacity-90">{phone}</span>
        </span>
      </a>
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
          className="inline-flex items-center gap-3 px-6 py-4 rounded-lg font-bold text-base shadow-lg hover:scale-105 transition"
          style={waStyle}
        >
          <span className="text-xl">💬</span>
          <span className="leading-tight text-left">
            WhatsApp
            <span className="block text-xs font-normal opacity-80">stuur bericht</span>
          </span>
        </a>
      )}
      <style>{`
        @keyframes cta-pulse-ring {
          0%, 100% { box-shadow: 0 8px 24px rgba(0,0,0,.18), 0 0 0 0 rgba(255,140,66,.4); }
          50% { box-shadow: 0 8px 24px rgba(0,0,0,.18), 0 0 0 14px rgba(255,140,66,0); }
        }
        .cta-pulse { animation: cta-pulse-ring 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cta-pulse { animation: none !important; } }
      `}</style>
    </div>
  )
}
