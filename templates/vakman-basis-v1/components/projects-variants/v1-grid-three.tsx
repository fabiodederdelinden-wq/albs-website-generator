import type { ProjectsProps, ProjectItem } from './types'

function Fallback({ primaryColor, accentColor }: { primaryColor: string; accentColor?: string }) {
  const a = accentColor || '#2C2C2C'
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${primaryColor}40 0%, ${a}60 100%)` }}
    />
  )
}

function Card({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  return (
    <article className="v1p-card group bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Fallback primaryColor={primaryColor} accentColor={accentColor} />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-zinc-900 text-lg mb-1">{project.title}</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{project.caption}</p>
      </div>
    </article>
  )
}

export default function ProjectsV1GridThree(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 px-6 bg-zinc-50">
      <style>{`
        @keyframes v1p-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .v1p-card { animation: v1p-rise .7s cubic-bezier(.16,1,.3,1) both; }
        .v1p-card:hover { box-shadow: 0 14px 40px rgba(0,0,0,.08); }
        @media (prefers-reduced-motion: reduce) {
          .v1p-card { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Recent uitgevoerd werk</h2>
            <p className="text-zinc-600 mt-2">Een greep uit onze recente projecten in de regio.</p>
          </div>
          <div className="h-1 w-16 rounded-full" style={{ background: p.primaryColor }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.projects.map((proj, i) => (
            <Card key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
