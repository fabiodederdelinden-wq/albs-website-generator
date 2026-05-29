'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'

export interface HeaderProps {
  businessName: string
  phone: string
  primaryColor: string
}

export default function Header({ businessName, phone, primaryColor }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-ink-950)]/95 backdrop-blur border-b border-[var(--color-ink-800)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <a href="#top" className="font-display font-black text-lg md:text-xl text-white tracking-tight">
          {businessName.toUpperCase()}
        </a>
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 px-4 py-2 font-display font-bold uppercase tracking-wider text-xs text-[var(--color-ink-950)] rounded transition hover:opacity-90"
          style={{ background: primaryColor }}
        >
          <Phone className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span className="hidden sm:inline">Bel direct</span>
          <span>{phone}</span>
        </a>
      </div>
    </header>
  )
}
