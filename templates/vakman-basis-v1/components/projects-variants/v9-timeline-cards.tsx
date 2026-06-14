import type { ProjectsProps, ProjectItem } from './types'

const MONTHS = ['Januari', 'Maart', 'Mei', 'Juli', 'September', 'November']
const YEAR = new Date().getFullYear()

function TimelineRow({ project, primaryColor, accentColor, index, isLast }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number; isLast: boolean }) {
  const a = accentColor || '#2C2C2C'
  const dateLabel = `${MONTHS[index % MONTHS.length]} ${YEAR - (index > 2 ? 1 : 0)}`
  return (
    <div className="v9p-row relative pl-10 md:pl-16 pb-10 last:pb-0" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Vertical line */}
      {!isLast && (
        <span
          className="absolute left-3 md:left-6 top-7 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, ${primaryColor}, ${primaryColor}33)` }}
        />
      )}
      {/* Dot */}
      <span
        className="absolute left-1 md:left-4 top-3 w-5 h-5 rounded-full border-4 border-white shadow-md"
        style={{ background: primaryColor }}
      />
      {/* Card */}
      <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 grid grid-cols-1 sm:grid-cols-5">
        <div className="relative sm:col-span-2 aspect-[5/4] sm:aspect-auto bg-zinc-100 overflow-hidden">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}66, ${a}77)` }} />
          )}
        </div>
        <div className="sm:col-span-3 p-5 md:p-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: primaryColor }}>
            {dateLabel}
          </p>
          <h3 className="font-bold text-zinc-900 text-xl leading-tight">{project.title}</h3>
          <p className="text-zinc-600 mt-2 text-sm leading-relaxed">{project.caption}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V7L11 9M13 7A6 6 0 1 1 1 7A6 6 0 0 1 13 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Opgeleverd</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function ProjectsV9TimelineCards(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 px-6 bg-zinc-50">
      <style>{`
        @keyframes v9p-slide { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .v9p-row { animation: v9p-slide .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v9p-row { animation: none !important; }
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="mb-12 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold mb-3" style={{ color: p.primaryColor }}>
            Tijdlijn
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Projecten door de tijd</h2>
          <p className="text-zinc-600 mt-2 max-w-xl mx-auto">Een chronologisch overzicht van werk dat we recent hebben opgeleverd.</p>
        </div>
        <div className="relative">
          {p.projects.map((proj, i) => (
            <TimelineRow
              key={proj.title + i}
              project={proj}
              primaryColor={p.primaryColor}
              accentColor={p.accentColor}
              index={i}
              isLast={i === p.projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
