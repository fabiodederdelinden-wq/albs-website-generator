'use client'

import { SITE } from './site-config'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center py-24">
        <h1 className="font-display font-bold text-xl md:text-2xl text-[var(--color-ink-950)]">
          Er ging iets mis
        </h1>
        <p className="text-sm text-[var(--color-ink-500)] mt-3 leading-relaxed">
          Een tijdelijke storing. Probeer het opnieuw, of bel ons als het blijft gebeuren.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: SITE.primaryColor }}
          >
            Probeer opnieuw
          </button>
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
