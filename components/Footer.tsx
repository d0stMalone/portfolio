"use client"

import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <p className="font-mono text-xs tracking-[0.18em] text-zinc-500">
          KEVAL VISARIA — FIELD ROBOTICS // TEMPLE, TX
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/d0stMalone" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/kevalvisaria/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 transition-colors hover:text-emerald-300">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  )
}
