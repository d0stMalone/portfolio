"use client"

import { motion, useReducedMotion } from "framer-motion"

const facts = [
  { k: "Role", v: "Robotics Field Engineer" },
  { k: "Where", v: "Meta (via Beyondsoft) · Temple, TX" },
  { k: "Focus", v: "Field testing · sensor validation · fleet diagnostics" },
  { k: "Foundation", v: "Embedded C/C++ · PCB bring-up · sensor fusion" },
  { k: "Building next", v: "Autonomous exploration & patrol for my ROS 2 data-centre robot" },
]

const journey = [
  { city: "Mumbai", years: "2019 – 23", what: "B.Tech Electronics", x: 40 },
  { city: "Boston", years: "2023 – 25", what: "MS Robotics", x: 200 },
  { city: "Temple, TX", years: "2025 –", what: "AMR fleet in production", x: 360 },
]

export default function FieldNotes() {
  const reduce = useReducedMotion()
  return (
    <div className="panel ticks spotlight p-6">
      <div className="flex items-center justify-between">
        <p className="hud-label">Field notes</p>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-zinc-500">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> ACTIVE
        </p>
      </div>

      <dl className="mt-5 divide-y divide-white/[0.07]">
        {facts.map((f) => (
          <div key={f.k} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{f.k}</dt>
            <dd className="text-sm text-zinc-200">{f.v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Route so far</p>
      <svg viewBox="0 0 400 96" className="mt-3 w-full overflow-visible" role="img" aria-label="Mumbai, B.Tech 2019 to 2023; Boston, MS Robotics 2023 to 2025; Temple, Texas, 2025 onward">
        <line x1="40" y1="22" x2="360" y2="22" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
        <motion.line
          x1="40"
          y1="22"
          x2="360"
          y2="22"
          stroke="#ff8a3d"
          strokeWidth="1.6"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {journey.map((j, i) => {
          const last = i === journey.length - 1
          const anchor = i === 0 ? "start" : last ? "end" : "middle"
          const tx = i === 0 ? j.x - 6 : last ? j.x + 6 : j.x
          return (
            <g key={j.city}>
              {last && (
                <circle cx={j.x} cy="22" r="6" fill="rgba(255,138,61,0.25)">
                  {!reduce && <animate attributeName="r" values="6;13;6" dur="2.2s" repeatCount="indefinite" />}
                </circle>
              )}
              <circle cx={j.x} cy="22" r="5" fill={last ? "#ff8a3d" : "#09090b"} stroke="#ff8a3d" strokeWidth="1.6" />
              <text x={tx} y="52" textAnchor={anchor} fontSize="13" fontWeight="600" fill="#f4f4f5" fontFamily="var(--font-display), sans-serif">
                {j.city}
              </text>
              <text x={tx} y="68" textAnchor={anchor} fontSize="9" fill="#ffb070" fontFamily="var(--font-mono), monospace" letterSpacing="0.06em">
                {j.years}
              </text>
              <text x={tx} y="84" textAnchor={anchor} fontSize="10" fill="#a1a1aa" fontFamily="var(--font-body), sans-serif">
                {j.what}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
