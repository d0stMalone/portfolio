"use client"

import { useEffect, useRef, useState } from "react"
import LidarScan from "./LidarScan"

/**
 * RViz-style scene of a warehouse:
 *  - /map      static point cloud of walls and racks (grey)
 *  - /scan     a 3-layer LiDAR that is actually ray-cast against the world each frame (cyan)
 *  - /costmap  local inflation layer around the robot, computed from obstacle distances (orange)
 *  - /plan     global path (dashed) the robot follows
 *  - tracked people and a second AMR moving through the aisles (amber boxes)
 * Falls back to the 2D scan if WebGL isn't available.
 */

type Box = { cx: number; cz: number; hx: number; hz: number; h: number }

const RACKS: Box[] = []
for (const z of [-5.5, -1.5, 2.5]) {
  RACKS.push({ cx: -8, cz: z, hx: 3, hz: 0.55, h: 2.6 })
  RACKS.push({ cx: 1, cz: z, hx: 3, hz: 0.55, h: 2.6 })
}
const W = 14
const D = 9
const WALLS: Box[] = [
  { cx: 0, cz: -D, hx: W, hz: 0.1, h: 3.2 },
  { cx: 0, cz: D, hx: W, hz: 0.1, h: 3.2 },
  { cx: -W, cz: 0, hx: 0.1, hz: D, h: 3.2 },
  { cx: W, cz: -5, hx: 0.1, hz: 4, h: 3.2 }, // doorway on the right
  { cx: W, cz: 6, hx: 0.1, hz: 3, h: 3.2 },
]
const PALLETS: Box[] = [
  { cx: -10, cz: 6.8, hx: 0.6, hz: 0.5, h: 0.9 },
  { cx: -4, cz: 7.2, hx: 0.6, hz: 0.5, h: 1.2 },
  { cx: 6, cz: 6.9, hx: 0.6, hz: 0.5, h: 0.8 },
  { cx: 10.5, cz: 7.1, hx: 0.6, hz: 0.5, h: 1.1 },
  { cx: 8.5, cz: -7.6, hx: 0.6, hz: 0.5, h: 0.9 },
]
const STATIC_BOXES = [...RACKS, ...WALLS, ...PALLETS]

function rayBox(ox: number, oz: number, dx: number, dz: number, b: Box) {
  const ix = 1 / (dx || 1e-9)
  const iz = 1 / (dz || 1e-9)
  let t1 = (b.cx - b.hx - ox) * ix
  let t2 = (b.cx + b.hx - ox) * ix
  let tmin = Math.min(t1, t2)
  let tmax = Math.max(t1, t2)
  t1 = (b.cz - b.hz - oz) * iz
  t2 = (b.cz + b.hz - oz) * iz
  tmin = Math.max(tmin, Math.min(t1, t2))
  tmax = Math.min(tmax, Math.max(t1, t2))
  return tmax >= Math.max(tmin, 0) ? Math.max(tmin, 0) : Infinity
}

function distBox(x: number, z: number, b: Box) {
  const dx = Math.max(Math.abs(x - b.cx) - b.hx, 0)
  const dz = Math.max(Math.abs(z - b.cz) - b.hz, 0)
  return Math.hypot(dx, dz)
}

export default function LidarHero3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const poseRef = useRef<HTMLSpanElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let disposed = false
    let cleanup = () => {}

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
      const disposables: { dispose: () => void }[] = []
      const keep = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" })

      const scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x09090b, 26, 52)
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120)
      const px = renderer.getPixelRatio()

      // ── floor grid ────────────────────────────────────────────
      const grid = new THREE.GridHelper(32, 32, 0x2a2b30, 0x1a1b1f)
      const gridMat = grid.material as unknown as { transparent: boolean; opacity: number }
      gridMat.transparent = true
      gridMat.opacity = 0.7
      scene.add(grid)

      // ── /map: static point cloud ──────────────────────────────
      const mapPts: number[] = []
      const r = (a: number, b: number) => a + Math.random() * (b - a)
      const surfaceSample = (b: Box, density: number, levels?: number) => {
        const perim = 4 * (b.hx + b.hz)
        const n = Math.floor(perim * density)
        for (let i = 0; i < n; i++) {
          const s = Math.random() * perim
          let x: number
          let z: number
          if (s < 2 * b.hx) {
            x = b.cx - b.hx + s
            z = b.cz - b.hz
          } else if (s < 4 * b.hx) {
            x = b.cx - b.hx + (s - 2 * b.hx)
            z = b.cz + b.hz
          } else if (s < 4 * b.hx + 2 * b.hz) {
            x = b.cx - b.hx
            z = b.cz - b.hz + (s - 4 * b.hx)
          } else {
            x = b.cx + b.hx
            z = b.cz - b.hz + (s - 4 * b.hx - 2 * b.hz)
          }
          const y = levels ? (Math.floor(Math.random() * (levels + 1)) * b.h) / levels + r(-0.02, 0.02) : r(0, b.h)
          mapPts.push(x + r(-0.02, 0.02), y, z + r(-0.02, 0.02))
        }
      }
      WALLS.forEach((b) => surfaceSample(b, 26))
      PALLETS.forEach((b) => surfaceSample(b, 70))
      RACKS.forEach((b) => {
        surfaceSample(b, 40)
        surfaceSample(b, 50, 3)
        for (let lvl = 0; lvl < 3; lvl++)
          for (let k = 0; k < 7; k++) {
            if (Math.random() < 0.25) continue
            const gx = b.cx - b.hx + 0.45 + k * 0.85
            for (let j = 0; j < 45; j++) mapPts.push(gx + r(-0.32, 0.32), (lvl * b.h) / 3 + r(0.05, 0.62), b.cz + r(-b.hz + 0.08, b.hz - 0.08))
          }
      })
      const mapGeo = keep(new THREE.BufferGeometry())
      mapGeo.setAttribute("position", new THREE.Float32BufferAttribute(mapPts, 3))
      const mapMat = keep(
        new THREE.ShaderMaterial({
          uniforms: { uPx: { value: px } },
          transparent: true,
          depthWrite: false,
          vertexShader: `uniform float uPx; varying float vH;
            void main(){ vH = position.y; vec4 mv = modelViewMatrix*vec4(position,1.);
              gl_PointSize = 1.5*uPx*(18./-mv.z); gl_Position = projectionMatrix*mv; }`,
          fragmentShader: `varying float vH;
            void main(){ vec2 c=gl_PointCoord-.5; if(dot(c,c)>.25) discard;
              vec3 col = mix(vec3(.42,.43,.47), vec3(.78,.79,.82), clamp(vH/3.,0.,1.));
              gl_FragColor = vec4(col, .55); }`,
        }),
      )
      scene.add(new THREE.Points(mapGeo, mapMat))

      // ── /plan: global path ────────────────────────────────────
      const path = new THREE.CatmullRomCurve3(
        [
          [-11.5, 0.5],
          [-3.5, 0.45],
          [6, 0.55],
          [10.5, -0.6],
          [10.2, -3.4],
          [1, -3.5],
          [-6, -3.45],
          [-11.8, -3.3],
          [-12.3, -1.4],
        ].map(([x, z]) => new THREE.Vector3(x, 0.03, z)),
        true,
        "centripetal",
      )
      const planGeo = keep(new THREE.BufferGeometry().setFromPoints(path.getPoints(400)))
      const plan = new THREE.Line(planGeo, keep(new THREE.LineDashedMaterial({ color: 0xff8a3d, dashSize: 0.3, gapSize: 0.2, transparent: true, opacity: 0.6 })))
      plan.computeLineDistances()
      scene.add(plan)
      const localGeo = keep(new THREE.BufferGeometry().setFromPoints(new Array(24).fill(0).map(() => new THREE.Vector3())))
      scene.add(new THREE.Line(localGeo, keep(new THREE.LineBasicMaterial({ color: 0xfbbf24 }))))

      // ── robots and people ─────────────────────────────────────
      const makeAmr = (color: number, opacity: number) => {
        const g = new THREE.Group()
        const bodyGeo = keep(new THREE.BoxGeometry(1.1, 0.4, 0.78))
        const body = new THREE.Mesh(bodyGeo, keep(new THREE.MeshBasicMaterial({ color, transparent: true, opacity })))
        body.position.y = 0.3
        const edges = new THREE.LineSegments(keep(new THREE.EdgesGeometry(bodyGeo)), keep(new THREE.LineBasicMaterial({ color })))
        edges.position.copy(body.position)
        g.add(body, edges)
        return g
      }
      const robot = makeAmr(0xff8a3d, 0.28)
      const puck = new THREE.Mesh(keep(new THREE.CylinderGeometry(0.15, 0.15, 0.18, 20)), keep(new THREE.MeshBasicMaterial({ color: 0x22d3ee })))
      puck.position.set(0.22, 0.6, 0)
      const nose = new THREE.Mesh(keep(new THREE.ConeGeometry(0.13, 0.36, 3)), keep(new THREE.MeshBasicMaterial({ color: 0xfbbf24 })))
      nose.rotation.z = -Math.PI / 2
      nose.position.set(0.8, 0.3, 0)
      robot.add(puck, nose)
      scene.add(robot)

      const amr2 = makeAmr(0x8b8b93, 0.12)
      scene.add(amr2)

      const personBox = keep(new THREE.EdgesGeometry(keep(new THREE.BoxGeometry(0.55, 1.75, 0.55))))
      const personMat = keep(new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.8 }))
      const people = [0, 1].map(() => {
        const m = new THREE.LineSegments(personBox, personMat)
        m.position.y = 0.875
        scene.add(m)
        return m
      })

      // ── /costmap: local inflation layer ───────────────────────
      const CELLS = 44
      const RES = 0.25
      const cellGeo = keep(new THREE.PlaneGeometry(RES * 0.92, RES * 0.92))
      cellGeo.rotateX(-Math.PI / 2)
      const cellMat = keep(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }))
      const costmap = new THREE.InstancedMesh(cellGeo, cellMat, CELLS * CELLS)
      costmap.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      const m4 = new THREE.Matrix4()
      const col = new THREE.Color()
      for (let i = 0; i < CELLS * CELLS; i++) {
        costmap.setMatrixAt(i, m4)
        costmap.setColorAt(i, col.setRGB(0, 0, 0))
      }
      scene.add(costmap)

      // ── /scan: ray-cast LiDAR ─────────────────────────────────
      const LAYERS = [0.35, 0.8, 1.35]
      const MAX_R = 10
      const CAP = 6000
      const scanPos = new Float32Array(CAP * 3)
      const scanBorn = new Float32Array(CAP).fill(-1e9)
      const scanGeo = keep(new THREE.BufferGeometry())
      const posAttr = new THREE.BufferAttribute(scanPos, 3)
      const bornAttr = new THREE.BufferAttribute(scanBorn, 1)
      posAttr.setUsage(THREE.DynamicDrawUsage)
      bornAttr.setUsage(THREE.DynamicDrawUsage)
      scanGeo.setAttribute("position", posAttr)
      scanGeo.setAttribute("born", bornAttr)
      const scanMat = keep(
        new THREE.ShaderMaterial({
          uniforms: { uNow: { value: 0 }, uPx: { value: px }, uLife: { value: 1.1 } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: `attribute float born; uniform float uNow; uniform float uPx; uniform float uLife; varying float vA;
            void main(){ float age = uNow - born; vA = clamp(1. - age/uLife, 0., 1.);
              vec4 mv = modelViewMatrix*vec4(position,1.);
              gl_PointSize = (1.4 + 2.2*vA)*uPx*(18./-mv.z); gl_Position = projectionMatrix*mv; }`,
          fragmentShader: `varying float vA;
            void main(){ if(vA<=0.) discard; vec2 c=gl_PointCoord-.5; if(dot(c,c)>.25) discard;
              gl_FragColor = vec4(mix(vec3(.13,.83,.93), vec3(.8,.98,1.), vA*vA), vA); }`,
        }),
      )
      const scanPoints = new THREE.Points(scanGeo, scanMat)
      scanPoints.frustumCulled = false
      scene.add(scanPoints)
      let head = 0

      const beamGeo = keep(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(MAX_R, 0, 0)]))
      const beam = new THREE.Line(beamGeo, keep(new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.35 })))
      scene.add(beam)

      // ── sizing, input ─────────────────────────────────────────
      const resize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / Math.max(h, 1)
        camera.fov = camera.aspect < 1 ? 50 : 38
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

      // ── simulation ────────────────────────────────────────────
      const tan = new THREE.Vector3()
      const tmp = new THREE.Vector3()
      const cam = { x: 0, y: 0 }
      let sweep = 0
      let lastT = 0
      let lastPose = -1
      const start = performance.now()
      const SPIN = Math.PI * 2 * 1.25

      const dynamicBoxes = (t: number): Box[] => {
        const pa = Math.sin(t * 0.18) * 9
        const pb = Math.sin(t * 0.27 + 1) * 7.5
        const a2 = Math.sin(t * 0.12) * 10.5
        people[0].position.set(pa, 0.875, 4.6)
        people[1].position.set(-3.5, 0.875, pb)
        amr2.position.set(a2, 0, -7.6)
        amr2.rotation.y = Math.cos(t * 0.12) > 0 ? 0 : Math.PI
        return [
          { cx: pa, cz: 4.6, hx: 0.25, hz: 0.25, h: 1.75 },
          { cx: -3.5, cz: pb, hx: 0.25, hz: 0.25, h: 1.75 },
          { cx: a2, cz: -7.6, hx: 0.55, hz: 0.39, h: 0.5 },
        ]
      }

      const step = (t: number, fullSweep = false) => {
        const dt = Math.min(Math.max(t - lastT, 0), 0.1)
        lastT = t
        const u = Math.min(Math.max((t / 48) % 1, 0), 0.9999)
        path.getPointAt(u, robot.position)
        robot.position.y = 0
        path.getTangentAt(u, tan)
        const yaw = Math.atan2(-tan.z, tan.x)
        robot.rotation.y = yaw
        const rx = robot.position.x
        const rz = robot.position.z

        const lp = localGeo.attributes.position
        for (let i = 0; i < 24; i++) {
          path.getPointAt(Math.min((u + i * 0.0016) % 1, 0.9999), tmp)
          lp.setXYZ(i, tmp.x, 0.06, tmp.z)
        }
        lp.needsUpdate = true

        const world = STATIC_BOXES.concat(dynamicBoxes(t))

        // LiDAR: cast rays for the slice swept this frame
        const from = sweep
        sweep += fullSweep ? Math.PI * 2 : SPIN * dt
        const RES_A = (0.7 * Math.PI) / 180
        for (let a = from; a < sweep; a += RES_A) {
          const dx = Math.cos(a)
          const dz = Math.sin(a)
          for (const ly of LAYERS) {
            let best = MAX_R
            for (const b of world) {
              if (b.h < ly) continue
              const hit = rayBox(rx, rz, dx, dz, b)
              if (hit < best) best = hit
            }
            if (best < MAX_R) {
              const d = best + (Math.random() - 0.5) * 0.04
              scanPos[head * 3] = rx + dx * d
              scanPos[head * 3 + 1] = ly
              scanPos[head * 3 + 2] = rz + dz * d
              scanBorn[head] = t
              head = (head + 1) % CAP
            }
          }
        }
        sweep %= Math.PI * 2
        posAttr.needsUpdate = true
        bornAttr.needsUpdate = true
        scanMat.uniforms.uNow.value = t
        beam.position.set(rx, 0.6, rz)
        beam.rotation.y = -sweep

        // costmap
        const ox = Math.round(rx / RES) * RES - (CELLS / 2) * RES
        const oz = Math.round(rz / RES) * RES - (CELLS / 2) * RES
        let k = 0
        for (let i = 0; i < CELLS; i++)
          for (let j = 0; j < CELLS; j++, k++) {
            const cx = ox + i * RES
            const cz = oz + j * RES
            let d = 99
            for (const b of world) {
              const v = distBox(cx, cz, b)
              if (v < d) d = v
            }
            const fromRobot = Math.hypot(cx - rx, cz - rz)
            const fade = Math.max(0, 1 - fromRobot / ((CELLS / 2) * RES))
            const cost = d < 0.15 ? 1 : Math.max(0, 1 - (d - 0.15) / 0.9) ** 1.6
            const v = cost * fade
            m4.makeTranslation(cx, 0.015, cz)
            costmap.setMatrixAt(k, m4)
            if (d < 0.15) col.setRGB(0.9 * fade, 0.25 * fade, 0.05 * fade)
            else col.setRGB(0.55 * v, 0.27 * v, 0.06 * v)
            costmap.setColorAt(k, col)
          }
        costmap.instanceMatrix.needsUpdate = true
        if (costmap.instanceColor) costmap.instanceColor.needsUpdate = true

        // camera: wide isometric view, slow orbit + mouse parallax
        cam.x += (mouse.x - cam.x) * 0.04
        cam.y += (mouse.y - cam.y) * 0.04
        const orbit = 0.95 + Math.sin(t * 0.05) * 0.3 + cam.x * 0.3
        const R = camera.aspect < 1 ? 26 : 21
        camera.position.set(rx * 0.25 + Math.cos(orbit) * R, 14 - cam.y * 2, rz * 0.25 + Math.sin(orbit) * R)
        camera.lookAt(rx * 0.35, 0, rz * 0.35)

        if (poseRef.current && t - lastPose > 0.12) {
          lastPose = t
          poseRef.current.textContent = `x ${rx.toFixed(2).padStart(6)}  y ${(-rz).toFixed(2).padStart(6)}  θ ${((yaw * 180) / Math.PI)
            .toFixed(0)
            .padStart(4)}°`
        }
      }

      let raf = 0
      const loop = (now: number) => {
        if (visible) {
          step(Math.max(0, now - start) / 1000)
          renderer.render(scene, camera)
        }
        raf = requestAnimationFrame(loop)
      }
      if (reduce) {
        scanMat.uniforms.uLife.value = 1e9
        step(8, true)
        renderer.render(scene, camera)
      } else raf = requestAnimationFrame(loop)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        window.removeEventListener("pointermove", onMove)
        disposables.forEach((d) => d.dispose())
        costmap.dispose()
        grid.geometry.dispose()
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
      <div className="pointer-events-none absolute bottom-3 right-3 hidden border border-white/10 bg-black/60 px-3 py-2 font-mono text-[10px] leading-relaxed text-zinc-400 backdrop-blur-sm sm:block">
        <div className="text-emerald-300">/amr_01/pose</div>
        <span ref={poseRef} className="whitespace-pre">
          x   0.00  y   0.00  θ    0°
        </span>
      </div>
    </div>
  )
}
