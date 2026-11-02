"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const navItems = ["About", "Experience", "Education", "Projects", "Skills"]

const telemetry = [
  { label: "Fleet", value: "10+ AMRs" },
  { label: "Stack", value: "ROS2 · C++ · Python" },
  { label: "Sensors", value: "LiDAR · Radar · GPS/GNSS · IMU" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.toLowerCase())
          if (!element) return null
          const rect = element.getBoundingClientRect()
          return { id: item.toLowerCase(), top: rect.top, bottom: rect.bottom }
        })
        .filter(Boolean) as { id: string; top: number; bottom: number }[]

      const triggerPosition = window.innerHeight / 3
      let current: string | null = null
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        current = "skills"
      } else {
        for (const section of sections) {
          if (section.top <= triggerPosition && section.bottom >= triggerPosition) {
            current = section.id
            break
          }
        }
      }
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    setTimeout(handleScroll, 100)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      const offset = window.innerWidth >= 1024 ? 32 : 80
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile top bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050807]/95 backdrop-blur-md lg:hidden"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <button onClick={() => scrollToSection("about")} className="font-display text-lg font-bold tracking-tight text-zinc-100">
            KV<span className="text-emerald-400">_</span>
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-emerald-300" aria-label="Open main menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="border-t border-white/10 px-4 py-3">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full px-3 py-2 text-left text-base font-medium text-zinc-300 hover:text-emerald-300">
                {item}
              </button>
            ))}
          </div>
        )}
      </motion.nav>

      {/* Desktop sidebar dashboard */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-y-0 left-0 z-50 hidden w-80 flex-col border-r border-white/10 bg-[#070b0a] lg:flex"
      >
        <div className="flex-1 overflow-y-auto p-8">
          <p className="hud-label">FIELD / ROBOTICS</p>
          <img src="animated-portrait.webp" alt="Keval Visaria" className="mt-6 h-28 w-28 border border-emerald-400/40 object-cover" />
          <button onClick={() => scrollToSection("about")} className="mt-4 text-left">
            <span className="font-display text-3xl font-bold leading-tight tracking-tight text-zinc-50">
              Keval <span className="gradient-text">Visaria</span>
            </span>
          </button>
          <p className="mt-2 text-sm font-medium text-zinc-200">Robotics Field Engineer</p>
          <p className="mt-1 text-sm text-zinc-400">Meta (via Beyondsoft) — Temple, TX</p>
          <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            IN PRODUCTION
          </p>

          <nav className="mt-10 space-y-1 border-t border-white/10 pt-8">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/40"
                    : "text-zinc-400 hover:bg-white/[0.03] hover:text-emerald-300"
                }`}
              >
                <span>
                  <span className="mr-2 font-mono text-[10px] text-zinc-500">0{index + 1}</span>
                  {item}
                </span>
                <span className="font-mono text-zinc-600">→</span>
              </button>
            ))}
          </nav>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="hud-label mb-4">Telemetry</p>
            <dl className="space-y-3">
              {telemetry.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</dt>
                  <dd className="text-right text-xs font-medium text-zinc-200">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 p-8">
          <a href="https://github.com/d0stMalone" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/kevalvisaria/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaLinkedin size={22} />
          </a>
          <span className="ml-auto font-mono text-[10px] tracking-[0.18em] text-zinc-500">KV_</span>
        </div>
      </motion.aside>
    </>
  )
}
