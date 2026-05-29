'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const SESSION_KEY = 'albs-intro-seen'

/**
 * ALBS intro met 6 presets (random pick of via config).
 * 1 scramble-classic — scramble + modules + counter + RGB-glitch + horizontal wipe (default)
 * 2 typewriter — tekens 1-voor-1 + vertical wipe
 * 3 blur-clear — gewazig → scherp, alleen counter
 * 4 mono-stack — segmented progress (5 blokjes)
 * 5 radial-iris — iris-effect vanuit centrum
 * 6 minimal-fade — naam + tagline fade-in (1.5s)
 *
 * SessionStorage-gated, prefers-reduced-motion respect.
 */
export type IntroPreset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface IntroProps {
  businessName: string
  primaryColor: string
  modules: ReadonlyArray<string>
  preset?: IntroPreset
  reducedFooter?: string
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$&%@01'.split('')

export default function Intro({
  businessName,
  primaryColor,
  modules,
  preset = 1,
  reducedFooter = 'Bereikbaar · Vakkundig · Betrouwbaar',
}: IntroProps) {
  const [state, setState] = useState<'loading' | 'visible' | 'hidden'>('loading')
  const container = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)

  const words = businessName.trim().split(/\s+/)
  const brandLine1 = words.length <= 1 ? businessName : words.slice(0, Math.ceil(words.length / 2)).join(' ')
  const brandLine2 = words.length <= 1 ? '' : words.slice(Math.ceil(words.length / 2)).join(' ')

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    } catch {}

    const liftPending = () => document.documentElement.classList.remove('intro-pending')
    const markDone = () => {
      ;(window as Window & { __introComplete?: boolean }).__introComplete = true
      window.dispatchEvent(new Event('intro:complete'))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.remove('intro-active')
      liftPending()
      setState('hidden')
      markDone()
      return
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        document.documentElement.classList.remove('intro-active')
        liftPending()
        setState('hidden')
        markDone()
        return
      }
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {}

    setState('visible')
    document.documentElement.classList.add('intro-active')
    liftPending()
    return () => document.documentElement.classList.remove('intro-active')
  }, [])

  useGSAP(
    () => {
      if (state !== 'visible') return

      const finishIntro = (delay = 280) => {
        document.documentElement.classList.remove('intro-active')
        requestAnimationFrame(() => {
          ;(window as Window & { __introComplete?: boolean }).__introComplete = true
          window.dispatchEvent(new Event('intro:complete'))
        })
        setTimeout(() => setState('hidden'), delay)
      }

      // Counter shared helper
      const animateCounter = (tl: gsap.core.Timeline, at: number, duration: number) => {
        const obj = { n: 0 }
        tl.to(
          obj,
          {
            n: 100,
            duration,
            ease: 'power1.inOut',
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = String(Math.floor(obj.n)).padStart(3, '0')
            },
          },
          at,
        )
      }

      switch (preset) {
        case 2: {
          // Particle-flow v3: particles + corner-markers + HUD + scanline + naam + counter + progress + signature BURST
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => finishIntro() })
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.5 }, 0.1)
            .to('.intro-right', { opacity: 1, duration: 0.5 }, 0.15)
            .to('.corner-marker', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, 0.2)
          tl.fromTo(
            '.particle-dot',
            { opacity: 0, x: -400, y: 400 },
            { opacity: 0.85, x: 400, y: -400, duration: 1.7, stagger: 0.025, ease: 'power2.inOut' },
            0.2,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { y: 24, opacity: 0, letterSpacing: '0.3em' },
            { y: 0, opacity: 1, letterSpacing: '0.02em', duration: 0.9, stagger: 0.12 },
            0.7,
          )
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.3)
          animateCounter(tl, 0.7, 1.2)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.2, ease: 'power1.inOut' }, 0.7)
          tl.fromTo(
            '.intro-scanline',
            { yPercent: -100, opacity: 0 },
            { yPercent: 100, opacity: 1, duration: 0.5, ease: 'power1.inOut' },
            1.7,
          )
          tl.to(
            '.particle-dot',
            { x: (i: number) => (i % 2 ? 1200 : -1200), y: (i: number) => (i % 3 ? 1200 : -1200), opacity: 0, scale: 0.3, duration: 0.6 },
            2.2,
          )
          tl.to('.intro-content', { opacity: 0, duration: 0.4 }, 2.3)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4 }, 2.6)
          return
        }
        case 3: {
          // Tech-bracket: brackets [ ] sliden in + circuit-lijntjes + chevrons + naam blur-reveal
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => finishIntro() })
          tl.fromTo('.bracket-left', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.2)
          tl.fromTo('.bracket-right', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7 }, 0.2)
          tl.fromTo(
            '.circuit-line',
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 0.5, duration: 0.6, stagger: 0.1, transformOrigin: 'center' },
            0.55,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { y: 16, opacity: 0, filter: 'blur(8px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.12 },
            0.7,
          )
          tl.fromTo('.chevron-up', { y: 10, opacity: 0 }, { y: 0, opacity: 0.7, duration: 0.4, stagger: 0.08 }, 1.2)
          animateCounter(tl, 0.9, 1.0)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.0, ease: 'power1.inOut' }, 0.9)
          tl.to('.intro-content', { opacity: 0, duration: 0.4 }, 2.0)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4 }, 2.3)
          return
        }
        case 4: {
          // Light-beam v3: 3 beams + corner-markers + HUD + naam-glow + segments×5 + counter + signature: beams SWIPE off
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => finishIntro() })
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.4 }, 0.05)
            .to('.intro-right', { opacity: 1, duration: 0.4 }, 0.1)
            .to('.corner-marker', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, 0.15)
          tl.fromTo(
            '.light-beam',
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 0.75, duration: 0.9, stagger: 0.18, transformOrigin: '0% 50%' },
            0.2,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, textShadow: `0 0 30px ${primaryColor}`, duration: 0.9, stagger: 0.15 },
            0.8,
          )
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.4)
          for (let i = 0; i < 5; i++) {
            tl.fromTo(`.seg-${i}`, { opacity: 0.15, scaleY: 0.5 }, { opacity: 1, scaleY: 1, duration: 0.25 }, 0.9 + i * 0.16)
          }
          animateCounter(tl, 1.0, 1.0)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.0, ease: 'power1.inOut' }, 1.0)
          // Signature: beams SWIPE off
          tl.to('.light-beam', { x: '110%', opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.in' }, 2.3)
          tl.to('.intro-content', { opacity: 0, duration: 0.4 }, 2.4)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4 }, 2.8)
          return
        }
        case 5: {
          // Grid-collapse v3: 96 dots + corner-markers + HUD + naam + counter + progress + scanline + signature: dots EXPLODE outward
          const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => finishIntro() })
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.4 }, 0.05)
            .to('.intro-right', { opacity: 1, duration: 0.4 }, 0.1)
            .to('.corner-marker', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, 0.15)
          tl.fromTo(
            '.grid-dot',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.4, duration: 0.5, stagger: { each: 0.005, from: 'random' } },
            0.2,
          )
          tl.to(
            '.grid-dot',
            { x: 0, y: 0, opacity: 0, duration: 0.7, stagger: { each: 0.004, from: 'edges' } },
            1.0,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12 },
            1.4,
          )
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.9)
          animateCounter(tl, 1.5, 0.9)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, 1.5)
          tl.fromTo(
            '.intro-scanline',
            { yPercent: -100, opacity: 0 },
            { yPercent: 100, opacity: 1, duration: 0.5, ease: 'power1.inOut' },
            2.2,
          )
          // Signature: dots reapparate + explode outward
          tl.fromTo(
            '.grid-dot',
            { opacity: 0, x: 0, y: 0 },
            { opacity: 0.6, x: (i: number) => (Math.random() - 0.5) * 1600, y: (i: number) => (Math.random() - 0.5) * 1200, scale: 0, duration: 0.7, ease: 'power3.out' },
            2.5,
          )
          tl.to('.intro-content', { opacity: 0, duration: 0.3 }, 2.6)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4 }, 2.9)
          return
        }
        case 6: {
          // Wave-pulse: vertical bars pulsen als sound-wave + naam reveal + counter
          const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' }, onComplete: () => finishIntro() })
          tl.fromTo(
            '.wave-pulse-bar',
            { scaleY: 0.2, opacity: 0 },
            { scaleY: 1, opacity: 0.8, duration: 0.3, stagger: 0.04, ease: 'power2.out' },
            0.2,
          )
          tl.to('.wave-pulse-bar', { scaleY: 0.3, duration: 0.4, stagger: 0.04, ease: 'power2.in' }, 1.0)
          tl.to('.wave-pulse-bar', { scaleY: 1, duration: 0.3, stagger: 0.04, ease: 'power2.out' }, 1.5)
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
            0.9,
          )
          animateCounter(tl, 1.0, 1.0)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.0, ease: 'power1.inOut' }, 1.0)
          tl.to('.intro-content', { opacity: 0, duration: 0.4 }, 2.3)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4 }, 2.6)
          return
        }
        case 7: {
          // Letterstack-cascade: elke letter valt apart in vanaf top, dan stack-glitch
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => finishIntro() })
          const l1 = brandRef.current?.querySelector<HTMLElement>('.brand-l1')
          const l2 = brandRef.current?.querySelector<HTMLElement>('.brand-l2')
          const renderLetters = (el: HTMLElement | null | undefined, text: string) => {
            if (!el) return []
            el.innerHTML = ''
            el.style.opacity = '1'
            const spans: HTMLSpanElement[] = []
            for (const ch of text) {
              const s = document.createElement('span')
              s.textContent = ch === ' ' ? ' ' : ch
              s.style.display = 'inline-block'
              s.style.opacity = '0'
              s.style.transform = 'translateY(-60px)'
              el.appendChild(s)
              spans.push(s)
            }
            return spans
          }
          const a = renderLetters(l1, brandLine1.toUpperCase())
          const b = brandLine2 ? renderLetters(l2, brandLine2.toUpperCase()) : []
          // Letterstack v3: + corner-markers + HUD + tagline + counter + progress + signature: SHAKE bij landen
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.4 }, 0.05)
            .to('.intro-right', { opacity: 1, duration: 0.4 }, 0.1)
            .to('.corner-marker', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, 0.15)
          tl.to(a, { y: 0, opacity: 1, duration: 0.55, stagger: 0.04 }, 0.2)
          // Signature: SHAKE alle letters bij landen
          tl.to(a, { x: '+=2', duration: 0.05, repeat: 3, yoyo: true }, 0.7)
          if (b.length) tl.to(b, { y: 0, opacity: 1, duration: 0.45, stagger: 0.035 }, 0.6)
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.1)
          animateCounter(tl, 0.5, 1.1)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.1, ease: 'power1.inOut' }, 0.5)
          tl.fromTo(
            '.intro-scanline',
            { yPercent: -100, opacity: 0 },
            { yPercent: 100, opacity: 1, duration: 0.5, ease: 'power1.inOut' },
            1.8,
          )
          tl.to('.intro-content', { opacity: 0, duration: 0.3, ease: 'power2.in' }, 2.1)
          tl.to('.intro-top, .intro-bottom', { yPercent: (j) => (j === 0 ? -110 : 110), duration: 0.8, ease: 'power4.inOut' }, 2.2)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.3, ease: 'power2.in' }, 2.8)
          return
        }
        case 8: {
          // Geometric-burst: 4 driehoeken expanderen vanuit centrum, naam reveal in centrum
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: () => finishIntro() })
          tl.fromTo(
            '.geo-shape',
            { scale: 0, opacity: 0, rotate: 0 },
            { scale: 1, opacity: 0.55, rotate: 90, duration: 1.4, stagger: 0.08 },
            0.1,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { y: 24, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12 },
            0.7,
          )
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.3)
          animateCounter(tl, 0.8, 1.2)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.2, ease: 'power1.inOut' }, 0.8)
          tl.to('.intro-content', { opacity: 0, scale: 1.04, duration: 0.4, ease: 'power2.in' }, 2.1)
          tl.to('.geo-shape', { scale: 8, opacity: 0, duration: 0.9, ease: 'power3.in', stagger: 0.05 }, 2.2)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.3, ease: 'power2.in' }, 2.95)
          return
        }
        case 9: {
          // Word-by-word: woorden 1-voor-1 fade-in (perfect voor lange bedrijfsnamen)
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => finishIntro() })
          const l1 = brandRef.current?.querySelector<HTMLElement>('.brand-l1')
          const l2 = brandRef.current?.querySelector<HTMLElement>('.brand-l2')
          const renderWords = (el: HTMLElement | null | undefined, text: string) => {
            if (!el) return []
            el.innerHTML = ''
            el.style.opacity = '1'
            const spans: HTMLSpanElement[] = []
            for (const w of text.split(/\s+/)) {
              const s = document.createElement('span')
              s.textContent = w
              s.style.display = 'inline-block'
              s.style.marginRight = '0.3em'
              s.style.opacity = '0'
              s.style.transform = 'translateY(20px) scale(0.96)'
              el.appendChild(s)
              spans.push(s)
            }
            return spans
          }
          const w1 = renderWords(l1, brandLine1.toUpperCase())
          const w2 = brandLine2 ? renderWords(l2, brandLine2.toUpperCase()) : []
          // Word-by-word v3: + corner-markers + HUD + particles op achtergrond + counter + progress + signature: woorden FLY-OUT
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.4 }, 0.05)
            .to('.intro-right', { opacity: 1, duration: 0.4 }, 0.1)
            .to('.corner-marker', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 }, 0.15)
          tl.fromTo(
            '.particle-dot',
            { opacity: 0, scale: 0 },
            { opacity: 0.3, scale: 1, duration: 0.6, stagger: 0.02, ease: 'power2.out' },
            0.2,
          )
          tl.to([...w1, ...w2], { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.18 }, 0.3)
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, w1.length * 0.18 + 0.5)
          animateCounter(tl, 0.5, 1.3)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.3, ease: 'power1.inOut' }, 0.5)
          // Signature: woorden FLY-OUT bij wipe
          tl.to([...w1, ...w2], { y: -30, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power3.in' }, 2.1)
          tl.to('.particle-dot', { opacity: 0, scale: 0, duration: 0.4 }, 2.2)
          tl.to('.intro-content', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.4)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.7)
          return
        }
        case 10: {
          // ASCII-frame: kader tekent zichzelf, naam reveal centraal
          const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => finishIntro() })
          tl.fromTo(
            '.ascii-line-top',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, transformOrigin: '0% 50%' },
            0.1,
          )
          tl.fromTo(
            '.ascii-line-right',
            { scaleY: 0 },
            { scaleY: 1, duration: 0.4, transformOrigin: '50% 0%' },
            0.55,
          )
          tl.fromTo(
            '.ascii-line-bottom',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, transformOrigin: '100% 50%' },
            0.9,
          )
          tl.fromTo(
            '.ascii-line-left',
            { scaleY: 0 },
            { scaleY: 1, duration: 0.4, transformOrigin: '50% 100%' },
            1.35,
          )
          tl.fromTo(
            '.brand-l1, .brand-l2',
            { opacity: 0, letterSpacing: '0.3em' },
            { opacity: 1, letterSpacing: '0.02em', duration: 0.8, stagger: 0.15 },
            1.4,
          )
          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.5 }, 2.1)
          tl.to('.intro-content', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.7)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 3.0)
          return
        }
        case 1:
        default: {
          // Scramble-classic (huidig)
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => finishIntro() })
          tl.to('.intro-label', { opacity: 1, y: 0, duration: 0.5 }, 0.15)
            .to('.intro-right', { opacity: 1, duration: 0.5 }, 0.2)

          const brand = brandRef.current
          if (!brand) return
          const scrambleEl = (el: HTMLElement, final: string, duration: number, startAt: number) => {
            const obj = { progress: 0 }
            tl.to(
              obj,
              {
                progress: 1,
                duration,
                ease: 'power2.out',
                onUpdate: () => {
                  const p = obj.progress
                  const revealed = Math.floor(p * final.length)
                  let out = ''
                  for (let i = 0; i < final.length; i++) {
                    if (i < revealed) out += final[i]
                    else if (final[i] === ' ') out += ' '
                    else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                  }
                  el.textContent = out
                },
              },
              startAt,
            )
          }
          const l1 = brand.querySelector<HTMLElement>('.brand-l1')
          const l2 = brand.querySelector<HTMLElement>('.brand-l2')
          if (l1) {
            tl.to(l1, { opacity: 1, duration: 0.3 }, 0.3)
            scrambleEl(l1, brandLine1.toUpperCase(), 1.0, 0.35)
          }
          if (l2 && brandLine2) {
            tl.to(l2, { opacity: 1, duration: 0.3 }, 0.3)
            scrambleEl(l2, brandLine2.toUpperCase(), 0.8, 0.75)
          }

          tl.to('.intro-tagline', { opacity: 1, y: 0, duration: 0.6 }, 0.95)
            .to('.intro-progress-wrap', { opacity: 1, duration: 0.4 }, 1.0)
            .to('.intro-module', { opacity: 1, x: 0, stagger: 0.12, duration: 0.4 }, 1.05)

          modules.forEach((_, i) => {
            tl.to(`.intro-module-check-${i}`, { opacity: 1, scale: 1, duration: 0.3 }, 1.15 + i * 0.12)
          })

          animateCounter(tl, 1.0, 1.0)
          tl.to('.intro-progress-fill', { scaleX: 1, duration: 1.0, ease: 'power1.inOut' }, 1.0)

          tl.fromTo(
            '.intro-scanline',
            { yPercent: -100, opacity: 0 },
            { yPercent: 100, opacity: 1, duration: 0.4, ease: 'power1.inOut' },
            2.05,
          )
          tl.to('.intro-glitch-r', { opacity: 0.9, x: -6, duration: 0.08 }, 2.2)
            .to('.intro-glitch-b', { opacity: 0.9, x: 6, duration: 0.08 }, 2.2)
            .to('.intro-glitch-r', { opacity: 0, x: 0, duration: 0.1 }, 2.32)
            .to('.intro-glitch-b', { opacity: 0, x: 0, duration: 0.1 }, 2.32)
          tl.to('.intro-content', { opacity: 0, duration: 0.3, ease: 'power2.in' }, 2.25)
          tl.to('.intro-top', { yPercent: -110, duration: 0.9, ease: 'power4.inOut' }, 2.35)
          tl.to('.intro-bottom', { yPercent: 110, duration: 0.9, ease: 'power4.inOut' }, 2.35)
          tl.to('.intro-wrapper', { opacity: 0, duration: 0.25, ease: 'power2.in' }, 2.95)
        }
      }
    },
    { scope: container, dependencies: [state, preset] },
  )

  const skip = () => {
    if (state !== 'visible') return
    document.documentElement.classList.remove('intro-active')
    setState('hidden')
    requestAnimationFrame(() => {
      ;(window as Window & { __introComplete?: boolean }).__introComplete = true
      window.dispatchEvent(new Event('intro:complete'))
    })
  }

  useEffect(() => {
    if (state !== 'visible') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if (state !== 'visible') return null

  // Preset-specifieke UI-elementen
  const showModules = preset === 1
  // Alle presets krijgen 6+ elementen — corner-markers + HUD + counter/progress + scanline standaard
  const showCounter = preset !== 10
  const showProgress = preset !== 10
  const showSegments = preset === 4
  const showGlitch = preset === 1
  const showScanline = preset === 1 || preset === 2 || preset === 5 || preset === 7
  const showCornerMarkers = true
  const showHud = true
  const isMinimal = preset === 10
  const showGeo = preset === 8
  const showAscii = preset === 10
  const showParticles = preset === 2 || preset === 9
  const showBracket = preset === 3
  const showLightBeam = preset === 4
  const showGridDots = preset === 5
  const showWavePulse = preset === 6

  return (
    <div
      ref={container}
      aria-hidden
      className="intro-wrapper fixed inset-0 z-[100] pointer-events-auto"
      onClick={skip}
    >
      <div
        className={`intro-top absolute top-0 left-0 right-0 h-1/2 bg-[var(--color-ink-950)]`}
        style={isMinimal ? { opacity: 0.95 } : {}}
      />
      <div
        className={`intro-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--color-ink-950)]`}
        style={isMinimal ? { opacity: 0.95 } : {}}
      />

      {showCornerMarkers && (
        <>
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
            <div
              key={pos}
              className={`corner-marker absolute w-6 h-6 opacity-0 pointer-events-none ${
                pos === 'tl' ? 'top-6 left-6 border-l-2 border-t-2' :
                pos === 'tr' ? 'top-6 right-6 border-r-2 border-t-2' :
                pos === 'bl' ? 'bottom-6 left-6 border-l-2 border-b-2' :
                'bottom-6 right-6 border-r-2 border-b-2'
              }`}
              style={{ borderColor: primaryColor, transform: 'scale(0.5)' }}
            />
          ))}
        </>
      )}

      {!isMinimal && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, ${primaryColor} 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      )}

      {!isMinimal && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${primaryColor} 12%, transparent), transparent 55%)`,
          }}
        />
      )}

      {showScanline && (
        <div
          className="intro-scanline absolute inset-x-0 top-0 h-[2px] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
            boxShadow: `0 0 20px ${primaryColor}`,
          }}
        />
      )}

      {/* showIris removed in v3 (preset 5 now uses grid-collapse) */}

      {showGeo && (
        <>
          {[0, 90, 180, 270].map((rot, i) => (
            <div
              key={i}
              className="geo-shape absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                width: '50vmin',
                height: '50vmin',
                marginLeft: '-25vmin',
                marginTop: '-25vmin',
                background: `linear-gradient(${rot}deg, ${primaryColor}, transparent 70%)`,
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                mixBlendMode: 'screen',
              }}
            />
          ))}
        </>
      )}

      {showAscii && (
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: 'min(90vw, 640px)',
            height: 'min(60vh, 380px)',
            marginLeft: 'calc(min(90vw, 640px) / -2)',
            marginTop: 'calc(min(60vh, 380px) / -2)',
          }}
        >
          <div className="ascii-line-top absolute top-0 left-0 right-0 h-[1px]" style={{ background: primaryColor }} />
          <div className="ascii-line-right absolute top-0 right-0 bottom-0 w-[1px]" style={{ background: primaryColor }} />
          <div className="ascii-line-bottom absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: primaryColor }} />
          <div className="ascii-line-left absolute top-0 left-0 bottom-0 w-[1px]" style={{ background: primaryColor }} />
        </div>
      )}

      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="particle-dot absolute rounded-full"
              style={{
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                top: `${(i * 7) % 100}%`,
                left: `${(i * 13) % 100}%`,
                background: primaryColor,
                opacity: 0,
                boxShadow: `0 0 8px ${primaryColor}`,
              }}
            />
          ))}
        </div>
      )}

      {showBracket && (
        <>
          <div
            className="bracket-left absolute top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none"
            style={{
              left: 'calc(50% - min(30vw, 360px))',
              fontSize: 'clamp(80px, 16vw, 200px)',
              color: primaryColor,
              opacity: 0,
              lineHeight: 1,
            }}
          >
            [
          </div>
          <div
            className="bracket-right absolute top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none"
            style={{
              right: 'calc(50% - min(30vw, 360px))',
              fontSize: 'clamp(80px, 16vw, 200px)',
              color: primaryColor,
              opacity: 0,
              lineHeight: 1,
            }}
          >
            ]
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 'min(50vw, 600px)' }}>
            <div className="circuit-line absolute -top-16 left-0 right-0 h-px" style={{ background: primaryColor, opacity: 0 }} />
            <div className="circuit-line absolute -bottom-16 left-0 right-0 h-px" style={{ background: primaryColor, opacity: 0 }} />
            <div className="circuit-line absolute -top-12 left-1/4 right-1/4 h-px" style={{ background: primaryColor, opacity: 0 }} />
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="chevron-up font-mono text-xs" style={{ color: primaryColor, opacity: 0 }}>
                ›
              </span>
            ))}
          </div>
        </>
      )}

      {showLightBeam && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="light-beam absolute h-1"
              style={{
                top: `${20 + i * 30}%`,
                left: 0,
                right: 0,
                background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
                opacity: 0,
                filter: 'blur(2px)',
                boxShadow: `0 0 30px ${primaryColor}`,
              }}
            />
          ))}
        </div>
      )}

      {showGridDots && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="grid grid-cols-12 gap-6 max-w-4xl">
            {Array.from({ length: 96 }).map((_, i) => {
              const col = i % 12
              const row = Math.floor(i / 12)
              const cx = (col - 5.5) * 40
              const cy = (row - 3.5) * 40
              return (
                <div
                  key={i}
                  className="grid-dot rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: primaryColor,
                    opacity: 0,
                    transform: `translate(${cx}px, ${cy}px)`,
                  }}
                />
              )
            })}
          </div>
        </div>
      )}

      {showWavePulse && (
        <div className="absolute bottom-32 left-0 right-0 flex items-end justify-center gap-1 pointer-events-none h-32">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 30 + Math.sin(i * 0.4) * 30 + (i % 3) * 10
            return (
              <span
                key={i}
                className="wave-pulse-bar block w-1.5 rounded-full origin-bottom"
                style={{
                  height: `${h}px`,
                  background: primaryColor,
                  opacity: 0,
                  boxShadow: `0 0 8px ${primaryColor}`,
                }}
              />
            )
          })}
        </div>
      )}

      <div className="intro-content absolute inset-0 flex flex-col items-center justify-center px-6">
        {!isMinimal && (
          <div className="intro-label absolute top-8 left-8 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] opacity-0">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
            <span>Site initialiseert</span>
          </div>
        )}

        {!isMinimal && (
          <div className="intro-right absolute top-8 right-8 text-right opacity-0">
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
              v1.0 · 2026 · NL
            </div>
            <div className="mt-1 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-700)]">
              {reducedFooter}
            </div>
          </div>
        )}

        <div ref={brandRef} className="relative text-center">
          {showGlitch && (
            <>
              <div className="intro-glitch-r absolute inset-0 pointer-events-none opacity-0" style={{ color: '#ff4d6d', mixBlendMode: 'screen' }} aria-hidden>
                <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] leading-none">
                  <div className="flex justify-center overflow-hidden">{brandLine1.toUpperCase()}</div>
                  {brandLine2 && <div className="flex justify-center overflow-hidden mt-1 md:mt-2">{brandLine2.toUpperCase()}</div>}
                </h1>
              </div>
              <div className="intro-glitch-b absolute inset-0 pointer-events-none opacity-0" style={{ color: '#00d4ff', mixBlendMode: 'screen' }} aria-hidden>
                <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] leading-none">
                  <div className="flex justify-center overflow-hidden">{brandLine1.toUpperCase()}</div>
                  {brandLine2 && <div className="flex justify-center overflow-hidden mt-1 md:mt-2">{brandLine2.toUpperCase()}</div>}
                </h1>
              </div>
            </>
          )}

          <h1 className="relative font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.02em] leading-none select-none">
            <div
              className="brand-l1 flex justify-center overflow-hidden opacity-0"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${primaryColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                minHeight: '1em',
              }}
            >
              {brandLine1.toUpperCase()}
            </div>
            {brandLine2 && (
              <div
                className="brand-l2 flex justify-center overflow-hidden mt-1 md:mt-2 text-[var(--color-ink-200)] opacity-0"
                style={{ minHeight: '1em' }}
              >
                {brandLine2.toUpperCase()}
              </div>
            )}
          </h1>

          {!isMinimal && (
            <div className="intro-tagline mt-8 flex items-center justify-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] opacity-0">
              <span className="w-8 h-px bg-[var(--color-ink-700)]" />
              <span>{reducedFooter}</span>
              <span className="w-8 h-px bg-[var(--color-ink-700)]" />
            </div>
          )}
          {isMinimal && (
            <div className="intro-tagline mt-6 text-sm font-mono tracking-[0.25em] uppercase text-[var(--color-ink-300)] opacity-0">
              {reducedFooter}
            </div>
          )}
        </div>

        {showModules && (
          <div className="absolute bottom-10 left-8 space-y-1.5 hidden md:block">
            {modules.map((m, i) => (
              <div
                key={m}
                className="intro-module opacity-0 -translate-x-4 flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-ink-400)]"
              >
                <span
                  className={`intro-module-check-${i} opacity-0 scale-50 w-3 h-3 flex items-center justify-center rounded-sm border`}
                  style={{ borderColor: primaryColor, backgroundColor: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
                >
                  <svg viewBox="0 0 12 12" className="w-2 h-2" fill="none" stroke={primaryColor} strokeWidth="2">
                    <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{m}</span>
                <span style={{ color: primaryColor, opacity: 0.7 }}>READY</span>
              </div>
            ))}
          </div>
        )}

        {showSegments && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`seg-${i} block w-12 h-[3px]`}
                style={{ background: primaryColor, opacity: 0.15 }}
              />
            ))}
          </div>
        )}

        {showProgress && (
          <div className="intro-progress-wrap absolute bottom-10 right-8 w-60 opacity-0">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)] mb-3">
              <span>Loading</span>
              {showCounter && (
                <span>
                  <span ref={counterRef}>000</span>
                  <span className="text-[var(--color-ink-700)]">/100</span>
                </span>
              )}
            </div>
            <div className="relative h-[2px] bg-[var(--color-ink-800)] rounded-full overflow-hidden">
              <div
                className="intro-progress-fill absolute inset-0 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 60%, white))`,
                  transform: 'scaleX(0)',
                  boxShadow: `0 0 12px color-mix(in srgb, ${primaryColor} 60%, transparent)`,
                }}
              />
            </div>
            <div className="mt-2 text-right text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-700)]">
              Klik om over te slaan
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
