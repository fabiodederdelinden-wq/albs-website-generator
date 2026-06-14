'use client'

/**
 * Cookie-consent in huisstijl. Verschijnt ALLEEN op live sites mét Clarity-ID.
 * Preview-sites laden geen analytics en tonen dus geen banner (AVG: geen
 * niet-noodzakelijke cookies = geen toestemming nodig).
 * Weigeren is even makkelijk als accepteren (AP-richtlijn): zelfde rij, zelfde maat.
 */

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'albs-cookie-consent'
export const OPEN_SETTINGS_EVENT = 'albs-open-cookie-settings'

interface ConsentState {
  analytics: boolean
  ts: number
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    return typeof parsed.analytics === 'boolean' ? parsed : null
  } catch {
    return null
  }
}

function loadClarity(projectId: string) {
  const w = window as unknown as Record<string, unknown>
  if (w.clarity) return
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      ;((w.clarity as { q?: unknown[] }).q = (w.clarity as { q?: unknown[] }).q || []).push(args)
    }
  const t = document.createElement('script')
  t.async = true
  t.src = 'https://www.clarity.ms/tag/' + projectId
  document.head.appendChild(t)
}

interface CookieConsentProps {
  projectId: string
  siteMode: string
  primaryColor: string
}

export default function CookieConsent({ projectId, siteMode, primaryColor }: CookieConsentProps) {
  const active = siteMode === 'live' && !!projectId && !projectId.startsWith('{{')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) return
    const stored = readConsent()
    if (stored === null) setVisible(true)
    else if (stored.analytics) loadClarity(projectId)

    const reopen = () => setVisible(true)
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen)
  }, [active, projectId])

  const decide = useCallback(
    (analytics: boolean) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, ts: Date.now() }))
      } catch {}
      setVisible(false)
      if (analytics) loadClarity(projectId)
    },
    [projectId],
  )

  if (!active || !visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-voorkeuren"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[90] bg-white border border-[var(--color-ink-200)] rounded-2xl shadow-2xl p-5"
    >
      <p className="font-display font-bold text-sm text-[var(--color-ink-900)]">Cookies</p>
      <p className="text-xs text-[var(--color-ink-500)] mt-1.5 leading-relaxed">
        We gebruiken één analysetool om de site te verbeteren. Die plaatst pas cookies als je
        akkoord gaat.{' '}
        <a href="/cookies" className="underline hover:no-underline" style={{ color: primaryColor }}>
          Meer info
        </a>
      </p>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => decide(false)}
          className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[var(--color-ink-200)] text-[var(--color-ink-700)] hover:bg-[var(--color-ink-100)] transition-colors"
        >
          Weigeren
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: primaryColor }}
        >
          Accepteren
        </button>
      </div>
    </div>
  )
}

/** Knop voor op de /cookies-pagina om de banner opnieuw te openen. */
export function CookieSettingsButton({ primaryColor }: { primaryColor: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
      style={{ background: primaryColor }}
    >
      Cookie-voorkeuren aanpassen
    </button>
  )
}
