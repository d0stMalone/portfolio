import Link from "next/link"

export const metadata = { title: "404 — Keval Visaria" }

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-6 text-zinc-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="panel ticks relative w-full max-w-xl p-8 md:p-10">
        <p className="hud-label">[nav2] GOAL FAILED</p>
        <h1 className="mt-4 font-display text-6xl font-bold tracking-tight text-zinc-50">
          4<span className="text-emerald-400">0</span>4
        </h1>
        <p className="mt-3 text-lg text-zinc-300">This page isn&apos;t on the map.</p>
        <pre className="mt-6 overflow-x-auto border border-white/10 bg-black/40 p-4 font-mono text-xs leading-relaxed text-zinc-400">
{`[planner_server] No valid path to goal
[bt_navigator]  Goal aborted: unknown location
[recovery]      Clearing costmap... returning home`}
        </pre>
        <Link href="/" className="btn-primary mt-8">
          ← Return to kevalvisaria.com
        </Link>
      </div>
    </main>
  )
}
