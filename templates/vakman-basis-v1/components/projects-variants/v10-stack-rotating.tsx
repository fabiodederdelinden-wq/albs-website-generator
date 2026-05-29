import type { ProjectsProps, ProjectItem } from './types'

const ROTATIONS = [-3, 2, -1, 4, -2, 3]
const OFFSETS = [
  { x: 0, y: 0 },
  { x: -10, y: 8 },
  { x: 8, y: -6 },
  { x: -4, y: 12 },
  { x: 12, y: 4 },
  { x: -6, y: -8 },
]

function StackCard({ project, rot, off, primaryColor, accentColor, index }: { project: ProjectItem; rot: number; off: { x: number; y: number }; primaryColor: string; accentColor?: string; index: number }) {
  const a = accentColor || '#2C2C2C'
  return (
    <figure
      className="v10p-card group absolute md:relative bg-white p-3 pb-10 shadow-2xl rounded-sm transition-all duration-500 hover:!rotate-0 hover:!translate-x-0 hover:!translate-y-0 hover:z-30 hover:scale-105"
      style={{
        transform: `rotate(${rot}deg) translate(${off.x}px, ${off.y}px)`,
        animationDelay: `${index * 130}ms`,
        zIndex: index + 1,
      }}
    >
      <div className="relative w-56 md:w-64 aspect-[4/5] overflow-hidden bg-zinc-100">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primaryColor}88, ${a}99)` }} />
        )}
        <span
          className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow"
          style={{ background: primaryColor }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <figcaption className="absolute bottom-2 left-0 right-0 px-3 text-center">
        <p
          className="text-zinc-900 text-sm font-semibold"
          style={{ fontFamily: '"Caveat", "Bradley Hand", cursive', fontSize: '1.1rem' }}
        >
          {project.title}
        </p>
      </figcaption>
    </figure>
  )
}

export default function ProjectsV10StackRotating(p: ProjectsProps) {
  return (
    <section
      className="py-20 md:py-28 px-6 overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #f4ede1 0%, #ebe2cf 100%)' }}
    >
      <style>{`
        @keyframes v10p-drop { from { opacity: 0; transform: rotate(0deg) translate(0, -40px) scale(.9); } }
        .v10p-card { animation: v10p-drop .9s cubic-bezier(.16,1,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v10p-card { animation: none !important; transition: none !important; }
          .v10p-card:hover { transform: var(--initial-transform) !important; }
        }
      `}</style>
      {/* Wooden table grain dots */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #8a6235 1.2px, transparent 1.5px)', backgroundSize: '28px 28px' }}
      />
      <div className="relative max-w-6xl mx-auto">
        {p.note && <p className="text-xs text-zinc-700 mb-2">{p.note}</p>}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight"
            style={{ fontFamily: '"Caveat", "Bradley Hand", cursive' }}
          >
            Foto's van de werkplek
          </h2>
          <p className="text-zinc-700 mt-2 max-w-xl mx-auto">
            Een uitgespreide collectie, alsof we ze net op tafel hebben gelegd.
          </p>
        </div>
        {/* Mobile: vertical stacked-grid. Desktop: overlapping spread */}
        <div className="md:hidden flex flex-col items-center gap-6">
          {p.projects.map((proj, i) => (
            <StackCard
              key={proj.title + i}
              project={proj}
              rot={ROTATIONS[i % ROTATIONS.length]}
              off={{ x: 0, y: 0 }}
              primaryColor={p.primaryColor}
              accentColor={p.accentColor}
              index={i}
            />
          ))}
        </div>
        <div className="hidden md:flex flex-wrap justify-center items-center gap-x-2 gap-y-10 px-12 py-8">
          {p.projects.map((proj, i) => (
            <StackCard
              key={proj.title + i}
              project={proj}
              rot={ROTATIONS[i % ROTATIONS.length]}
              off={OFFSETS[i % OFFSETS.length]}
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
