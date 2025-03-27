"use client"

import { motion } from "framer-motion"

const educations = [
  {
    school: "Northeastern University",
    degree: "Master in Robotics – ECE concentration",
    duration: "Aug 2023 – Expected Dec 2025",
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
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Education</h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">{edu.school}</h3>
              <h4 className="text-xl text-gray-300 mb-2">{edu.degree}</h4>
              {edu.duration && <p className="text-gray-400 mb-4">{edu.duration}</p>}
              <div className="mt-4">
                <h5 className="text-lg font-medium text-cyan-300 mb-2">Relevant Coursework</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {edu.coursework.map((course, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center space-x-2">
                      <span className="text-cyan-500">•</span>
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

