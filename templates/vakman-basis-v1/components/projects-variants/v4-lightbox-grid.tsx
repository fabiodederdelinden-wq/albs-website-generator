import type { ProjectsProps, ProjectItem } from './types'

function LightboxCard({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  const anchorId = `project-${index + 1}`
  return (
    <a
      href={`#${anchorId}`}
      id={anchorId}
      className="v4p-card group relative block aspect-square overflow-hidden rounded-xl bg-zinc-900 cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}66, ${a}88)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="h-0.5 w-10 mb-3 group-hover:w-16 transition-all duration-300" style={{ background: primaryColor }} />
        <h3 className="font-bold text-white text-lg leading-tight">{project.title}</h3>
        <p className="text-sm text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          {project.caption}
        </p>
      </div>
      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </a>
  )
}

export default function ProjectsV4LightboxGrid(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <style>{`
        @keyframes v4p-pop { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: scale(1); } }
        .v4p-card { animation: v4p-pop .8s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v4p-card { animation: none !important; }
          .v4p-card .group-hover\\:scale-110 { transform: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Onze projecten</h2>
          <p className="text-zinc-600 mt-2 max-w-xl mx-auto">Hover over een tegel voor meer details, klik om te focussen.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {p.projects.map((proj, i) => (
            <LightboxCard key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
