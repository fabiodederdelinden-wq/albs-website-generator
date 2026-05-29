'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './reveal'

export interface ProjectItem {
  title: string
  caption: string
  imageUrl: string
}

export interface ProjectsProps {
  projects: ReadonlyArray<ProjectItem>
  primaryColor: string
  note?: string
}

function TiltCard({ project, index }: { project: ProjectItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 150, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    mx.set(x * 2)
    my.set(y * 2)
  }
  const onLeave = () => {
    setHovered(false)
    mx.set(0)
    my.set(0)
  }

  return (
    <Reveal delayMs={index * 60}>
      <motion.div
        ref={ref}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative rounded-lg overflow-hidden bg-[var(--color-ink-900)] aspect-[4/3] cursor-pointer"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)`,
            opacity: hovered ? 1 : 0.7,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div
            className="h-px w-12 mb-3 transition-all"
            style={{ background: project.imageUrl ? '#ffffff' : '#888', width: hovered ? '5rem' : '3rem' }}
          />
          <p className="font-display font-bold text-white text-lg">{project.title}</p>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 mt-1">
            {project.caption}
          </p>
        </div>
      </motion.div>
    </Reveal>
  )
}

export default function Projects({ projects, primaryColor, note }: ProjectsProps) {
  if (!projects || projects.length === 0) return null

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-ink-950)] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--color-ink-400)] mb-3">
                · PROJECTEN
              </p>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">
                Recent werk
              </h2>
            </div>
            <div
              className="hidden md:block h-px flex-1 ml-12 mb-3"
              style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <TiltCard key={p.title + i} project={p} index={i} />
          ))}
        </div>

        {note && (
          <Reveal>
            <p className="mt-10 text-xs font-mono tracking-[0.2em] uppercase text-[var(--color-ink-500)]">
              {note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
