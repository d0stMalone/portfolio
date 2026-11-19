/**
 * KV mark: the V is a sensor's field of view — a shaded detection cone
 * with a dotted range edge and the sensor (cyan) at its apex.
 */
export default function Logo({ className = "", title = "Keval Visaria" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path d="M11 13V51" stroke="#f4f4f5" strokeWidth="5.5" />
        <path d="M13 35L28 13" stroke="#f4f4f5" strokeWidth="5.5" strokeLinecap="square" />
        <path d="M19.5 26.5L29.5 51" stroke="#f4f4f5" strokeWidth="5.5" strokeLinecap="square" />
        <path d="M45 49L35 13A37 37 0 0 1 55 13Z" fill="#ff8a3d" fillOpacity=".2" />
        <path d="M45 49L35 13M45 49L55 13" stroke="#ff8a3d" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M35 13A37 37 0 0 1 55 13" stroke="#ff8a3d" strokeWidth="1.6" strokeDasharray="1.5 2.2" strokeLinecap="round" />
        <circle cx="45" cy="49" r="3.6" fill="#22d3ee" />
      </g>
    </svg>
  )
}
