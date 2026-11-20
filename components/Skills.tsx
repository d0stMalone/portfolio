"use client"

import { Cpu, Radar, Terminal, Waypoints } from "lucide-react"
import Reveal, { SectionHeading } from "./Reveal"

const skillCategories = [
  {
    name: "Field & Autonomy",
    icon: Waypoints,
    skills: ["ROS2", "Field Testing", "Sensor Validation", "Release Testing", "Fleet Operations", "Root-Cause Analysis", "Rviz", "PlotJuggler", "ROS Bag Analysis", "Path Planning", "Motion Control"],
  },
  {
    name: "Sensing & Perception",
    icon: Radar,
    skills: ["LiDAR", "Cameras", "Radar", "GPS/GNSS", "IMU", "Sensor Fusion", "OpenCV", "PyTorch", "TensorFlow", "Deep Learning", "Reinforcement Learning", "Image Processing"],
  },
  {
    name: "Embedded & Hardware",
    icon: Cpu,
    skills: ["Embedded C", "C++", "STM32", "Jetson Nano", "Raspberry Pi", "Arduino", "Microcontrollers", "PCB Design", "4-Layer PCB", "PCBA Bring-up", "Motor Controllers", "Circuit Design"],
  },
  {
    name: "Software & Tools",
    icon: Terminal,
    skills: ["Python", "Bash", "Linux", "Git", "CI/CD", "Docker", "JTAG", "GDB", "JIRA", "MATLAB", "Java", "SOLIDWORKS", "AutoCAD", "3D Printing"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <SectionHeading
        index="06"
        label="STACK"
        title="Skills"
        intro="The stack I actually use in the field — not just the stack I studied."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {skillCategories.map((category, i) => (
          <Reveal key={category.name} delay={(i % 2) * 0.08} className="h-full">
            <div className="panel spotlight h-full p-6 transition-colors duration-300 hover:border-emerald-400/40">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-emerald-400/30 bg-emerald-400/10">
                  <category.icon className="h-4 w-4 text-emerald-300" />
                </span>
                <h3 className="font-display text-lg font-semibold text-zinc-100">{category.name}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
