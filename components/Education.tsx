"use client"

import { motion } from "framer-motion"

const educations = [
  {
    school: "Northeastern University",
    degree: "Master in Robotics – ECE concentration",
    duration: "Sep 2023 – Aug 2025",
    coursework: [
      "Mobile Robotics",
      "Robot Sensing and Navigation",
      "Robot Mechanics and Control",
      "Pattern Recognition and Computer Vision",
      "Machine Learning and Pattern recognition",
      "Control systems",
      "Reinforcement Learning",
    ],
  },
  {
    school: "K.J. Somaiya college of Engineering",
    degree: "Bachelor of Technology in Electronics Engineering",
    duration: "Aug 2019 – Jul 2023",
    coursework: [
      "C Programming",
      "Control System Engineering",
      "Communication Systems",
      "Microprocessors and Peripherals",
      "Signal and Systems",
      "Digital Signal Processing",
      "Arduino and Raspberry pi",
      "Embedded System Design",
      "Robotics and Automation",
    ],
  },
]

export default function Education() {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-index">03 / EDUCATION</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl mb-10">Education</h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="panel panel-hover p-6 md:p-8"
            >
              <h3 className="text-2xl font-semibold text-emerald-300 mb-2">{edu.school}</h3>
              <h4 className="text-xl text-zinc-300 mb-2">{edu.degree}</h4>
              {edu.duration && <p className="text-zinc-400 mb-4">{edu.duration}</p>}
              <div className="mt-4">
                <h5 className="text-lg font-medium text-emerald-300 mb-2">Relevant Coursework</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {edu.coursework.map((course, idx) => (
                    <li key={idx} className="text-zinc-300 flex items-center space-x-2">
                      <span className="text-emerald-500">•</span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

