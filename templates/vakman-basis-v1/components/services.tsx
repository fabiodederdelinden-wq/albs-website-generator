import Reveal from './reveal'
import { Wrench, Zap, Droplets, Hammer, Shield, Clock } from 'lucide-react'

const ICONS = [Wrench, Zap, Droplets, Hammer, Shield, Clock] as const

export interface ServicesProps {
  services: ReadonlyArray<string>
  primaryColor: string
}

export default function Services({ services, primaryColor }: ServicesProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
                · WAT WIJ DOEN
              </p>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">
                Diensten
              </h2>
            </div>
            <div
              className="hidden md:block h-px flex-1 ml-12 mb-3"
              style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
            />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length] ?? Wrench
            return (
              <Reveal key={service} delayMs={i * 80}>
                <div className="service-card group border border-[var(--color-ink-200)] rounded-lg p-7 h-full bg-white flex flex-col">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center mb-5 transition-colors"
                    style={{ background: `color-mix(in srgb, ${primaryColor} 12%, white)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: primaryColor }} strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-bold text-lg leading-tight">{service}</h3>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
