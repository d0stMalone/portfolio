"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <Reveal>
      <p className="section-index">
        {index} / {label}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-zinc-400">{intro}</p>}
    </Reveal>
  )
}
