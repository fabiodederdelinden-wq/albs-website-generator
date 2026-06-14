import { SITE } from './site-config'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center py-24">
        <p
          className="font-display font-black text-7xl md:text-8xl"
          style={{ color: SITE.primaryColor }}
        >
          404
        </p>
        <h1 className="font-display font-bold text-xl md:text-2xl text-[var(--color-ink-950)] mt-4">
          Deze pagina bestaat niet
        </h1>
        <p className="text-sm text-[var(--color-ink-500)] mt-3 leading-relaxed">
          Het adres klopt niet of de pagina is verplaatst. Geen probleem, we helpen je direct
          verder.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href="/"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: SITE.primaryColor }}
          >
            Naar de homepage
          </a>
          {SITE.phone && (
            <a
              href={`tel:${SITE.phone.replace(/\s/g, '')}`}
              className="px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--color-ink-200)] text-[var(--color-ink-700)] hover:bg-[var(--color-ink-100)] transition-colors"
            >
              Bel {SITE.name}
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
