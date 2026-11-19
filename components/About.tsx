"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Bot, FileText, Mail, Radar, Route, Wrench } from "lucide-react"
import LidarHero3D from "./LidarHero3D"
import FieldNotes from "./FieldNotes"
import Reveal, { SectionHeading } from "./Reveal"
import { site } from "../lib/site"

const telemetry = [
  { icon: Bot, label: "Fleet in production", value: "10+ AMRs" },
  { icon: Radar, label: "Sensors validated", value: "LiDAR · Camera · Radar · GNSS · IMU" },
  { icon: Route, label: "Core stack", value: "ROS2 · C++ · Python" },
  { icon: Wrench, label: "Day-to-day", value: "Field testing · Root-cause analysis" },
]

const nowDoing = [
  "field-testing autonomous mobile robots",
  "validating LiDAR, radar & GNSS",
  "digging through ROS bags",
  "turning failures into fixes",
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = window.innerWidth >= 1024 ? 32 : 80
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
}

function Ticker() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % nowDoing.length), 2800)
    return () => clearInterval(t)
  }, [reduce])
  return (
    <motion.span
      key={i}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="text-emerald-300"
    >
      {nowDoing[i]}
      <span className="blink ml-0.5 text-emerald-400">▍</span>
    </motion.span>
  )
}

export default function About() {
  const reduce = useReducedMotion()
  return (
    <section id="about" className="pb-16 pt-4 md:pb-24 md:pt-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="panel ticks relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:pr-4">
            <p className="hud-label mb-4 flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SYS.STATUS — FIELD OPERATIONS // ROS2
            </p>
            {site.photo && (
              <img src={site.photo} alt="Keval Visaria" className="mb-5 h-20 w-20 border border-white/15 object-cover p-0.5 lg:hidden" />
            )}
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-zinc-50 md:text-6xl 2xl:text-7xl">
              Keval <span className="gradient-text">Visaria</span>
            </h1>
            <p className="mt-4 font-display text-xl font-medium text-zinc-100 md:text-2xl">Robotics Field Engineer</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              I deploy, validate and operate autonomous mobile robots in high-availability production environments —
              currently at Meta (via Beyondsoft) in Temple, TX. Hardware, software, and the messy reality in between.
            </p>
            <p className="mt-5 min-h-[2.75rem] font-mono text-sm text-zinc-400 sm:min-h-0">
              <span className="text-zinc-500">$ now:</span> <Ticker />
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                View projects <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => scrollTo("contact")} className="btn-ghost">
                <Mail className="h-4 w-4" /> Get in touch
              </button>
              {site.resumeUrl && (
                <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FileText className="h-4 w-4" /> Résumé
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-[300px] border-t border-white/10 sm:min-h-[380px] lg:border-l lg:border-t-0">
            <div className="absolute inset-0">
              <LidarHero3D className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute left-3 right-14 top-3 z-10 flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.15em]">
              <span className="border border-emerald-400/40 bg-black/50 px-2 py-1 text-emerald-300">RVIZ2</span>
              <span className="border border-white/10 bg-black/50 px-2 py-1 text-zinc-400">/map</span>
              <span className="border border-white/10 bg-black/50 px-2 py-1 text-cyan-300">/scan</span>
              <span className="border border-white/10 bg-black/50 px-2 py-1 text-emerald-300">/costmap</span>
              <span className="border border-white/10 bg-black/50 px-2 py-1 text-lime-300">/plan</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:grid-cols-4">
          {telemetry.map((item) => (
            <div key={item.label} className="spotlight bg-[#0f1013] p-4 sm:p-5">
              <item.icon className="h-5 w-5 text-emerald-400" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
              <p className="mt-1 text-sm font-medium leading-snug text-zinc-100">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-20">
        <SectionHeading index="01" label="ABOUT" title="About me" />
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <Reveal delay={0.05}>
            <div className="space-y-5 text-lg leading-relaxed text-zinc-300">
              <p>
                I&apos;m a robotics engineer who works where robots actually have to run: in production, outdoors, around
                people and machinery — not just in simulation. My current work is field robotics: system setup and
                validation, structured autonomy testing, sensor profiling, and debugging live robots with logs, ROS
                bags, and the tools that show what really happened.
              </p>
              <p>
                That field work sits on an embedded foundation: firmware in C and C++, PCB design and bring-up, control
                systems, and sensor fusion. Whether it&apos;s a humanoid arm, a mobile robot, or a fleet of autonomous
                units, I enjoy bringing hardware, code, and mechanics together into systems that keep working after
                deployment.
              </p>
              <p className="border-l-2 border-emerald-400 pl-4 font-display text-xl font-medium text-emerald-300">
                Build it, test it in the field, fix what breaks, ship it again.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <FieldNotes />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
