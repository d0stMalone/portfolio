"use client"

import { useEffect, useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Maximize2, Play, Trophy, Users, X } from "lucide-react"
import Reveal, { SectionHeading } from "./Reveal"

type Entry = {
  name: string
  role: string
  team: string
  when: string
  kind: "Competitor" | "Mentor"
  summary: string
  points: string[]
  tags: string[]
  // optional — shown only when filled in
  result?: string
  theme?: string
  media?: Media[]
}

type Media =
  | { type: "video"; src: string; poster: string; alt: string; label: string }
  | { type: "image"; src: string; alt: string; label: string; light?: boolean }

const entries: Entry[] = [
  {
    name: "ABU Robocon",
    role: "Electronics Team Lead",
    team: "Team KJSCE Robocon",
    when: "2021 – 2022",
    kind: "Competitor",
    summary:
      "The Asia-Pacific Broadcasting Union Robot Contest: university teams design and build robots that complete high-speed, precision tasks against the clock — with autonomous and manually driven robots working together.",
    points: [
      "Led the electronics team: PCB design, sensor integration, motion control and communication",
      "Multi-microcontroller PCBs talking UART, I2C, SPI and CAN for fast, synchronised motion",
      "IMU, encoder and IR sensing for autonomous navigation — 95% pathfinding accuracy",
      "ZigBee/Bluetooth link between robots — 30% more efficient data transfer",
    ],
    tags: ["PCB Design", "Sensor Integration", "Motion Control", "CAN", "ZigBee", "Team Leadership"],
    theme: "Lagori (2022)",
    media: [
      {
        type: "video",
        src: "competitions/robocon-lagori.mp4",
        poster: "competitions/robocon-lagori-poster.webp",
        alt: "Robocon robots re-stacking the red, blue and white Lagori discs during a match",
        label: "Match footage",
      },
    ],
  },
  {
    name: "FIRST Tech Challenge",
    role: "Mentor",
    team: "FTC team 22985 Paraducks · via The Innovation Story",
    when: "2022 – 2023",
    kind: "Mentor",
    summary:
      "FIRST's high-school robotics programme: student teams design, build and program robots to play a new game each season. I coached teams through FTC and FIRST Robotics Competition (FRC).",
    points: [
      "Mentored FTC team 22985 Paraducks through the 2022–23 POWERPLAY season",
      "Coached high-school students through robot design, build and programming",
      "Hands-on guidance on mechanisms, wiring and control code for autonomous and driver-controlled periods",
      "Helped teams turn ideas into robots that could complete complex game tasks",
    ],
    tags: ["Mentoring", "STEM Outreach", "Java", "Robot Design", "FTC", "FRC"],
    theme: "POWERPLAY (2022–23)",
    media: [
      {
        type: "video",
        src: "competitions/ftc-powerplay.mp4",
        poster: "competitions/ftc-powerplay-poster.webp",
        alt: "FTC robots scoring cones on junction poles during a POWERPLAY match",
        label: "Match footage",
      },
      { type: "image", src: "competitions/ftc-robot-cad.webp", alt: "CAD render of an FTC robot with a lift and cone gripper", label: "Robot CAD", light: true },
      { type: "image", src: "competitions/ftc-cone.webp", alt: "POWERPLAY cone with a custom signal sleeve", label: "Paraducks signal sleeve" },
    ],
  },
]

function LoopVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true)
      v.pause()
      return
    }
    // pause while off screen to save battery; resume when visible
    let visible = false
    const tryPlay = () => visible && v.play().catch(() => {})
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) tryPlay()
        else v.pause()
      },
      { rootMargin: "0px 0px -15% 0px" },
    )
    io.observe(v)
    v.addEventListener("canplay", tryPlay)
    return () => {
      io.disconnect()
      v.removeEventListener("canplay", tryPlay)
    }
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduce}
      preload="metadata"
      controls={reduce}
      aria-label={alt}
      className="h-full w-full object-cover"
    />
  )
}

function Lightbox({ m, open, onOpenChange }: { m: Media; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm" />
        <Dialog.Content
          onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center p-4 focus:outline-none sm:p-10"
        >
          <Dialog.Title className="sr-only">{m.label}</Dialog.Title>
          <Dialog.Description className="sr-only">{m.alt}</Dialog.Description>
          <Dialog.Close
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/60 text-zinc-200 transition-colors hover:border-emerald-400 hover:text-emerald-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
          {m.type === "video" ? (
            <video
              src={m.src}
              poster={m.poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label={m.alt}
              className="max-h-[85vh] max-w-full border border-white/10 bg-black"
            />
          ) : (
            <img
              src={m.src}
              alt={m.alt}
              className={`max-h-[85vh] max-w-full border border-white/10 object-contain ${m.light ? "bg-white" : "bg-black"}`}
            />
          )}
          <p className="mt-3 font-mono text-[11px] tracking-[0.15em] text-zinc-400">{m.label.toUpperCase()}<span className="hidden sm:inline"> · ESC TO CLOSE</span></p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function MediaPanel({ media }: { media: Media[] }) {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const m = media[active]
  return (
    <div className="-mx-6 -mt-6 mb-6 md:-mx-8 md:-mt-8">
      <div className={`group relative aspect-[4/3] overflow-hidden border-b border-white/10 ${m.type === "image" && m.light ? "bg-white" : "bg-black"}`}>
        {m.type === "video" ? (
          <LoopVideo key={m.src} src={m.src} poster={m.poster} alt={m.alt} />
        ) : (
          <img key={m.src} src={m.src} alt={m.alt} className="h-full w-full object-contain" loading="lazy" />
        )}
        <button
          onClick={() => setExpanded(true)}
          className="absolute inset-0 flex cursor-zoom-in items-end justify-end p-3"
          aria-label={`Expand ${m.label}`}
        >
          <span className="flex items-center gap-1.5 border border-white/20 bg-black/60 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-zinc-200 backdrop-blur-sm transition-colors group-hover:border-emerald-400 group-hover:text-emerald-300">
            <Maximize2 className="h-3.5 w-3.5" /> EXPAND
          </span>
        </button>
        <span className="pointer-events-none absolute left-3 top-3 border border-white/15 bg-black/60 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-zinc-300 backdrop-blur-sm">
          {m.label.toUpperCase()}
        </span>
      </div>
      {media.length > 1 && (
        <div className="flex gap-2 border-b border-white/10 bg-black/30 p-2">
          {media.map((x, i) => (
            <button
              key={x.src}
              onClick={() => setActive(i)}
              aria-label={`Show ${x.label}`}
              aria-pressed={i === active}
              className={`relative h-14 w-20 overflow-hidden border transition-colors ${
                i === active ? "border-emerald-400" : "border-white/10 opacity-60 hover:opacity-100"
              } ${x.type === "image" && x.light ? "bg-white" : "bg-black"}`}
            >
              <img src={x.type === "video" ? x.poster : x.src} alt="" className={`h-full w-full ${x.type === "image" && x.light ? "object-contain" : "object-cover"}`} />
              {x.type === "video" && <Play className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />}
            </button>
          ))}
        </div>
      )}
      <Lightbox m={m} open={expanded} onOpenChange={setExpanded} />
    </div>
  )
}

export default function Competitions() {
  return (
    <section id="competitions" className="py-16 md:py-24">
      <SectionHeading
        index="03"
        label="COMPETITIONS"
        title="Competitions & mentoring"
        intro="Where I learned to build robots under a deadline — and later helped students do the same."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {entries.map((e, i) => {
          const Icon = e.kind === "Mentor" ? Users : Trophy
          return (
            <Reveal key={e.name} delay={i * 0.08} className="h-full">
              <article className="panel ticks spotlight flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-emerald-400/40 md:p-8">
                {e.media && <MediaPanel media={e.media} />}
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-emerald-400/30 bg-emerald-400/10">
                    <Icon className="h-5 w-5 text-emerald-300" />
                  </span>
                  <span
                    className={`border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] ${
                      e.kind === "Mentor" ? "border-cyan-400/40 text-cyan-300" : "border-emerald-400/40 text-emerald-300"
                    }`}
                  >
                    {e.kind.toUpperCase()}
                  </span>
                </div>
                <p className="mt-5 font-mono text-xs tracking-[0.14em] text-zinc-500">{e.when}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-zinc-50">{e.name}</h3>
                <p className="text-emerald-300">
                  {e.role} <span className="text-zinc-500">· {e.team}</span>
                </p>
                {(e.result || e.theme) && (
                  <p className="mt-3 flex flex-wrap gap-2 text-sm">
                    {e.result && <span className="border border-lime-400/40 bg-lime-400/10 px-2 py-0.5 text-lime-300">{e.result}</span>}
                    {e.theme && <span className="border border-white/10 px-2 py-0.5 text-zinc-300">Theme: {e.theme}</span>}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{e.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-zinc-200">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 ${e.kind === "Mentor" ? "bg-cyan-400" : "bg-emerald-400"}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {e.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
