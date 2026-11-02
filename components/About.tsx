"use client"

import { motion } from "framer-motion"
import { Bot, Radar, Route, Wrench } from "lucide-react"

const telemetry = [
  { icon: Bot, label: "Fleet in production", value: "10+ AMRs" },
  { icon: Radar, label: "Sensors validated", value: "LiDAR · Camera · Radar · GPS/GNSS · IMU" },
  { icon: Route, label: "Core stack", value: "ROS2 · C++ · Python" },
  { icon: Wrench, label: "Day-to-day", value: "Field testing · Diagnostics · Root-cause analysis" },
]

export default function About() {
  return (
    <motion.section id="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="panel relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-emerald-400/10 blur-3xl" />
          <p className="hud-label mb-4">SYS.STATUS — FIELD OPERATIONS // ROS2</p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-zinc-50 md:text-7xl">
            Keval <span className="gradient-text">Visaria</span>
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-zinc-100 md:text-2xl">
            Robotics Field Engineer
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Deploying, validating, and operating autonomous mobile robots in high-availability production
            environments — currently at Meta (via Beyondsoft) in Temple, TX. Hardware, software, and the
            messy reality in between.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {telemetry.map((item) => (
              <div key={item.label} className="bg-[#0a100f] p-5">
                <item.icon className="h-5 w-5 text-emerald-400" />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
                <p className="mt-1 text-sm font-medium leading-snug text-zinc-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[220px_1fr]">
          <div>
            <p className="section-index">01 / ABOUT</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">About me</h2>
            <img src="/robot-character.webp" alt="Field robot illustration" className="mt-6 border border-white/10 object-cover" />
            <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-zinc-500">FIELD UNIT — ILLUSTRATION</p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-zinc-300">
            <p>
              I&apos;m a robotics engineer who works where robots actually have to run: in production, outdoors,
              around people and machinery, not just in simulation. My current work is field robotics — system
              setup and validation, structured autonomy testing, sensor profiling, and debugging live robots
              with logs, ROS bags, and the tools that show what really happened.
            </p>
            <p>
              That field work sits on an embedded foundation: firmware in C and C++, PCB design and bring-up,
              control systems, and sensor fusion. Whether it&apos;s a humanoid arm, a mobile robot, or a fleet
              of autonomous units, I enjoy bringing hardware, code, and mechanics together into systems that
              keep working after deployment.
            </p>
            <p className="font-medium text-emerald-300">
              Build it, test it in the field, fix what breaks, ship it again.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
