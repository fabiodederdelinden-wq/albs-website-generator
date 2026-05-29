import type { ProjectsProps, ProjectItem } from './types'

const ROTATIONS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']

function Polaroid({ project, rotClass, primaryColor, accentColor, index }: { project: ProjectItem; rotClass: string; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  return (
    <figure
      className={`v6p-polaroid ${rotClass} relative bg-white p-3 pb-6 shadow-xl rounded-sm transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-10`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}77, ${a}77)` }} />
        )}
      </div>
      <figcaption className="pt-3 px-1 text-center">
        <p className="font-handwritten text-zinc-900 text-base leading-tight" style={{ fontFamily: '"Caveat", "Bradley Hand", "Comic Sans MS", cursive' }}>
          {project.title}
        </p>
        <p className="text-xs text-zinc-500 mt-1" style={{ fontFamily: '"Caveat", "Bradley Hand", "Comic Sans MS", cursive', fontSize: '0.95rem' }}>
          {project.caption}
        </p>
      </figcaption>
      {/* Tape detail */}
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 opacity-80"
        style={{ background: `${primaryColor}55`, borderLeft: '1px solid rgba(0,0,0,.05)', borderRight: '1px solid rgba(0,0,0,.05)' }}
      />
    </figure>
  )
}

export default function ProjectsV6PolaroidStack(p: ProjectsProps) {
  return (
    <section
      className="py-20 md:py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf5ee 0%, #f3ece1 100%)' }}
    >
      <style>{`
        @keyframes v6p-drop { from { opacity: 0; transform: translateY(-40px) rotate(0deg); } to { opacity: 1; } }
        .v6p-polaroid { animation: v6p-drop .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v6p-polaroid { animation: none !important; }
          .v6p-polaroid:hover { transform: none !important; }
        }
      `}</style>
      {/* Cork-board texture met dots */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #8a6a3d 1px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />
      <div className="relative max-w-5xl mx-auto">
        {p.note && <p className="text-xs text-zinc-600 mb-2">{p.note}</p>}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight"
            style={{ fontFamily: '"Caveat", "Bradley Hand", cursive' }}
          >
            Een paar favorieten
          </h2>
          <p className="text-zinc-700 mt-2 max-w-xl mx-auto">Werk uit de afgelopen maanden, vastgelegd op locatie.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 max-w-5xl mx-auto px-4">
          {p.projects.map((proj, i) => (
            <Polaroid
              key={proj.title + i}
              project={proj}
              rotClass={ROTATIONS[i % ROTATIONS.length]}
              primaryColor={p.primaryColor}
              accentColor={p.accentColor}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
