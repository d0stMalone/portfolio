"use client"

import { Trophy, Users } from "lucide-react"
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
}

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
  },
  {
    name: "FIRST Tech Challenge",
    role: "Mentor",
    team: "via The Innovation Story · also FRC",
    when: "2022 – 2023",
    kind: "Mentor",
    summary:
      "FIRST's high-school robotics programme: student teams design, build and program robots to play a new game each season. I coached teams through FTC and FIRST Robotics Competition (FRC).",
    points: [
      "Coached high-school students through robot design, build and programming",
      "Hands-on guidance on mechanisms, wiring and control code for autonomous and driver-controlled periods",
      "Helped teams turn ideas into robots that could complete complex game tasks",
    ],
    tags: ["Mentoring", "STEM Outreach", "Java", "Robot Design", "FTC", "FRC"],
  },
]

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
              <article className="panel ticks spotlight flex h-full flex-col p-6 transition-colors duration-300 hover:border-emerald-400/40 md:p-8">
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
