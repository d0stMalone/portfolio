"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["C++", "Python", "MATLAB", "Embedded C", "Java", "JavaScript", "TypeScript"],
  },
  {
    name: "Robotics & Control",
    skills: ["ROS", "Inverse Kinematics", "Motion Control", "Trajectory Planning", "Control Systems", "Sensor Fusion"],
  },
  {
    name: "Computer Vision & AI",
    skills: [
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "Machine Learning",
      "Image Processing",
      "Feature Extraction",
    ],
  },
  {
    name: "Hardware & Electronics",
    skills: [
      "PCB Design",
      "Arduino",
      "Raspberry Pi",
      "Jetson Nano",
      "Microcontrollers",
      "Sensor Integration",
      "Circuit Design",
    ],
  },
  {
    name: "Tools & Technologies",
    skills: ["Git", "Linux", "SOLIDWORKS", "AutoCAD", "3D Printing", "Embedded Systems", "Signal Processing"],
  },
]

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Skills</h2>
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                    className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

