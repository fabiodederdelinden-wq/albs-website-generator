import { type ContactProps, telHref, waHref, softTint } from './types'

const WEEKDAYS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
const TIMES = ['10:00', '14:00', '16:30']

interface DayCell {
  num: number
  muted: boolean
  highlighted: boolean
  selected: boolean
}

function buildMonth(): DayCell[] {
  const days: DayCell[] = []
  for (let i = 27; i <= 30; i++) days.push({ num: i, muted: true, highlighted: false, selected: false })
  for (let i = 1; i <= 31; i++) {
    days.push({
      num: i,
      muted: false,
      highlighted: [4, 9, 14, 18, 22, 26].includes(i),
      selected: i === 14,
    })
  }
  for (let i = 1; i <= 35 - days.length; i++) days.push({ num: i, muted: true, highlighted: false, selected: false })
  return days.slice(0, 35)
}

export default function ContactV5CalendlyEmbed(p: ContactProps) {
  const days = buildMonth()
  return (
    <section className="py-20 px-6 md:px-12" style={{ background: softTint(p.primaryColor, 4) }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500 mb-3">· PLAN EEN AFSPRAAK</p>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight mb-3">Plan vrijblijvend langs</h2>
          <p className="text-neutral-600 max-w-xl mx-auto">Kies een dag en tijd. Gratis kennismaking ter plaatse, geen verplichtingen.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden grid md:grid-cols-3">
          <div className="md:col-span-1 p-6 border-r border-neutral-200" style={{ background: softTint(p.primaryColor, 3) }}>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Sessie met</p>
            <p className="font-display font-bold text-lg mb-4">{p.businessName}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: p.primaryColor }}>·</span>
                <span>30 minuten</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: p.primaryColor }}>·</span>
                <span>Bij u op locatie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ background: p.primaryColor }}>·</span>
                <span>Vrijblijvende offerte</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-200 text-xs text-neutral-500">
              Liever direct contact?
              <div className="mt-2 space-y-1">
                <a href={telHref(p.phone)} className="block font-semibold text-neutral-900 hover:underline">{p.phone}</a>
                {p.whatsapp ? (
                  <a href={waHref(p.whatsapp)} target="_blank" rel="noopener" className="block font-semibold text-neutral-900 hover:underline">WhatsApp</a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-lg">Mei 2026</p>
              <div className="flex gap-1">
                <button type="button" aria-label="Vorige maand" className="w-8 h-8 rounded border border-neutral-300 hover:bg-neutral-100">‹</button>
                <button type="button" aria-label="Volgende maand" className="w-8 h-8 rounded border border-neutral-300 hover:bg-neutral-100">›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-neutral-500 mb-2">
              {WEEKDAYS.map(d => <div key={d} className="py-1">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-6">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={day.muted}
                  className={`aspect-square rounded-lg text-sm font-medium transition ${day.muted ? 'text-neutral-300 cursor-default' : 'hover:bg-neutral-100'} ${day.selected ? 'text-white' : ''}`}
                  style={day.selected
                    ? { background: p.primaryColor }
                    : day.highlighted
                      ? { background: softTint(p.primaryColor, 15), color: p.primaryColor }
                      : undefined}
                >
                  {day.num}
                </button>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-700 mb-3">Beschikbare tijden — woensdag 14 mei</p>
              <div className="grid grid-cols-3 gap-2">
                {TIMES.map((t, idx) => (
                  <button key={t} type="button"
                    className={`py-3 rounded-lg font-bold transition border-2 ${idx === 1 ? 'text-white' : 'hover:bg-neutral-50'}`}
                    style={idx === 1
                      ? { background: p.primaryColor, borderColor: p.primaryColor }
                      : { borderColor: p.primaryColor, color: p.primaryColor }}>
                    {t}
                  </button>
                ))}
              </div>
              <button type="button"
                className="mt-4 w-full py-3 rounded-lg font-bold text-white text-base shadow-sm hover:shadow-md transition"
                style={{ background: p.accentColor ?? '#2C2C2C' }}>
                Bevestig afspraak
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
