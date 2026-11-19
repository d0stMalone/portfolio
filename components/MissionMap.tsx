"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/**
 * Sidebar mini-map: each section is a waypoint, and a robot drives the route
 * as the page scrolls. Clicking a waypoint navigates there.
 */
const WAYPOINTS = [
  { id: "about", x: 18, y: 92 },
  { id: "experience", x: 70, y: 62 },
  { id: "projects", x: 128, y: 86 },
  { id: "education", x: 176, y: 40 },
  { id: "skills", x: 222, y: 70 },
  { id: "contact", x: 240, y: 18 },
]

function sectionProgress(): number {
  // map scroll position onto [0, WAYPOINTS.length - 1] using section tops
  const tops = WAYPOINTS.map((w) => {
    const el = document.getElementById(w.id)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })
  const y = window.scrollY + window.innerHeight * 0.35
  const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4
  if (atBottom) return WAYPOINTS.length - 1
  for (let i = 0; i < tops.length - 1; i++) {
    if (y < tops[i + 1]) return i + Math.max(0, Math.min(1, (y - tops[i]) / Math.max(tops[i + 1] - tops[i], 1)))
  }
  return WAYPOINTS.length - 1
}

export default function MissionMap({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [p, setP] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    const update = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => setP(sectionProgress()))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const i = Math.min(Math.floor(p), WAYPOINTS.length - 2)
  const f = p - i
  const a = WAYPOINTS[i]
  const b = WAYPOINTS[i + 1]
  const rx = a.x + (b.x - a.x) * f
  const ry = a.y + (b.y - a.y) * f
  const heading = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI

  const route = useMemo(() => WAYPOINTS.map((w) => `${w.x},${w.y}`).join(" "), [])
  const done = WAYPOINTS.slice(0, i + 1)
    .map((w) => `${w.x},${w.y}`)
    .concat(`${rx},${ry}`)
    .join(" ")
  const pct = Math.round((p / (WAYPOINTS.length - 1)) * 100)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="hud-label">Mission</p>
        <p className="font-mono text-[10px] text-zinc-500">{pct.toString().padStart(3, " ")}% · wp {Math.min(i + (f > 0.98 ? 2 : 1), 6)}/6</p>
      </div>
      <svg viewBox="0 0 256 110" className="w-full border border-white/10 bg-[#050807]">
        <defs>
          <pattern id="mm-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="rgba(52,211,153,0.07)" />
          </pattern>
        </defs>
        <rect width="256" height="110" fill="url(#mm-grid)" />
        {/* obstacles */}
        <g fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)">
          <rect x="34" y="20" width="40" height="18" />
          <rect x="96" y="40" width="22" height="30" />
          <rect x="140" y="72" width="50" height="14" />
          <rect x="196" y="28" width="14" height="22" />
        </g>
        <polyline points={route} fill="none" stroke="rgba(52,211,153,0.35)" strokeDasharray="3 3" />
        <polyline points={done} fill="none" stroke="#34d399" strokeWidth="1.6" />
        {WAYPOINTS.map((w, idx) => (
          <g key={w.id} className="cursor-pointer" onClick={() => onNavigate(w.id)}>
            <circle cx={w.x} cy={w.y} r="9" fill="transparent" />
            <circle
              cx={w.x}
              cy={w.y}
              r="3.2"
              fill={idx <= p + 0.02 ? "#34d399" : "#050807"}
              stroke={idx <= p + 0.02 ? "#34d399" : "rgba(255,255,255,0.35)"}
            />
            <text x={w.x} y={w.y - 7} textAnchor="middle" fontSize="7" fill="rgba(161,161,170,0.8)" fontFamily="monospace">
              0{idx + 1}
            </text>
          </g>
        ))}
        {/* robot */}
        <g transform={`translate(${rx} ${ry}) rotate(${heading})`}>
          <circle r="11" fill="rgba(52,211,153,0.12)">
            <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <rect x="-5" y="-4" width="10" height="8" fill="#050807" stroke="#6ee7b7" />
          <path d="M5 -3 L9 0 L5 3 Z" fill="#a3e635" />
        </g>
      </svg>
    </div>
  )
}
