import { StarsRating, formatKvk, type TrustProps } from './types'

export default function TrustV10SingleStatLg(p: TrustProps) {
  const kvkLabel = formatKvk(p.kvk)
  const clients = p.clientsCount ?? 1200
  const years = p.yearsActive ?? 18

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 bg-white overflow-hidden">
      <style>{`
        @keyframes trust-v10-scale {
          0% { opacity: 0; transform: scale(.85); letter-spacing: -0.04em; }
          100% { opacity: 1; transform: scale(1); letter-spacing: -0.05em; }
        }
        @keyframes trust-v10-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .trust-v10-num { animation: trust-v10-scale 1.4s cubic-bezier(.16,1,.3,1) both; }
        .trust-v10-meta { animation: trust-v10-fade .8s cubic-bezier(.16,1,.3,1) .6s both; }
        .trust-v10-line { animation: trust-v10-fade .8s cubic-bezier(.16,1,.3,1) .4s both; }
        @media (prefers-reduced-motion: reduce) {
          .trust-v10-num, .trust-v10-meta, .trust-v10-line { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${p.primaryColor} 0%, transparent 60%)`,
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="trust-v10-line text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-6">
          · KLUSSEN VOLTOOID
        </p>
        <p
          className="trust-v10-num font-display font-black leading-none tracking-tighter"
          style={{
            color: p.primaryColor,
            fontSize: 'clamp(7rem, 22vw, 18rem)',
          }}
        >
          {clients}+
        </p>
        <div
          className="trust-v10-line mx-auto mt-8 h-px w-24"
          style={{ background: p.accentColor ?? '#2C2C2C' }}
          aria-hidden
        />
        <p className="trust-v10-meta mt-8 font-display text-xl md:text-2xl tracking-tight text-[var(--color-ink-800)] max-w-2xl mx-auto leading-snug">
          In {years} jaar tijd. Van spoed-lekkages om 2u 's nachts tot complete installaties. Elke klant komt terug.
        </p>
        <div className="trust-v10-meta mt-10 inline-flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--color-ink-200)] bg-[var(--color-ink-100)]">
          <StarsRating rating={p.reviewRating} color={p.primaryColor} size={18} />
          <span className="font-display font-bold text-base">{p.reviewRating.toFixed(1)}</span>
          <span className="text-sm text-[var(--color-ink-500)]">·</span>
          <span className="text-sm text-[var(--color-ink-600)]">{p.reviewCount} reviews</span>
          {kvkLabel && (
            <>
              <span className="text-sm text-[var(--color-ink-500)]">·</span>
              <span className="text-xs font-mono tracking-wider text-[var(--color-ink-600)]">{kvkLabel}</span>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
