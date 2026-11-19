"use client"

import { useEffect, useRef } from "react"

type Seg = [number, number, number, number]

// A simple "room" in normalised coordinates (-1..1), robot at the origin.
const STATIC: Seg[] = [
  // outer walls with a doorway on the right
  [-0.92, -0.85, 0.92, -0.85],
  [-0.92, 0.85, 0.92, 0.85],
  [-0.92, -0.85, -0.92, 0.85],
  [0.92, -0.85, 0.92, -0.2],
  [0.92, 0.2, 0.92, 0.85],
  // shelving
  [-0.62, -0.5, -0.25, -0.5],
  [-0.62, -0.42, -0.25, -0.42],
  [-0.62, -0.5, -0.62, -0.42],
  [0.3, 0.45, 0.68, 0.45],
  [0.3, 0.55, 0.68, 0.55],
  [0.68, 0.45, 0.68, 0.55],
  // pillar
  [-0.5, 0.35, -0.38, 0.35],
  [-0.38, 0.35, -0.38, 0.47],
  [-0.38, 0.47, -0.5, 0.47],
  [-0.5, 0.47, -0.5, 0.35],
]

function boxSegs(cx: number, cy: number, r: number): Seg[] {
  return [
    [cx - r, cy - r, cx + r, cy - r],
    [cx + r, cy - r, cx + r, cy + r],
    [cx + r, cy + r, cx - r, cy + r],
    [cx - r, cy + r, cx - r, cy - r],
  ]
}

function cast(ox: number, oy: number, dx: number, dy: number, segs: Seg[], maxR: number) {
  let best = maxR
  let dynamic = false
  for (let i = 0; i < segs.length; i++) {
    const [x1, y1, x2, y2] = segs[i]
    const ex = x2 - x1
    const ey = y2 - y1
    const den = dx * ey - dy * ex
    if (Math.abs(den) < 1e-9) continue
    const t = ((x1 - ox) * ey - (y1 - oy) * ex) / den
    const u = ((x1 - ox) * dy - (y1 - oy) * dx) / den
    if (t > 0 && u >= 0 && u <= 1 && t < best) {
      best = t
      dynamic = i >= STATIC.length
    }
  }
  return { t: best, dynamic }
}

export default function LidarScan({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const points: { x: number; y: number; born: number; dyn: boolean }[] = []
    const MAX_R = 2
    const LIFE = 2600 // ms a point stays visible
    const SPEED = (Math.PI * 2) / 2600 // one revolution every 2.6 s
    let angle = 0
    let last = performance.now()
    let raf = 0
    let size = 0
    let visible = false
    let running = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = Math.min(rect.width, rect.height)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduce && !running) {
        running = true
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(canvas)

    const person = (now: number) => {
      // a "person" walking a loop through the doorway area
      const p = (now / 9000) % 1
      const a = p * Math.PI * 2
      return { x: 0.45 + Math.cos(a) * 0.32, y: -0.25 + Math.sin(a * 2) * 0.2 }
    }

    function draw(now: number) {
      const w = canvas!.clientWidth
      const h = canvas!.clientHeight
      const cx = w / 2
      const cy = h / 2
      const scale = size * 0.48
      ctx!.clearRect(0, 0, w, h)

      // range rings + crosshair
      ctx!.strokeStyle = "rgba(255,138,61,0.10)"
      ctx!.lineWidth = 1
      for (let r = 1; r <= 4; r++) {
        ctx!.beginPath()
        ctx!.arc(cx, cy, (scale * r) / 4, 0, Math.PI * 2)
        ctx!.stroke()
      }
      ctx!.beginPath()
      ctx!.moveTo(cx - scale, cy)
      ctx!.lineTo(cx + scale, cy)
      ctx!.moveTo(cx, cy - scale)
      ctx!.lineTo(cx, cy + scale)
      ctx!.stroke()

      // sweep wedge
      if (!reduce) {
        const grad = ctx!.createConicGradient
          ? ctx!.createConicGradient(angle - 0.9, cx, cy)
          : null
        if (grad) {
          grad.addColorStop(0, "rgba(255,138,61,0)")
          grad.addColorStop(0.143, "rgba(255,138,61,0.16)")
          grad.addColorStop(0.144, "rgba(255,138,61,0)")
          ctx!.fillStyle = grad
          ctx!.beginPath()
          ctx!.arc(cx, cy, scale, 0, Math.PI * 2)
          ctx!.fill()
        }
        ctx!.strokeStyle = "rgba(255,176,112,0.55)"
        ctx!.beginPath()
        ctx!.moveTo(cx, cy)
        ctx!.lineTo(cx + Math.cos(angle) * scale, cy + Math.sin(angle) * scale)
        ctx!.stroke()
      }

      // scan points
      for (let i = points.length - 1; i >= 0; i--) {
        const pt = points[i]
        const age = reduce ? 0 : now - pt.born
        if (age > LIFE) {
          points.splice(i, 1)
          continue
        }
        const a = 1 - age / LIFE
        ctx!.fillStyle = pt.dyn ? `rgba(34,211,238,${a})` : `rgba(255,176,112,${a * 0.9})`
        const px = cx + pt.x * scale
        const py = cy + pt.y * scale
        ctx!.fillRect(px - 1, py - 1, pt.dyn ? 2.6 : 2, pt.dyn ? 2.6 : 2)
      }

      // robot
      ctx!.fillStyle = "#ff8a3d"
      ctx!.beginPath()
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.strokeStyle = "rgba(255,138,61,0.5)"
      ctx!.strokeRect(cx - 9, cy - 7, 18, 14)
    }

    function scanTo(target: number, now: number) {
      const p = person(now)
      const segs = STATIC.concat(boxSegs(p.x, p.y, 0.05))
      const step = 0.012
      while (angle < target) {
        angle += step
        const dx = Math.cos(angle)
        const dy = Math.sin(angle)
        const hit = cast(0, 0, dx, dy, segs, MAX_R)
        if (hit.t < MAX_R) {
          const noise = (Math.random() - 0.5) * 0.012
          points.push({ x: dx * (hit.t + noise), y: dy * (hit.t + noise), born: now, dyn: hit.dynamic })
        }
      }
    }

    function frame(now: number) {
      if (!visible) {
        running = false
        return
      }
      const dt = Math.min(now - last, 64)
      last = now
      scanTo(angle + dt * SPEED, now)
      if (angle > Math.PI * 4) angle -= Math.PI * 2
      draw(now)
      raf = requestAnimationFrame(frame)
    }

    if (reduce) {
      // one static full scan
      scanTo(Math.PI * 2, performance.now())
      draw(performance.now())
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
