'use client'

import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delayMs?: number
}

/**
 * IntersectionObserver-based scroll reveal.
 * Voegt `is-visible` class toe wanneer element 20% in beeld komt.
 * Werkt 1× per element, geen ge-flikker bij scroll-out.
 */
export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delayMs)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delayMs])

  return (
    <div ref={ref} className={clsx('reveal', className)}>
      {children}
    </div>
  )
}
