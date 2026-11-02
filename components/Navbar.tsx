"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navItems = ["About", "Experience", "Education", "Projects", "Skills"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-white/10 bg-[#050807]/95 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => scrollToSection("about")} className="flex items-baseline gap-2 text-left">
          <span className="font-display text-lg font-bold tracking-tight text-zinc-100">
            KV<span className="text-emerald-400">_</span>
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.22em] text-zinc-500 sm:inline">
            FIELD / ROBOTICS
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeSection === item.toLowerCase()
                  ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/40"
                  : "text-zinc-400 hover:text-emerald-300"
              }`}
            >
              <span className="mr-1 font-mono text-[10px] text-zinc-500">0{navItems.indexOf(item) + 1}</span>
              {item}
            </button>
          ))}
          <span className="ml-3 hidden items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-zinc-400 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            TEMPLE, TX
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 text-emerald-300 md:hidden"
          aria-label="Open main menu"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#050807]/95 px-4 py-3 backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full px-3 py-2 text-left text-base font-medium text-zinc-300 hover:text-emerald-300"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </motion.nav>
  )
}
