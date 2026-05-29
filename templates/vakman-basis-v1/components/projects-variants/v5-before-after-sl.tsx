import type { ProjectsProps, ProjectItem } from './types'

function BeforeAfter({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  return (
    <article className="v5p-card group rounded-2xl overflow-hidden bg-white shadow-md border border-zinc-100" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-200">
        {project.imageUrl ? (
          <>
            {/* "Voor" — gedempte/donkere filter */}
            <img
              src={project.imageUrl}
              alt={`${project.title} (voor)`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(.72) saturate(.55) contrast(.92)' }}
            />
            {/* "Na" — heldere, levendige filter, geclipt naar rechter helft */}
            <img
              src={project.imageUrl}
              alt={`${project.title} (na)`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                filter: 'brightness(1.08) saturate(1.25) contrast(1.05)',
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${a}88, #1a1a1a)` }} />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${primaryColor}cc, ${primaryColor}aa)`, clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            />
          </>
        )}
        {/* Verticale splitlijn */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5" style={{ background: primaryColor, boxShadow: `0 0 12px ${primaryColor}` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center" style={{ borderColor: primaryColor, borderWidth: '2px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 1L1 7L5 13M9 1L13 7L9 13" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold text-white bg-black/55 backdrop-blur-sm uppercase tracking-wide">
          Voor
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wide shadow" style={{ background: primaryColor }}>
          Na
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-zinc-900 text-lg">{project.title}</h3>
        <p className="text-sm text-zinc-600 mt-1">{project.caption}</p>
      </div>
    </article>
  )
}

export default function ProjectsV5BeforeAfterSl(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 px-6 bg-zinc-50">
      <style>{`
        @keyframes v5p-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .v5p-card { animation: v5p-rise .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v5p-card { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold mb-3" style={{ color: p.primaryColor }}>
            Voor & na
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Het verschil dat we maken</h2>
          <p className="text-zinc-600 mt-3">Een blik op hoe een opdracht eruitziet voor wij beginnen, en hoe we hem afleveren.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {p.projects.map((proj, i) => (
            <BeforeAfter key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
