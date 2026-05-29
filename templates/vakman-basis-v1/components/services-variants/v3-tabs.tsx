'use client'

import { useState } from 'react'
import { ServiceIcon, serviceDescriptions, mixColor, type ServicesProps } from './types'

export default function ServicesV3Tabs(p: ServicesProps) {
  const list = p.services.slice(0, 6)
  const [active, setActive] = useState(0)
  const activeService = list[active] ?? list[0] ?? ''
  return (
    <section className="py-20 md:py-28 px-6 bg-white text-zinc-900">
      <style>{`
        @keyframes v3-pop { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .v3-pop { animation: v3-pop .4s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .v3-pop { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-14 text-center">
          <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: p.primaryColor }}>
            · DIENSTEN
          </p>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight">
            Wat past bij u?
          </h2>
        </div>
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-10">
          <div
            role="tablist"
            aria-label="Diensten"
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2"
          >
            {list.map((service, i) => {
              const isActive = i === active
              return (
                <button
                  key={service}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left whitespace-nowrap lg:whitespace-normal border transition-all duration-300 shrink-0 ${
                    isActive ? 'shadow-md' : 'hover:bg-zinc-50'
                  }`}
                  style={{
                    background: isActive ? mixColor(p.primaryColor, 12) : '#fff',
                    borderColor: isActive ? p.primaryColor : '#e4e4e7',
                    color: isActive ? p.primaryColor : '#3f3f46',
                  }}
                >
                  <span
                    className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                    style={{
                      background: isActive ? '#fff' : mixColor(p.primaryColor, 8),
                      color: p.primaryColor,
                    }}
                  >
                    <ServiceIcon service={service} className="w-4 h-4" />
                  </span>
                  <span className="font-display font-semibold text-sm md:text-base">{service}</span>
                </button>
              )
            })}
          </div>
          <div
            key={active}
            className="v3-pop rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-7 md:p-10"
          >
            <div className="flex items-center gap-4 mb-5">
              <span
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: mixColor(p.primaryColor, 14), color: p.primaryColor }}
              >
                <ServiceIcon service={activeService} className="w-7 h-7" />
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl">{activeService}</h3>
            </div>
            <p className="text-zinc-700 text-base md:text-lg leading-relaxed mb-6">
              {serviceDescriptions(activeService)}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white border border-zinc-200 px-4 py-3">
                <div className="text-zinc-500 mb-1">Reactietijd</div>
                <div className="font-semibold">Binnen 2 uur ter plaatse</div>
              </div>
              <div className="rounded-lg bg-white border border-zinc-200 px-4 py-3">
                <div className="text-zinc-500 mb-1">Garantie</div>
                <div className="font-semibold">Op materiaal én arbeid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
