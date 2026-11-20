"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TerminalSquare, X } from "lucide-react"
import { projects } from "../lib/projects"
import { site } from "../lib/site"

type Line = { id: number; node: ReactNode }

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 hover:text-cyan-200">
    {children}
  </a>
)

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "ls projects",
  "open",
  "experience",
  "skills",
  "ros2 topic list",
  "ros2 topic echo /keval/status",
  "neofetch",
  "contact",
  "github",
  "linkedin",
  "sudo hire keval",
  "goto",
  "clear",
  "exit",
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const offset = window.innerWidth >= 1024 ? 32 : 80
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
  return true
}

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const nextId = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const print = useCallback((...nodes: ReactNode[]) => {
    setLines((ls) => [...ls, ...nodes.map((node) => ({ id: nextId.current++, node }))])
  }, [])

  // greeting
  useEffect(() => {
    print(
      <span className="text-emerald-300">keval_os 25.11 (ROS 2) — interactive shell</span>,
      <span className="text-zinc-500">Type <b className="text-zinc-300">help</b> to see what you can do. Tab completes, ↑/↓ for history.</span>,
    )
  }, [print])

  // toggle with ` or ~, close with Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable=true]")
      if ((e.key === "`" || e.key === "~") && (!typing || e.target === inputRef.current)) {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === "Escape") setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-terminal", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-terminal", onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, " ")
    print(
      <span>
        <span className="text-emerald-400">keval@amr-01</span>
        <span className="text-zinc-500">:~$ </span>
        <span className="text-zinc-100">{raw}</span>
      </span>,
    )
    if (!cmd) return
    setHistory((h) => [cmd, ...h].slice(0, 50))
    setHIdx(-1)
    const [head, ...rest] = cmd.split(" ")
    const arg = rest.join(" ")

    switch (true) {
      case cmd === "help":
        print(
          <div className="grid grid-cols-[auto_1fr] gap-x-6 text-zinc-300">
            {[
              ["whoami", "who is this guy?"],
              ["ls projects", "list projects"],
              ["open <name>", "project details, e.g. open rl"],
              ["experience", "where I've worked"],
              ["skills", "the stack"],
              ["ros2 topic list", "available topics"],
              ["ros2 topic echo /keval/status", "live status"],
              ["neofetch", "system info"],
              ["contact", "how to reach me"],
              ["goto <section>", "jump to a section"],
              ["sudo hire keval", "you know you want to"],
              ["clear / exit", ""],
            ].map(([c, d]) => (
              <div key={c} className="contents">
                <span className="text-cyan-300">{c}</span>
                <span className="text-zinc-500">{d}</span>
              </div>
            ))}
          </div>,
        )
        break
      case cmd === "whoami":
        print(
          <span>
            <b className="text-zinc-100">{site.name}</b> — {site.role}. I deploy, validate and debug autonomous mobile
            robots in production at Meta (via Beyondsoft) in Temple, TX. Master's in Robotics, Northeastern. Embedded at heart.
          </span>,
        )
        break
      case cmd === "ls" || cmd === "ls projects" || cmd === "ls ~/projects":
        print(
          <div className="grid gap-x-6 sm:grid-cols-2">
            {projects.map((p) => (
              <span key={p.slug}>
                <span className={p.featured ? "text-lime-300" : "text-cyan-300"}>{p.slug}/</span>
              </span>
            ))}
          </div>,
          <span className="text-zinc-500">open one with: open {projects[1].slug}</span>,
        )
        break
      case head === "open" || head === "cat": {
        const q = arg.toLowerCase().replace(/\/$/, "")
        const p = projects.find((x) => x.slug === q) || (q && projects.find((x) => x.slug.includes(q) || x.title.toLowerCase().includes(q)))
        if (!p) {
          print(<span className="text-red-300">open: {arg || "<name>"}: no such project. Try `ls projects`.</span>)
          break
        }
        print(
          <div>
            <div className="text-lime-300">{p.title}</div>
            <div className="text-zinc-300">{p.summary}</div>
            {p.highlight && <div className="text-emerald-300">→ {p.highlight}</div>}
            <div className="text-zinc-500">[{p.skills.join(", ")}]</div>
            {p.github && (
              <div>
                code: <A href={p.github}>{p.github.replace("https://", "")}</A>
              </div>
            )}
          </div>,
        )
        break
      }
      case cmd === "experience":
        print(
          <div className="text-zinc-300">
            <div><span className="text-lime-300">2025–now</span>  Robotics Field Engineer · Meta (via Beyondsoft)</div>
            <div><span className="text-cyan-300">2024</span>      Embedded Systems Engineer Intern · Tatum Robotics</div>
            <div><span className="text-cyan-300">2022–23</span>   Robotics Intern · The Innovation Story</div>
            <div><span className="text-cyan-300">2021–22</span>   Electronics Team Lead · Team KJSCE Robocon</div>
          </div>,
        )
        break
      case cmd === "skills":
        print(<span className="text-zinc-300">ROS2 · C++ · Python · LiDAR · Radar · GNSS · IMU · Sensor fusion · Embedded C · STM32 · PCB design · Linux · Docker · PyTorch · OpenCV</span>)
        break
      case cmd === "ros2 topic list":
        print(
          <div className="text-zinc-300">
            {["/keval/status", "/keval/skills", "/keval/contact", "/amr_01/scan", "/amr_01/pose", "/rosout"].map((t) => (
              <div key={t}>{t}</div>
            ))}
          </div>,
        )
        break
      case cmd.startsWith("ros2 topic echo"): {
        const topic = arg.replace("topic echo", "").trim()
        if (topic === "/keval/skills") {
          run("skills")
          break
        }
        if (topic === "/keval/contact") {
          run("contact")
          break
        }
        if (topic !== "/keval/status") {
          print(<span className="text-zinc-500">WARNING: topic [{topic || "?"}] does not appear to be published yet. Try /keval/status</span>)
          break
        }
        const msgs = [
          ["role", '"Robotics Field Engineer"'],
          ["location", '"Temple, TX"'],
          ["fleet_size", "10"],
          ["sensors_validated", "[lidar, camera, radar, gnss, imu]"],
          ["coffee_level", "0.42"],
          ["open_to_chat", "true"],
        ]
        msgs.forEach(([k, v], idx) => {
          timers.current.push(
            window.setTimeout(() => {
              print(
                <span>
                  <span className="text-cyan-300">{k}</span>: <span className="text-zinc-200">{v}</span>
                </span>,
              )
              if (idx === msgs.length - 1) print(<span className="text-zinc-600">---</span>)
            }, 140 * (idx + 1)),
          )
        })
        break
      }
      case cmd === "neofetch":
        print(
          <div className="flex gap-6">
            <pre className="text-emerald-400 leading-tight">{` _  ____     __
| |/ /\\ \\   / /
| ' /  \\ \\ / /
| . \\   \\ V /
|_|\\_\\   \\_/   `}</pre>
            <div className="text-zinc-300">
              <div><span className="text-emerald-300">keval</span>@<span className="text-emerald-300">amr-01</span></div>
              <div className="text-zinc-600">--------------</div>
              <div><span className="text-cyan-300">OS</span>: keval_os (ROS 2)</div>
              <div><span className="text-cyan-300">Host</span>: Temple, TX</div>
              <div><span className="text-cyan-300">Uptime</span>: since 2019 in robotics</div>
              <div><span className="text-cyan-300">Shell</span>: bash, python, c++</div>
              <div><span className="text-cyan-300">Sensors</span>: LiDAR, radar, GNSS, IMU, camera</div>
              <div><span className="text-cyan-300">Fleet</span>: 10+ AMRs</div>
            </div>
          </div>,
        )
        break
      case cmd === "contact" || cmd === "email":
        print(
          <div>
            {site.email && (
              <div>
                email:    <A href={`mailto:${site.email}`}>{site.email}</A>
              </div>
            )}
            <div>
              linkedin: <A href={site.linkedin}>linkedin.com/in/kevalvisaria</A>
            </div>
            <div>
              github:   <A href={site.github}>github.com/d0stMalone</A>
            </div>
          </div>,
        )
        break
      case cmd === "github" || cmd === "linkedin":
        window.open(cmd === "github" ? site.github : site.linkedin, "_blank", "noopener")
        print(<span className="text-zinc-500">opening {cmd}…</span>)
        break
      case cmd === "sudo hire keval" || cmd === "hire keval": {
        if (head !== "sudo") {
          print(<span className="text-red-300">permission denied: try with sudo 😉</span>)
          break
        }
        const steps = [
          "[sudo] verifying recruiter credentials… ok",
          "Reading package lists… done",
          "Installing keval (field-robotics, ros2, embedded)…",
          "Setting up keval… ██████████ 100%",
        ]
        steps.forEach((t, idx) =>
          timers.current.push(window.setTimeout(() => print(<span className="text-zinc-300">{t}</span>), 260 * (idx + 1))),
        )
        timers.current.push(
          window.setTimeout(
            () =>
              print(
                <span className="text-lime-300">
                  ✓ Done. Next step: {site.email ? <A href={`mailto:${site.email}`}>{site.email}</A> : <A href={site.linkedin}>LinkedIn</A>}
                </span>,
              ),
            260 * (steps.length + 1),
          ),
        )
        break
      }
      case head === "goto" || head === "cd": {
        const id = arg.replace(/^~?\/?/, "").toLowerCase()
        if (scrollToId(id)) {
          print(<span className="text-zinc-500">navigating to /{id}…</span>)
          setOpen(false)
        } else print(<span className="text-red-300">no such section: {arg}. Try: about, experience, competitions, projects, education, skills, contact</span>)
        break
      }
      case cmd === "clear":
        setLines([])
        break
      case cmd === "exit" || cmd === "quit":
        setOpen(false)
        break
      case head === "sudo":
        print(<span className="text-red-300">keval is not in the sudoers file. This incident will be reported. (try: sudo hire keval)</span>)
        break
      case head === "rm":
        print(<span className="text-red-300">nice try.</span>)
        break
      default:
        print(<span className="text-red-300">{head}: command not found. Type `help`.</span>)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const n = Math.min(hIdx + 1, history.length - 1)
      if (n >= 0) {
        setHIdx(n)
        setInput(history[n])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const n = hIdx - 1
      setHIdx(n)
      setInput(n >= 0 ? history[n] : "")
    } else if (e.key === "Tab") {
      e.preventDefault()
      const v = input.trimStart()
      const pool = v.startsWith("open ") ? projects.map((p) => "open " + p.slug) : COMMANDS
      const match = pool.filter((c) => c.startsWith(v))
      if (match.length === 1) setInput(match[0])
      else if (match.length > 1) print(<span className="text-zinc-500">{match.join("   ")}</span>)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[65] flex items-center gap-2 border border-emerald-400/40 bg-[#09090b]/90 px-3 py-2 font-mono text-xs text-emerald-300 shadow-[0_0_30px_-10px_rgba(255,138,61,0.7)] backdrop-blur transition-colors hover:bg-emerald-400 hover:text-[#1a0b02]"
        aria-label="Open terminal"
      >
        <TerminalSquare className="h-4 w-4" />
        <span className="hidden sm:inline">terminal</span>
        <kbd className="hidden border border-current px-1 text-[10px] opacity-70 sm:inline">`</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Interactive terminal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[90] mx-auto flex h-[min(70vh,520px)] max-w-3xl flex-col border border-emerald-400/30 bg-[#060607]/95 shadow-[0_0_80px_-20px_rgba(255,138,61,0.5)] backdrop-blur-md sm:inset-x-6 sm:bottom-6"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-zinc-500">keval@amr-01: ~</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-zinc-500 hover:text-emerald-300" aria-label="Close terminal">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div ref={bodyRef} className="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
              {lines.map((l) => (
                <div key={l.id} className="whitespace-pre-wrap break-words">
                  {l.node}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-emerald-400">keval@amr-01</span>
                <span className="text-zinc-500">:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  className="flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
