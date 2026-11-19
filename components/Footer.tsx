"use client"

import { ArrowUp } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { site } from "../lib/site"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 sm:px-6 md:flex-row lg:px-10">
        <p className="text-center font-mono text-xs tracking-[0.18em] text-zinc-500 md:text-left">
          © {new Date().getFullYear()} KEVAL VISARIA — FIELD ROBOTICS // TEMPLE, TX
        </p>
        <div className="flex items-center gap-5">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaGithub size={20} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaLinkedin size={20} />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <ArrowUp className="h-3.5 w-3.5" /> TOP
          </button>
        </div>
      </div>
    </footer>
  )
}
