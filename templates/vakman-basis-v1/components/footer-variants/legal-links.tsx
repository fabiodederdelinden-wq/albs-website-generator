/**
 * Juridische links voor in elke footer-variant. Subtiel, in de micro-stijl van de
 * bestaande KvK/copyright-regel. tone bepaalt of de kleuren bij een donkere of
 * lichte footer-achtergrond passen.
 */
export default function LegalLinks({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const base =
    tone === 'dark'
      ? 'text-[var(--color-ink-400)] hover:text-white'
      : 'text-neutral-500 hover:text-neutral-900'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <a href="/privacy" className={`${base} underline-offset-2 hover:underline transition-colors`}>
        Privacy
      </a>
      <span aria-hidden className={tone === 'dark' ? 'text-[var(--color-ink-700)]' : 'text-neutral-300'}>
        ·
      </span>
      <a href="/cookies" className={`${base} underline-offset-2 hover:underline transition-colors`}>
        Cookies
      </a>
    </span>
  )
}
