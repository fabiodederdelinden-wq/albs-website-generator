export interface FooterProps {
  businessName: string
  kvk: string
  primaryColor: string
}

export default function Footer({ businessName, kvk, primaryColor }: FooterProps) {
  return (
    <footer className="bg-[var(--color-ink-950)] text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-display font-black text-xl" style={{ color: primaryColor }}>
            {businessName.toUpperCase()}
          </p>
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)] mt-2">
            KvK {kvk} · {new Date().getFullYear()}
          </p>
        </div>
        <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
          Website door <span style={{ color: primaryColor }}>ALBS</span>
        </div>
      </div>
    </footer>
  )
}
