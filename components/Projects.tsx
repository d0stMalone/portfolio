"use client"

import { useMemo, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Github, Maximize2, X } from "lucide-react"
import Reveal, { SectionHeading } from "./Reveal"
import { projects, type Project } from "../lib/projects"

function ProjectImage({
  src,
  alt,
  light,
  darken,
  className = "",
}: {
  src: string
  alt: string
  light?: boolean
  darken?: boolean
  className?: string
}) {
  // `darken` flips white-background plots into a dark theme for the cards.
  const flip = light && darken
  return (
    <div className={`overflow-hidden border border-white/10 ${light && !flip ? "bg-white" : "bg-[#0f1013]"} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] ${
          flip ? "[filter:invert(0.93)_hue-rotate(180deg)_saturate(1.4)]" : ""
        }`}
      />
    </div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-x-3 bottom-3 top-16 z-[80] mx-auto max-w-3xl overflow-y-auto border border-white/15 bg-[#0c0d10] p-6 shadow-2xl focus:outline-none sm:inset-x-6 sm:top-[8vh] sm:bottom-[8vh] md:p-10"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dialog.Close
                  className="absolute right-4 top-4 p-2 text-zinc-400 transition-colors hover:text-emerald-300"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
                <p className="hud-label">{project.category}</p>
                <Dialog.Title className="mt-2 pr-8 font-display text-2xl font-bold tracking-tight text-zinc-50 md:text-3xl">
                  {project.title}
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-zinc-300">{project.description}</Dialog.Description>

                {project.image && (
                  <div className="mt-6 grid gap-3">
                    <ProjectImage src={project.image} alt={project.imageAlt || project.title} light={project.imageLight} className="max-h-[420px]" />
                    {project.gallery?.map((g) => (
                      <ProjectImage key={g.src} src={g.src} alt={g.alt} light={g.light} className="max-h-[420px]" />
                    ))}
                  </div>
                )}

                <h4 className="mt-8 font-display text-lg font-semibold text-emerald-300">What I built</h4>
                <ul className="mt-3 space-y-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-zinc-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {project.insights && project.insights.length > 0 && (
                  <>
                    <h4 className="mt-8 font-display text-lg font-semibold text-emerald-300">What I learned</h4>
                    <ul className="mt-3 space-y-2">
                      {project.insights.map((f) => (
                        <li key={f} className="flex gap-3 text-zinc-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
                    <Github className="h-4 w-4" /> View code on GitHub <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function FeaturedCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <article className="panel spotlight group flex h-full flex-col transition-colors duration-300 hover:border-emerald-400/40">
        <button onClick={onOpen} className="block text-left" aria-label={`Open details for ${project.title}`}>
          {project.image && (
            <div className="relative">
              <ProjectImage
                src={project.image}
                alt={project.imageAlt || project.title}
                light={project.imageLight}
                darken
                className="aspect-[16/9] border-x-0 border-t-0"
              />
              <span className="absolute right-3 top-3 flex items-center gap-1 bg-black/70 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3 w-3" /> DETAILS
              </span>
            </div>
          )}
        </button>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">0{index + 1} · FEATURED</p>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-zinc-50 transition-colors group-hover:text-emerald-300">
            <button onClick={onOpen} className="text-left">
              {project.title}
            </button>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
          {project.highlight && (
            <p className="mt-4 border-l-2 border-emerald-400/70 pl-3 text-sm font-medium text-emerald-200">{project.highlight}</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.skills.slice(0, 5).map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-5 pt-6 text-sm">
            <button onClick={onOpen} className="font-medium text-emerald-300 transition-colors hover:text-emerald-200">
              Read more →
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-emerald-300"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function CompactCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="panel spotlight group flex flex-col p-5 transition-colors duration-300 hover:border-emerald-400/40"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{project.category.toUpperCase()}</p>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-emerald-300">
        <button onClick={onOpen} className="text-left">
          {project.title}
        </button>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.skills.slice(0, 3).map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-5 pt-5 text-sm">
        <button onClick={onOpen} className="font-medium text-emerald-300 transition-colors hover:text-emerald-200">
          Details →
        </button>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-emerald-300"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        )}
      </div>
    </motion.article>
  )
}

const filters = ["All", "Perception", "Hardware"] as const

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const featured = projects.filter((p) => p.featured)
  const more = useMemo(
    () => projects.filter((p) => !p.featured && (filter === "All" || p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="py-16 md:py-24">
      <SectionHeading
        index="04"
        label="PROJECTS"
        title="Projects"
        intro="Robotics work first — sensing, navigation and learning-based control — followed by hardware builds and computer vision."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} onOpen={() => setOpen(p)} />
        ))}
      </div>

      <Reveal className="mt-16 flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-zinc-100">More projects</h3>
        <div className="flex gap-1 border border-white/10 p-1" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative px-3 py-1.5 font-mono text-xs transition-colors ${
                filter === f ? "text-[#1a0b02]" : "text-zinc-400 hover:text-emerald-300"
              }`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 bg-emerald-400" transition={{ duration: 0.25 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {more.map((p) => (
            <CompactCard key={p.slug} project={p} onOpen={() => setOpen(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
