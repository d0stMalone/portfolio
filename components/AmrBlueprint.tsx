/**
 * Engineering-drawing style side view of an AMR, with callouts for the sensors
 * Keval validates in the field. Pure SVG; the LiDAR pulses gently.
 */
const O = "#ff8a3d" // signal orange
const C = "#22d3ee" // sensor cyan
const L = "rgba(228,228,231,0.75)" // linework
const F = "rgba(228,228,231,0.35)" // faint linework

function Callout({ x1, y1, x2, y2, label, sub, anchor = "start", color = O }: { x1: number; y1: number; x2: number; y2: number; label: string; sub: string; anchor?: "start" | "end"; color?: string }) {
  const tx = anchor === "start" ? x2 + 6 : x2 - 6
  return (
    <g>
      <circle cx={x1} cy={y1} r="2.6" fill={color} />
      <polyline points={`${x1},${y1} ${x2 - (anchor === "start" ? 14 : -14)},${y2} ${x2},${y2}`} fill="none" stroke={color} strokeWidth="1" />
      <text x={tx} y={y2 - 2} textAnchor={anchor} fontSize="11" fontWeight="600" fill="#f4f4f5" fontFamily="var(--font-display), sans-serif">
        {label}
      </text>
      <text x={tx} y={y2 + 11} textAnchor={anchor} fontSize="8.5" fill="#a1a1aa" fontFamily="var(--font-mono), monospace" letterSpacing="0.06em">
        {sub}
      </text>
    </g>
  )
}

export default function AmrBlueprint({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg viewBox="0 0 520 360" className="w-full" role="img" aria-label="Blueprint of an autonomous mobile robot with its sensors labelled: LiDAR, GNSS antenna, camera, radar, IMU and wheel encoders">
        <defs>
          <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" />
          </pattern>
          <pattern id="bp-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(228,228,231,0.12)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="520" height="360" fill="url(#bp-grid)" />
        <g transform="translate(20 20)">

        {/* ground */}
        <line x1="40" y1="262" x2="400" y2="262" stroke={F} strokeDasharray="6 4" />

        {/* LiDAR scan pulses */}
        <g>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="246" cy="86" r="8" fill="none" stroke={C} strokeWidth="1">
              <animate attributeName="r" values="8;90" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* mast */}
        <rect x="232" y="96" width="28" height="74" fill="url(#bp-hatch)" stroke={L} />
        {/* LiDAR puck */}
        <rect x="228" y="76" width="36" height="20" rx="3" fill="#0f1013" stroke={C} strokeWidth="1.4" />
        <line x1="232" y1="86" x2="260" y2="86" stroke={C} strokeOpacity="0.6" />
        {/* GNSS antenna */}
        <line x1="182" y1="170" x2="182" y2="118" stroke={L} />
        <rect x="170" y="110" width="24" height="8" rx="4" fill="#0f1013" stroke={L} />

        {/* chassis */}
        <rect x="96" y="170" width="250" height="68" rx="10" fill="#0f1013" stroke={L} strokeWidth="1.4" />
        <rect x="104" y="178" width="234" height="8" rx="2" fill="rgba(255,138,61,0.18)" />
        {/* safety stripe */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={112 + i * 21} y1="186" x2={120 + i * 21} y2="178" stroke={O} strokeOpacity="0.55" strokeWidth="3" />
        ))}
        {/* IMU (internal) */}
        <rect x="196" y="200" width="30" height="20" fill="none" stroke={O} strokeDasharray="3 2" />
        <text x="211" y="213" textAnchor="middle" fontSize="7" fill={O} fontFamily="var(--font-mono), monospace">IMU</text>
        {/* camera */}
        <rect x="334" y="192" width="18" height="14" rx="2" fill="#0f1013" stroke={C} />
        <circle cx="347" cy="199" r="3.5" fill="none" stroke={C} />
        {/* radar */}
        <rect x="340" y="214" width="10" height="16" rx="2" fill="none" stroke={L} />
        {/* e-stop */}
        <circle cx="116" cy="164" r="6" fill="#ef4444" stroke="#7f1d1d" />

        {/* wheels */}
        {[136, 306].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="244" r="18" fill="#09090b" stroke={L} strokeWidth="1.4" />
            <circle cx={cx} cy="244" r="6" fill="none" stroke={F} />
          </g>
        ))}

        </g>

        {/* callouts */}
        <Callout x1={284} y1={104} x2={352} y2={54} label="3D LiDAR" sub="360° SCAN" color={C} />
        <Callout x1={190} y1={134} x2={128} y2={84} label="GNSS" sub="OUTDOOR POSITIONING" anchor="end" />
        <Callout x1={216} y1={230} x2={104} y2={176} label="IMU" sub="ATTITUDE · RATES" anchor="end" />
        <Callout x1={372} y1={219} x2={414} y2={178} label="Camera" sub="PERCEPTION" color={C} />
        <Callout x1={370} y1={244} x2={414} y2={286} label="Radar" sub="ALL-WEATHER" />
        <Callout x1={156} y1={282} x2={124} y2={318} label="Drive + encoders" sub="ODOMETRY" anchor="end" />

        {/* title block */}
        <g fontFamily="var(--font-mono), monospace" fontSize="7.5" fill="#71717a">
          <rect x="372" y="318" width="136" height="30" fill="none" stroke="rgba(255,255,255,0.15)" />
          <line x1="372" y1="333" x2="508" y2="333" stroke="rgba(255,255,255,0.15)" />
          <text x="378" y="329" letterSpacing="0.03em">FIELD UNIT · SENSOR LAYOUT</text>
          <text x="378" y="344" letterSpacing="0.03em">DWG KV-001 · REV B</text>
        </g>
      </svg>
      <figcaption className="mt-3 font-mono text-[10px] tracking-[0.18em] text-zinc-500">THE SENSORS I VALIDATE IN THE FIELD</figcaption>
    </figure>
  )
}
