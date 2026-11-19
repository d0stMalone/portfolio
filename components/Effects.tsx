"use client"

import { useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/** Thin progress bar along the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-cyan-400 to-lime-300"
    />
  )
}

/** Feeds the cursor position into any `.spotlight` card under the pointer. */
export function SpotlightProvider() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(".spotlight") as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])
  return null
}
