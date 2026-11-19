"use client"

import { useEffect, useRef, useState } from "react"
import LidarScan from "./LidarScan"

/**
 * RViz-style 3D scene: a point-cloud warehouse with an AMR driving a loop.
 * Points light up as the robot's LiDAR sweep passes over them.
 * Falls back to the 2D scan if WebGL isn't available.
 */
export default function LidarHero3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const poseRef = useRef<HTMLSpanElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let disposed = false
    let cleanup = () => {}

    // check WebGL before loading three
    try {
      const c = document.createElement("canvas")
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) throw new Error("no webgl")
    } catch {
      setFallback(true)
      return
    }

    import("three").then((THREE) => {
      if (disposed) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      renderer.domElement.style.display = "block"

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x050807, 14, 34)
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)

      // ── Build the point cloud ────────────────────────────────
      const pts: number[] = []
      const rand = (a: number, b: number) => a + Math.random() * (b - a)
      const W = 14 // half-extent of warehouse in x
      const D = 9 // half-extent in z

      // floor grid (sparse dots)
      for (let x = -W; x <= W; x += 0.5) for (let z = -D; z <= D; z += 0.5) pts.push(x + rand(-0.04, 0.04), 0, z + rand(-0.04, 0.04))
      // perimeter walls
      const wall = (x1: number, z1: number, x2: number, z2: number, h: number) => {
        const len = Math.hypot(x2 - x1, z2 - z1)
        const n = Math.floor(len * 9)
        for (let i = 0; i < n; i++) {
          const t = i / n
          for (let y = 0.15; y < h; y += 0.32) pts.push(x1 + (x2 - x1) * t + rand(-0.03, 0.03), y + rand(-0.05, 0.05), z1 + (z2 - z1) * t)
        }
      }
      wall(-W, -D, W, -D, 3.2)
      wall(-W, -D, -W, D, 3.2)
      wall(W, -D, W, D, 3.2)
      // shelving racks: hollow boxes with shelves
      const rack = (cx: number, cz: number, w: number, d: number, h: number) => {
        for (let level = 0; level <= 3; level++) {
          const y = (h * level) / 3
          for (let i = 0; i < w * 10; i++) {
            const x = cx - w / 2 + (i / (w * 10)) * w
            pts.push(x, y, cz - d / 2, x, y, cz + d / 2)
            if (level > 0 && i % 3 === 0) pts.push(x, y + 0.02, cz + rand(-d / 2, d / 2))
          }
        }
        for (const sx of [-w / 2, w / 2]) for (const sz of [-d / 2, d / 2]) for (let y = 0; y < h; y += 0.08) pts.push(cx + sx, y, cz + sz)
        // boxes on shelves
        for (let level = 0; level < 3; level++) {
          const y0 = (h * level) / 3
          for (let b = 0; b < w * 1.2; b++) {
            if (Math.random() < 0.3) continue
            const bx = cx - w / 2 + 0.3 + b * 0.8
            if (bx > cx + w / 2 - 0.3) continue
            for (let k = 0; k < 40; k++) pts.push(bx + rand(-0.3, 0.3), y0 + rand(0.05, 0.6), cz + rand(-d / 2 + 0.1, d / 2 - 0.1))
          }
        }
      }
      for (const z of [-5.5, -1.5, 2.5]) {
        rack(-8, z, 6, 1.1, 2.6)
        rack(1, z, 6, 1.1, 2.6)
      }
      // a few pallets / clutter
      for (let p = 0; p < 6; p++) {
        const px = rand(-12, 12)
        const pz = rand(5.5, 8)
        for (let k = 0; k < 120; k++) pts.push(px + rand(-0.6, 0.6), rand(0, 0.9), pz + rand(-0.5, 0.5))
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3))

      const uniforms = {
        uRobot: { value: new THREE.Vector3() },
        uAngle: { value: 0 },
        uRange: { value: 7.5 },
        uPixel: { value: renderer.getPixelRatio() },
      }
      const mat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          uniform vec3 uRobot; uniform float uAngle; uniform float uRange; uniform float uPixel;
          varying float vHit; varying float vH;
          void main(){
            vec3 d = position - uRobot;
            float dist = length(d.xz);
            float a = atan(d.z, d.x);
            float diff = mod(uAngle - a, 6.28318);            // how long ago the sweep passed
            float trail = exp(-diff * 1.6);
            float inRange = 1.0 - smoothstep(uRange * 0.75, uRange, dist);
            vHit = trail * inRange * step(0.05, position.y + 0.06);
            vH = position.y;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.6 + vHit * 2.6) * uPixel * (14.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying float vHit; varying float vH;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            if (dot(c,c) > 0.25) discard;
            vec3 base = mix(vec3(0.10,0.45,0.35), vec3(0.13,0.83,0.93), clamp(vH/3.0,0.0,1.0));
            vec3 hit = mix(vec3(0.43,0.91,0.72), vec3(0.64,0.90,0.21), clamp(vH/3.0,0.0,1.0));
            float alpha = 0.16 + vHit * 0.85;
            gl_FragColor = vec4(mix(base, hit, vHit), alpha);
          }`,
      })
      const cloud = new THREE.Points(geo, mat)
      scene.add(cloud)

      // ── Robot path (Nav2-style plan) ─────────────────────────
      const path = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-11, 0.02, 0.5),
          new THREE.Vector3(-3.5, 0.02, 0.4),
          new THREE.Vector3(5.5, 0.02, 0.6),
          new THREE.Vector3(10.5, 0.02, -1.5),
          new THREE.Vector3(9.5, 0.02, -3.6),
          new THREE.Vector3(1, 0.02, -3.5),
          new THREE.Vector3(-6, 0.02, -3.4),
          new THREE.Vector3(-11.5, 0.02, -3.2),
          new THREE.Vector3(-12, 0.02, -1),
        ],
        true,
        "centripetal",
      )
      const planGeo = new THREE.BufferGeometry().setFromPoints(path.getPoints(300))
      const plan = new THREE.Line(
        planGeo,
        new THREE.LineDashedMaterial({ color: 0x34d399, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity: 0.55 }),
      )
      plan.computeLineDistances()
      scene.add(plan)

      // ── Robot (AMR) ──────────────────────────────────────────
      const robot = new THREE.Group()
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.35, 0.75),
        new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.25 }),
      )
      body.position.y = 0.28
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(body.geometry),
        new THREE.LineBasicMaterial({ color: 0x6ee7b7 }),
      )
      edges.position.copy(body.position)
      const lidar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.16, 16),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
      )
      lidar.position.set(0.25, 0.54, 0)
      const arrow = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.35, 3),
        new THREE.MeshBasicMaterial({ color: 0xa3e635 }),
      )
      arrow.rotation.z = -Math.PI / 2
      arrow.position.set(0.78, 0.28, 0)
      robot.add(body, edges, lidar, arrow)
      // footprint ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 0.95, 48),
        new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
      )
      ring.rotation.x = -Math.PI / 2
      ring.position.y = 0.02
      robot.add(ring)
      scene.add(robot)

      // sweep beam
      const beamGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(7.5, 0, 0)])
      const beam = new THREE.Line(beamGeo, new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 }))
      beam.position.y = 0.54
      scene.add(beam)

      // ── Sizing, input, loop ──────────────────────────────────
      const resize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / Math.max(h, 1)
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(mount)

      const mouse = { x: 0, y: 0 }
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1
      }
      window.addEventListener("pointermove", onMove, { passive: true })

      let visible = true
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
      io.observe(mount)

      const tmp = new THREE.Vector3()
      const cam = { x: 0, y: 0 }
      let raf = 0
      let lastPose = 0
      const start = performance.now()

      const render = (now: number) => {
        const t = reduce ? 6 : Math.max(0, now - start) / 1000
        const u = Math.min(Math.max((t / 42) % 1, 0), 0.9999)
        path.getPointAt(u, robot.position)
        path.getTangentAt(u, tmp)
        const yaw = Math.atan2(-tmp.z, tmp.x)
        robot.rotation.y = yaw

        const sweep = (t * 2 * Math.PI * 0.9) % (Math.PI * 2)
        uniforms.uRobot.value.copy(robot.position)
        uniforms.uAngle.value = sweep
        beam.position.x = robot.position.x
        beam.position.z = robot.position.z
        beam.rotation.y = -sweep

        // camera: slow orbit + mouse parallax, loosely following the robot
        cam.x += (mouse.x - cam.x) * 0.04
        cam.y += (mouse.y - cam.y) * 0.04
        const orbit = reduce ? 0.6 : 0.6 + Math.sin(t * 0.07) * 0.35 + cam.x * 0.35
        const r = 15
        camera.position.set(
          robot.position.x * 0.35 + Math.cos(orbit) * r,
          7.5 - cam.y * 1.5,
          robot.position.z * 0.35 + Math.sin(orbit) * r,
        )
        camera.lookAt(robot.position.x * 0.5, 0.6, robot.position.z * 0.5)

        renderer.render(scene, camera)

        if (poseRef.current && now - lastPose > 120) {
          lastPose = now
          poseRef.current.textContent = `x ${robot.position.x.toFixed(2).padStart(6)}  y ${(-robot.position.z)
            .toFixed(2)
            .padStart(5)}  θ ${((yaw * 180) / Math.PI).toFixed(0).padStart(4)}°`
        }
      }

      const loop = (now: number) => {
        if (visible) render(now)
        raf = requestAnimationFrame(loop)
      }
      if (reduce) render(performance.now())
      else raf = requestAnimationFrame(loop)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        window.removeEventListener("pointermove", onMove)
        geo.dispose()
        mat.dispose()
        planGeo.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  if (fallback) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <LidarScan className="aspect-square h-full max-h-[320px]" />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute bottom-3 right-3 hidden border border-white/10 bg-black/50 px-3 py-2 font-mono text-[10px] leading-relaxed text-zinc-400 backdrop-blur-sm sm:block">
        <div className="text-emerald-300">/amr_01/pose</div>
        <span ref={poseRef} className="whitespace-pre">x   0.00  y  0.00  θ    0°</span>
      </div>
    </div>
  )
}
