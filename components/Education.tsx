"use client"

import { GraduationCap } from "lucide-react"
import Reveal, { SectionHeading } from "./Reveal"

const educations = [
  {
    school: "Northeastern University",
    degree: "Master in Robotics — ECE concentration",
    duration: "Sep 2023 – Aug 2025",
    location: "Boston, MA",
    coursework: [
      "Mobile Robotics",
      "Robot Sensing and Navigation",
      "Robot Mechanics and Control",
      "Reinforcement Learning",
      "Pattern Recognition and Computer Vision",
    ],
  },
  {
    school: "K.J. Somaiya College of Engineering",
    degree: "Bachelor of Technology in Electronics Engineering",
    duration: "Aug 2019 – Jul 2023",
    location: "Mumbai, India",
    coursework: [
      "Robotics and Automation",
      "Embedded System Design",
      "Control System Engineering",
      "Microprocessors and Peripherals",
      "Digital Signal Processing",
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24">
      <SectionHeading index="05" label="EDUCATION" title="Education" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {educations.map((edu, index) => (
          <Reveal key={edu.school} delay={index * 0.08} className="h-full">
            <article className="panel spotlight flex h-full flex-col p-6 transition-colors duration-300 hover:border-emerald-400/40 md:p-8">
              <div className="flex items-center justify-between gap-3">
                <GraduationCap className="h-6 w-6 text-emerald-400" />
                <p className="font-mono text-xs tracking-[0.14em] text-zinc-500">{edu.duration}</p>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-zinc-50">{edu.school}</h3>
              <p className="mt-1 text-emerald-300">{edu.degree}</p>
              <p className="mt-1 text-sm text-zinc-500">{edu.location}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Key coursework</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.coursework.map((course) => (
                  <span key={course} className="chip">
                    {course}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
