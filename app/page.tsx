"use client"
import Navbar from "../components/Navbar"
import About from "../components/About"
import Experience from "../components/Experience"
import Education from "../components/Education"
import Projects from "../components/Projects"
import Skills from "../components/Skills"
import Footer from "../components/Footer"
import RoboticGrid from "../components/RoboticGrid"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050807] text-zinc-200">
      <RoboticGrid />
      <div className="relative z-10 lg:flex">
        <Navbar />
        <div className="min-w-0 flex-1 lg:ml-80">
          <div className="mx-auto max-w-5xl px-4 pt-24 sm:px-6 lg:px-10 lg:pt-12">
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  )
}
