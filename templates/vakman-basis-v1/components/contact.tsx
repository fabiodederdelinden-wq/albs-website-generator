import Reveal from './reveal'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export interface ContactProps {
  businessName: string
  phone: string
  email: string
  whatsapp: string
  address: string
  postcode: string
  city: string
  primaryColor: string
}

export default function Contact({
  businessName,
  phone,
  email,
  whatsapp,
  address,
  postcode,
  city,
  primaryColor,
}: ContactProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)] mb-3">
            · CONTACT
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-14">
            Snel iets nodig?
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="space-y-5">
              <a
                href={`tel:${phone}`}
                className="group flex items-start gap-4 p-5 border border-[var(--color-ink-200)] rounded-lg hover:border-[var(--color-ink-700)] transition"
              >
                <div
                  className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in srgb, ${primaryColor} 14%, white)` }}
                >
                  <Phone className="w-5 h-5" style={{ color: primaryColor }} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
                    Bellen
                  </p>
                  <p className="font-display font-bold text-xl">{phone}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 border border-[var(--color-ink-200)] rounded-lg hover:border-[var(--color-ink-700)] transition"
              >
                <div
                  className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in srgb, ${primaryColor} 14%, white)` }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: primaryColor }} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
                    WhatsApp
                  </p>
                  <p className="font-display font-bold text-xl">Direct chatten</p>
                </div>
              </a>

              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="group flex items-start gap-4 p-5 border border-[var(--color-ink-200)] rounded-lg hover:border-[var(--color-ink-700)] transition"
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                    style={{ background: `color-mix(in srgb, ${primaryColor} 14%, white)` }}
                  >
                    <Mail className="w-5 h-5" style={{ color: primaryColor }} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-ink-500)]">
                      Mail
                    </p>
                    <p className="font-display font-bold text-xl">{email}</p>
                  </div>
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[var(--color-ink-950)] text-white p-8 rounded-lg h-full flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-3">
                  Bezoekadres
                </p>
                <p className="font-display font-bold text-2xl">{businessName}</p>
                <div className="mt-3 flex items-start gap-2 text-[var(--color-ink-300)]">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <p>{address}</p>
                    <p>
                      {postcode} {city}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-[var(--color-ink-800)] text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-500)]">
                Liever direct contact? Bel of WhatsApp.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
