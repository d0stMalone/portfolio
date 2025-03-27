"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"
import About from "../components/About"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Footer from "../components/Footer"
import RoboticGrid from "../components/RoboticGrid"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <RoboticGrid />
      <div className="relative z-10">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="container mx-auto px-4 pt-20">
          <About />
          <Experience />
          <Education />
          <Projects />
          <Skills />
        </div>
        <Footer />
      </div>
    </main>
  )
}

