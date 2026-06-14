import type { ProjectsProps, ProjectItem } from './types'

function Slide({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  return (
    <article
      className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%] bg-white rounded-2xl overflow-hidden shadow-md border border-zinc-100"
    >
      <div className="relative aspect-[5/4] bg-zinc-100 overflow-hidden">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}50, ${a}55)` }} />
        )}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow" style={{ background: primaryColor }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-zinc-900 text-lg">{project.title}</h3>
        <p className="text-sm text-zinc-600 mt-1">{project.caption}</p>
      </div>
    </article>
  )
}

export default function ProjectsV3Carousel(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 bg-zinc-50 overflow-hidden">
      <style>{`
        .v3p-track { scrollbar-width: thin; scrollbar-color: ${p.primaryColor} #e4e4e7; }
        .v3p-track::-webkit-scrollbar { height: 8px; }
        .v3p-track::-webkit-scrollbar-track { background: #e4e4e7; border-radius: 4px; }
        .v3p-track::-webkit-scrollbar-thumb { background: ${p.primaryColor}; border-radius: 4px; }
        @keyframes v3p-hint { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .v3p-hint { animation: v3p-hint 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v3p-hint { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6 mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          {p.note && <p className="text-xs text-zinc-500 mb-1">{p.note}</p>}
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Projecten in beeld</h2>
          <p className="text-zinc-600 mt-2">Scroll horizontaal om door ons recente werk te bladeren.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500">
          <span>scroll</span>
          <svg aria-hidden="true" className="v3p-hint" width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M1 7H18M18 7L12 1M18 7L12 13" stroke={p.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="v3p-track flex gap-5 overflow-x-auto snap-x snap-mandatory pl-6 pr-6 pb-4">
        {p.projects.map((proj, i) => (
          <Slide key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
        ))}
        <div className="shrink-0 w-2" aria-hidden />
      </div>
    </section>
  )
}
