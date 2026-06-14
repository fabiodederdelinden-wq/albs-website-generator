import type { ReactNode } from 'react'
import HeaderPicker from './header-variants/picker'
import FooterPicker from './footer-variants/picker'
import { SITE } from '../app/site-config'

/**
 * Gedeelde schil voor juridische pagina's (/privacy, /cookies).
 * Zelfde header + footer als de rest van de site, content in huisstijl-typografie.
 */
export default function LegalPageShell({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <>
      <HeaderPicker
        variantId={SITE.headerVariant}
        businessName={SITE.name}
        phone={SITE.phone}
        whatsapp={SITE.whatsapp}
        primaryColor={SITE.primaryColor}
        services={SITE.services}
        niche={SITE.niche}
      />
      <main className="bg-white">
        <section className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <a
            href="/"
            className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] transition-colors"
          >
            ← Terug naar home
          </a>
          <h1 className="font-display font-black text-3xl md:text-5xl text-[var(--color-ink-950)] mt-6">
            {title}
          </h1>
          <p className="text-sm md:text-base text-[var(--color-ink-500)] mt-4 leading-relaxed max-w-xl">
            {intro}
          </p>
          <div
            className="h-1 w-16 rounded-full mt-8 mb-12"
            style={{ background: SITE.primaryColor }}
            aria-hidden
          />
          <div className="legal-prose space-y-10">{children}</div>
        </section>
      </main>
      <FooterPicker
        variantId={SITE.footerVariant}
        businessName={SITE.name}
        kvk={SITE.kvk}
        primaryColor={SITE.primaryColor}
        accentColor={SITE.accentColor}
        phone={SITE.phone}
        whatsapp={SITE.whatsapp}
        email={SITE.email}
        address={SITE.address}
        city={SITE.city}
        postcode={SITE.postcode}
        services={SITE.services}
        ownerName={SITE.ownerName}
        btw={SITE.btw}
      />
    </>
  )
}

/** Sectie-blok met consistente kop-stijl voor juridische tekst. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-bold text-lg md:text-xl text-[var(--color-ink-950)] mb-3">
        {heading}
      </h2>
      <div className="text-sm text-[var(--color-ink-700)] leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
