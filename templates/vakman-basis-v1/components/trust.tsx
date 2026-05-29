'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './reveal'

interface CounterProps {
  to: number
  suffix?: string
  decimals?: number
  durationMs?: number
}

function Counter({ to, suffix = '', decimals = 0, durationMs = 1200 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return
    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = to * eased
      el.textContent = decimals > 0 ? value.toFixed(decimals) + suffix : Math.floor(value).toString() + suffix
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, to, suffix, decimals, durationMs])

  return <span ref={ref}>0{suffix}</span>
}

export interface TrustProps {
  reviewCount: number
  reviewRating: number
  kvk: string
  primaryColor: string
}

export default function Trust({ reviewCount, reviewRating, kvk, primaryColor }: TrustProps) {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-[var(--color-ink-950)] text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${primaryColor} 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-3">
            · BEWIJS
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-14">
            Waarom klanten ons bellen
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: 'Reviews-gemiddelde', value: <><Counter to={reviewRating} decimals={1} /> <span className="text-2xl" style={{ color: primaryColor }}>★</span></> },
            { label: 'Beoordelingen', value: <><Counter to={reviewCount} />+</> },
            { label: 'KvK', value: kvk },
            { label: 'Reactietijd', value: <>&lt;24u</> },
          ].map((item) => (
            <Reveal key={item.label}>
              <div>
                <p
                  className="font-display font-black text-4xl md:text-6xl tracking-tight mb-2"
                  style={{ color: primaryColor }}
                >
                  {item.value}
                </p>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)]">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
