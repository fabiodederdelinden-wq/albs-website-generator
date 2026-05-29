import type { ProjectsProps, ProjectItem } from './types'

function Tile({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  return (
    <div className="v7p-tile group relative aspect-square md:aspect-[3/4] overflow-hidden bg-zinc-900" style={{ animationDelay: `${index * 70}ms` }}>
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}99, ${a}cc)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <span className="text-xs font-mono tracking-[0.25em]" style={{ color: primaryColor }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8" style={{ background: primaryColor }} />
        </div>
        <h3 className="font-black text-lg md:text-xl leading-tight">{project.title}</h3>
        <p className="text-xs md:text-sm text-white/85 mt-1 line-clamp-2">{project.caption}</p>
      </div>
    </div>
  )
}

export default function ProjectsV7FullbleedTiles(p: ProjectsProps) {
  return (
    <section className="bg-zinc-950 text-white">
      <style>{`
        @keyframes v7p-fade { from { opacity: 0; } to { opacity: 1; } }
        .v7p-tile { animation: v7p-fade .9s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .v7p-tile { animation: none !important; }
          .v7p-tile .group-hover\\:scale-105 { transform: none !important; }
        }
      `}</style>
      <div className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Recent werk</h2>
          <p className="text-zinc-400 max-w-md">Volledige projecten in beeld, edge-to-edge zonder afleiding.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {p.projects.map((proj, i) => (
          <Tile key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
        ))}
      </div>
    </section>
  )
}
