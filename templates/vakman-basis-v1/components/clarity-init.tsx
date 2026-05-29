'use client'

import { useEffect } from 'react'

interface ClarityInitProps {
  projectId: string
}

export default function ClarityInit({ projectId }: ClarityInitProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || !projectId) return
    if ((window as unknown as { clarity?: unknown }).clarity) return
    ;(function (c: Window & typeof globalThis, l: Document, a: string, r: string, i: string) {
      const w = c as unknown as Record<string, unknown>
      w[a] =
        w[a] ||
        function (...args: unknown[]) {
          ;((w[a] as { q?: unknown[] }).q = (w[a] as { q?: unknown[] }).q || []).push(args)
        }
      const t = l.createElement(r) as HTMLScriptElement
      t.async = true
      t.src = 'https://www.clarity.ms/tag/' + i
      const y = l.getElementsByTagName(r)[0]
      if (y?.parentNode) y.parentNode.insertBefore(t, y)
      else l.head.appendChild(t)
    })(window, document, 'clarity', 'script', projectId)
  }, [projectId])

  return null
}
