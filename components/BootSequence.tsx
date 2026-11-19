"use client"

import { useEffect, useState } from "react"

const LINES: [string, string][] = [
  ["muted", "$ ros2 launch keval portfolio.launch.py"],
  ["info", "[INFO] [launch]: Default logging verbosity is set to INFO"],
  ["info", "[INFO] [lidar_driver-1]: process started with pid [2019]"],
  ["info", "[INFO] [sensor_check-2]: process started with pid [2023]"],
  ["ok", "[sensor_check-2] LiDAR ✓  Camera ✓  Radar ✓  GNSS ✓  IMU ✓"],
  ["info", "[fleet_manager-3] connected to 10+ AMRs · Temple, TX"],
  ["info", "[portfolio_node-4] loading experience: Meta · Tatum Robotics · The Innovation Story · KJSCE Robocon"],
  ["info", "[portfolio_node-4] loading projects: sensor fusion · RL 7-DOF · IMU Allan variance · +9"],
  ["ok", "[portfolio_node-4] ready. welcome to kevalvisaria.com"],
]

/**
 * Short ROS-launch style intro. Pure CSS timing so it also clears itself
 * without JavaScript; JS lets visitors skip it and remembers it per session.
 * A tiny inline script in <head> hides it on repeat visits before first paint.
 */
export default function BootSequence() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem("kv-booted", "1")
    } catch {}
    const skip = () => setGone(true)
    const t = window.setTimeout(skip, 3400)
    window.addEventListener("keydown", skip, { once: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener("keydown", skip)
    }
  }, [])

  if (gone) return null

  return (
    <div id="boot" onClick={() => setGone(true)} className="boot fixed inset-0 z-[100] flex cursor-pointer flex-col justify-center bg-[#060607] px-6 sm:px-12">
      <div className="mx-auto w-full max-w-3xl font-mono text-[12px] leading-relaxed sm:text-sm">
        {LINES.map(([kind, text], i) => (
          <div
            key={i}
            className={`boot-line whitespace-pre-wrap ${
              kind === "ok" ? "text-emerald-300" : kind === "muted" ? "text-zinc-100" : "text-zinc-500"
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {text}
          </div>
        ))}
        <div className="boot-line mt-6 h-[3px] w-full overflow-hidden bg-white/10" style={{ animationDelay: "0s" }}>
          <div className="boot-bar h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-lime-300" />
        </div>
        <p className="mt-3 text-[11px] text-zinc-600">click or press any key to skip</p>
      </div>
    </div>
  )
}
