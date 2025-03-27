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

      // Get all sections
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.toLowerCase())
          if (!element) return null

          const rect = element.getBoundingClientRect()
          return {
            id: item.toLowerCase(),
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
          }
        })
        .filter(Boolean)

      // Get current position - use 1/3 of viewport height as trigger point
      const viewportHeight = window.innerHeight
      const triggerPosition = viewportHeight / 3

      // Find the current section
      let current = null

      // Check if we're near the bottom of the page for the last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        current = "skills" // Assume skills is the last section
      } else {
        // Otherwise find which section is at the trigger position
        for (const section of sections) {
          if (section.top <= triggerPosition && section.bottom >= triggerPosition) {
            current = section.id
            break
          }
        }
      }

      // If we found a section, update the active state
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    setTimeout(handleScroll, 100) // Small delay to ensure DOM is ready

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      const offset = 80 // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.toLowerCase()
                    ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50"
                    : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-900/95 backdrop-blur-md`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeSection === item.toLowerCase()
                  ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50"
                  : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

