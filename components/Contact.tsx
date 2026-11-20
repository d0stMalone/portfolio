"use client"

import { useState } from "react"
import { Check, Copy, FileText, Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Reveal, { SectionHeading } from "./Reveal"
import { site } from "../lib/site"

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <SectionHeading index="07" label="CONTACT" title="Let's talk robots" />
      <Reveal delay={0.05}>
        <div className="panel ticks spotlight relative mt-10 overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
            Always happy to talk field robotics, autonomy validation and embedded systems — or anything about robots
            that have to work in the real world.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {site.email ? (
              <>
                <a href={`mailto:${site.email}`} className="btn-primary">
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
                <button onClick={copy} className="btn-ghost" aria-label="Copy email address">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </>
            ) : (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FaLinkedin className="h-4 w-4" /> Message me on LinkedIn
              </a>
            )}
            {site.resumeUrl && (
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FileText className="h-4 w-4" /> Résumé
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-6 text-sm">
            {site.email && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-emerald-300"
              >
                <FaLinkedin className="h-5 w-5" /> LinkedIn
              </a>
            )}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-emerald-300"
            >
              <FaGithub className="h-5 w-5" /> github.com/d0stMalone
            </a>
            <span className="flex items-center gap-2 text-zinc-500">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Temple, TX · US Central time
            </span>
            <button
              onClick={() => window.dispatchEvent(new Event("open-terminal"))}
              className="font-mono text-zinc-500 transition-colors hover:text-emerald-300"
            >
              psst — try <span className="text-emerald-300">sudo hire keval</span> in the terminal ↗
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
