import type { ProjectsProps, ProjectItem } from './types'

const HEIGHTS = ['h-56', 'h-72', 'h-64', 'h-80', 'h-60', 'h-72', 'h-56', 'h-64']
const TAGS = ['Renovatie', 'Spoedklus', 'Onderhoud', 'Nieuwbouw', 'Reparatie', 'Installatie']

function Tile({ project, h, primaryColor, accentColor, index }: { project: ProjectItem; h: string; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  const tag = TAGS[index % TAGS.length]
  return (
    <figure
      className="v2p-tile break-inside-avoid mb-5 rounded-lg overflow-hidden bg-zinc-100 shadow-sm group hover:shadow-lg transition-shadow duration-300"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className={`relative ${h} w-full overflow-hidden`}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${primaryColor}55, ${a}66)` }} />
        )}
        <span
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wide shadow-sm"
          style={{ color: primaryColor }}
        >
          {tag}
        </span>
      </div>
      <figcaption className="px-4 py-3 bg-white">
        <p className="font-semibold text-zinc-900 text-sm">{project.title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{project.caption}</p>
      </figcaption>
    </figure>
  )
}

export default function ProjectsV2Masonry(p: ProjectsProps) {
  const projectsExtended = p.projects.length >= 4 ? p.projects : [...p.projects, ...p.projects].slice(0, 4)
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <style>{`
        @keyframes v2p-in { from { opacity: 0; transform: translateY(20px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .v2p-tile { animation: v2p-in .75s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v2p-tile { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="mb-10">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: p.primaryColor }}>
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight max-w-2xl">
            Werk dat we met trots laten zien
          </h2>
        </div>
        <div className="columns-2 lg:columns-3 gap-5">
          {projectsExtended.map((proj, i) => (
            <Tile key={proj.title + i} project={proj} h={HEIGHTS[i % HEIGHTS.length]} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
