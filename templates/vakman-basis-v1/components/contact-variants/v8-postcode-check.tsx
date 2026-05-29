'use client'

import { useState, type FormEvent } from 'react'
import { type ContactProps, telHref, waHref, softTint } from './types'

export default function ContactV8PostcodeCheck(p: ContactProps) {
  const [postcode, setPostcode] = useState('')
  const [checked, setChecked] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (postcode.trim().length >= 4) setChecked(true)
  }

  const reset = () => {
    setChecked(false)
    setPostcode('')
  }

  return (
    <section className="py-20 px-6 md:px-12" style={{ background: softTint(p.primaryColor, 5) }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· DEKKINGSGEBIED</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">Komen we bij jou?</h2>
          <p className="text-neutral-600">Vul je postcode in en zie direct of we in jouw buurt werken.</p>
        </div>

        {!checked ? (
          <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <label htmlFor="v8-pc" className="block text-sm font-semibold text-neutral-700 mb-2">Jouw postcode</label>
            <div className="flex gap-2">
              <input
                id="v8-pc"
                type="text"
                inputMode="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="bv. 3532 HM"
                required
                minLength={4}
                className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg font-mono focus:outline-none"
                style={{ borderColor: postcode ? p.primaryColor : undefined }}
              />
              <button type="submit"
                className="px-6 py-3 rounded-lg font-bold text-white shadow-sm hover:shadow-md transition whitespace-nowrap"
                style={{ background: p.primaryColor }}>
                Check
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-3">We werken in {p.city ?? 'de regio'} en ruim daarbuiten. Geen verplichtingen.</p>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: '#10B981' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#10B981' }}>Goed nieuws</p>
                <h3 className="font-display font-bold text-2xl mb-1">We dekken jouw regio</h3>
                <p className="text-neutral-600">
                  Postcode <span className="font-mono font-bold">{postcode.toUpperCase()}</span> valt binnen ons werkgebied.
                  Gratis voorrijden, vaste prijzen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg text-center" style={{ background: softTint(p.primaryColor, 10) }}>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Reistijd</p>
                <p className="font-bold text-lg" style={{ color: p.primaryColor }}>~25 min</p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: softTint(p.primaryColor, 10) }}>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Voorrijden</p>
                <p className="font-bold text-lg" style={{ color: p.primaryColor }}>Gratis</p>
              </div>
            </div>

            <div className="space-y-2">
              <a href={telHref(p.phone)}
                className="block w-full py-3.5 rounded-lg font-bold text-white text-center shadow-sm hover:shadow-md transition"
                style={{ background: p.primaryColor }}>
                Bel {p.phone}
              </a>
              {p.whatsapp ? (
                <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
                  className="block w-full py-3.5 rounded-lg font-bold text-center border-2 transition hover:bg-neutral-50"
                  style={{ borderColor: '#25D366', color: '#25D366' }}>
                  Plan via WhatsApp
                </a>
              ) : null}
            </div>

            <button type="button" onClick={reset}
              className="block mx-auto mt-4 text-sm text-neutral-500 hover:text-neutral-700 underline">
              Andere postcode checken
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
