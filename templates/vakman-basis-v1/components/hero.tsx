'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export interface HeroProps {
  businessName: string
  tagline: string
  phone: string
  whatsapp: string
  dekkingRegio: string
  primaryColor: string
}

export default function Hero({ businessName, tagline, phone, whatsapp, dekkingRegio, primaryColor }: HeroProps) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

      let introSeen = true
      try {
        introSeen = sessionStorage.getItem('albs-intro-seen') === '1'
      } catch {
        introSeen = false
      }

      const heroDelay = reduced || introSeen ? 0.2 : 2.5

      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(
          '.hero-badge',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: heroDelay },
        )
        .fromTo(
          '.hero-word',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.08 },
          `-=0.3`,
        )
        .fromTo(
          '.hero-sub',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          '-=0.7',
        )
        .fromTo(
          '.hero-cta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          '-=0.6',
        )
    },
    { scope: container },
  )

  const words = tagline.split(/\s+/)

  return (
    <section
      ref={container}
      className="relative min-h-[88vh] flex items-center px-6 md:px-12 overflow-hidden bg-[var(--color-ink-950)] text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${primaryColor} 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full pointer-events-none blur-3xl opacity-25"
        style={{ background: primaryColor }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full pointer-events-none blur-3xl opacity-15"
        style={{ background: primaryColor }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="hero-badge inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-300)] border border-[var(--color-ink-700)] rounded-full px-3 py-1.5 mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: primaryColor }}
          />
          <span>{businessName}</span>
          <span className="text-[var(--color-ink-500)]">·</span>
          <span>{dekkingRegio}</span>
        </div>

        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-4xl">
          {words.map((w, i) => (
            <span key={i} className="hero-word inline-block overflow-hidden mr-3">
              <span className="inline-block">{w}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-6 text-lg md:text-xl text-[var(--color-ink-300)] max-w-2xl leading-relaxed">
          {businessName} werkt in {dekkingRegio} en omgeving. Snelle reactie, vaste contactpersoon, eerlijke prijs.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`tel:${phone}`}
            className="hero-cta group inline-flex items-center gap-3 px-6 py-4 font-display font-bold uppercase tracking-wider text-sm text-[var(--color-ink-950)] rounded transition"
            style={{ background: primaryColor }}
          >
            <Phone className="w-4 h-4" strokeWidth={2.5} />
            Bel direct {phone}
          </a>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9+]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center gap-3 px-6 py-4 font-display font-bold uppercase tracking-wider text-sm text-white border border-[var(--color-ink-700)] rounded hover:border-white transition"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
            WhatsApp
          </a>
        </div>

        <div className="hero-cta mt-16 flex items-center gap-6 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5" style={{ background: primaryColor }} /> 24u reactie
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5" style={{ background: primaryColor }} /> KvK geregistreerd
          </span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5" style={{ background: primaryColor }} /> Lokaal werkzaam
          </span>
        </div>
      </div>
    </section>
  )
}
