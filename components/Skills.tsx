"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    name: "Field & Autonomy",
    skills: ["ROS2", "Field Testing", "Sensor Validation", "Release Testing", "Fleet Operations", "Root-Cause Analysis", "Rviz", "PlotJuggler", "ROS Bag Analysis", "Path Planning", "Motion Control"],
  },
  {
    name: "Sensing & Perception",
    skills: ["LiDAR", "Cameras", "Radar", "GPS/GNSS", "IMU", "Sensor Fusion", "OpenCV", "PyTorch", "TensorFlow", "Deep Learning", "Machine Learning", "Image Processing"],
  },
  {
    name: "Embedded & Hardware",
    skills: ["Embedded C", "C++", "STM32", "Jetson Nano", "Raspberry Pi", "Arduino", "Microcontrollers", "PCB Design", "4-Layer PCB", "PCBA Bring-up", "Motor Controllers", "Circuit Design"],
  },
  {
    name: "Software & Tools",
    skills: ["Python", "Bash", "Linux", "Git", "CI/CD", "Docker", "JTAG", "GDB", "JIRA", "MATLAB", "Java", "SOLIDWORKS", "AutoCAD", "3D Printing"],
  },
]

export default function Skills() {
  return (
    <motion.section id="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-index">05 / STACK</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">Skills</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          The stack I actually use in the field — not just the stack I studied.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              className="panel panel-hover p-6"
            >
              <h3 className="font-display text-lg font-semibold text-emerald-300">{category.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
