import type { ProjectsProps, ProjectItem } from './types'

function VideoCard({ project, primaryColor, accentColor, index }: { project: ProjectItem; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  const duration = ['1:24', '2:08', '0:48', '3:15', '1:52', '2:33'][index % 6]
  return (
    <article className="v8p-card group" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 shadow-lg">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}88, ${a}99)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="v8p-play relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${primaryColor}f0` }}
          >
            <span className="absolute inset-0 rounded-full v8p-ring" style={{ background: `${primaryColor}55` }} />
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="white" className="relative z-10 ml-1">
              <path d="M5 3L23 13L5 23V3Z" />
            </svg>
          </div>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/75 text-white text-xs font-mono">
          {duration}
        </span>
        {/* Live-tag */}
        <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-black/65 text-white text-xs font-bold uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Video
        </span>
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-bold text-zinc-900 text-base leading-tight">{project.title}</h3>
        <p className="text-sm text-zinc-600 mt-1">{project.caption}</p>
      </div>
    </article>
  )
}

export default function ProjectsV8VideoThumbnails(p: ProjectsProps) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <style>{`
        @keyframes v8p-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .v8p-card { animation: v8p-rise .8s cubic-bezier(.16,1,.3,1) both; }
        @keyframes v8p-ring { 0% { transform: scale(1); opacity: .65; } 100% { transform: scale(1.7); opacity: 0; } }
        .v8p-ring { animation: v8p-ring 2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v8p-card, .v8p-ring { animation: none !important; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-500 mb-2">{p.note}</p>}
        <div className="mb-10 max-w-2xl">
          <span className="inline-block text-xs uppercase tracking-[0.25em] font-bold mb-3" style={{ color: p.primaryColor }}>
            Achter de schermen
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">Werk in actie</h2>
          <p className="text-zinc-600 mt-2">Korte fragmenten van projecten die we recent hebben opgeleverd.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.projects.map((proj, i) => (
            <VideoCard key={proj.title + i} project={proj} primaryColor={p.primaryColor} accentColor={p.accentColor} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
