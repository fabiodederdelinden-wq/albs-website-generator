import { type ContactProps, telHref, waHref, softTint } from './types'

interface Faq {
  q: string
  a: string
}

function getFaqs(p: ContactProps): Faq[] {
  return [
    {
      q: 'Wanneer zijn jullie bereikbaar?',
      a: 'We zijn bereikbaar op werkdagen van 08:00 tot 18:00. Voor spoed kun je 24/7 bellen, dan zijn we binnen 2 uur ter plaatse. WhatsApp werkt ook in het weekend.',
    },
    {
      q: 'Wat kost een opdracht ongeveer?',
      a: 'We werken met vaste prijzen, geen verrassingen. Voor de meeste klussen krijg je vooraf een schriftelijke offerte. Een oriënterend bezoek is altijd gratis en vrijblijvend.',
    },
    {
      q: 'Geven jullie garantie op het werk?',
      a: 'Ja, op al ons werk zit minimaal 2 jaar garantie. Op materialen geldt de fabrieksgarantie, vaak 5 jaar of langer. Bij problemen komen we kosteloos terug.',
    },
    {
      q: 'In welk gebied werken jullie?',
      a: `We werken in ${p.city ?? 'de hele regio'} en omliggende plaatsen tot ongeveer 25 km. Buiten dat gebied is ook vaak mogelijk, neem dan even contact op.`,
    },
  ]
}

export default function ContactV9AccordionFaq(p: ContactProps) {
  const faqs = getFaqs(p)
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· VEELGESTELDE VRAGEN</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">Eerst even kijken?</h2>
          <p className="text-neutral-600">Antwoorden op de vragen die we vaak horen. Staat jouw vraag er niet bij? Neem contact op.</p>
        </div>

        <div className="space-y-3 mb-10">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="group rounded-xl border border-neutral-200 overflow-hidden hover:border-neutral-400 transition"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-neutral-900">
                <span className="flex-1">{f.q}</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-lg shrink-0 transition group-open:rotate-45"
                  style={{ background: p.primaryColor }}
                  aria-hidden="true"
                >+</span>
              </summary>
              <div className="px-5 pb-5 text-neutral-600 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>

        <div className="rounded-2xl p-7 md:p-9 text-center" style={{ background: softTint(p.primaryColor, 8) }}>
          <h3 className="font-display font-bold text-2xl mb-2">Nog vragen?</h3>
          <p className="text-neutral-700 mb-6 max-w-md mx-auto">Bel of app gerust. We helpen je snel en denken graag mee.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={telHref(p.phone)}
              className="px-7 py-3.5 rounded-lg font-bold text-white shadow-sm hover:shadow-md transition"
              style={{ background: p.primaryColor }}>
              Bel {p.phone}
            </a>
            {p.whatsapp ? (
              <a href={waHref(p.whatsapp)} target="_blank" rel="noopener"
                className="px-7 py-3.5 rounded-lg font-bold text-white shadow-sm hover:shadow-md transition"
                style={{ background: '#25D366' }}>
                Stuur WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
