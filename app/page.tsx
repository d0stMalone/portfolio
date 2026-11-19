"use client"
import Navbar from "../components/Navbar"
import About from "../components/About"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import RoboticGrid from "../components/RoboticGrid"
import { ScrollProgress, SpotlightProvider } from "../components/Effects"
import BootSequence from "../components/BootSequence"
import Terminal from "../components/Terminal"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050807] text-zinc-200">
      <BootSequence />
      <ScrollProgress />
      <SpotlightProvider />
      <RoboticGrid />
      <div className="relative z-10 lg:flex">
        <Navbar />
        <div className="min-w-0 flex-1 lg:ml-80">
          <div className="mx-auto max-w-5xl px-4 pt-24 sm:px-6 lg:px-10 lg:pt-12">
            <About />
            <Experience />
            <Projects />
            <Education />
            <Skills />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
      <Terminal />
    </main>
  )
}
