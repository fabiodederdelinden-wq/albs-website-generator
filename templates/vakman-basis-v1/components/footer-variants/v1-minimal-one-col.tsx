import type { FooterProps } from './types'

export default function FooterV1MinimalOneCol(p: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-neutral-200 py-6 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-neutral-600">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-neutral-900">{p.businessName}</span>
          {p.kvk && (
            <>
              <span className="text-neutral-300">·</span>
              <span>KvK {p.kvk}</span>
            </>
          )}
          {p.city && (
            <>
              <span className="text-neutral-300">·</span>
              <span>{p.city}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
          <span>
            © {year} {p.businessName}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            Site door <span style={{ color: p.primaryColor }} className="font-semibold">ALBS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
