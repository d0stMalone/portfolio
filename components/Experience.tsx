"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const experiences = [
  {
    company: "Tatum Robotics",
    position: "Embedded System Engineer Co-op",
    duration: "July 2024 – December 2024",
    summary:
      "Developed and optimized embedded systems for a humanoid robotic arm, focusing on circuit design, firmware development, and automation. Implemented custom I2C drivers and improved system efficiency through hardware and software optimizations.",
    description: [
      "At Tatum Robotics, I worked on developing and optimizing embedded systems for a humanoid robotic arm, focusing on circuit design, firmware development, and automation. My role involved hardware design, driver development, power management optimization, and integration testing, ensuring seamless robotic operation and improved efficiency.",
      "One of my major contributions was designing and optimizing the circuitry for the humanoid robotic arm, which included schematic capture, PCB layout, and component selection. By streamlining the power management system, I improved efficiency and tested embedded firmware in C and C++ to ensure stable operation. Additionally, I developed custom I2C drivers for haptic motor integration, allowing for enhanced tactile feedback through optimized vibration patterns, improving the arm's response and user interaction.",
      "To automate driver initialization, I implemented Linux systemctl services and timers, significantly reducing bring-up time and making the system boot-ready faster. Furthermore, I streamlined integration releases by setting up automated testing pipelines, ensuring consistent deployment and minimizing manual debugging efforts.",
    ],
    skills: [
      "Embedded Systems",
      "Circuit Design",
      "Firmware Development",
      "C/C++",
      "Linux",
      "PCB Design",
      "Hardware Design",
    ],
  },
  {
    company: "The Innovation Story",
    position: "Robotics Intern",
    summary:
      "Led robotics control system development and STEM education initiatives. Enhanced system efficiency by 15% through advanced mathematical models and sensor fusion. Designed and produced PCBs for multiple projects.",
    description: [
      "During my time at The Innovation Story, I worked on developing and optimizing robotic control systems, focusing on hardware, software, and embedded systems to improve efficiency and reliability in real-world applications. My responsibilities involved PCB design, motion control algorithms, and wireless communication while also engaging in STEM outreach through global robotics competitions like the First Tech Challenge (FTC) and the First Robotics Competition (FRC).",
      "As part of my STEM mentorship and outreach initiatives, I played a significant role in coaching and supporting high school students participating in the First Tech Challenge (FTC) and First Robotics Competition (FRC). These competitions provided students with hands-on exposure to robotics, automation, and competitive engineering, helping them build robots capable of completing complex tasks.",
      "One of my key contributions was enhancing robotic control performance by applying advanced mathematical models and sensor fusion techniques, leading to a 15% improvement in system efficiency. I was actively involved in developing and deploying robotics applications using Java, MATLAB, and Embedded C, successfully implementing solutions for autonomous motion, real-time decision-making, and hardware optimization across multiple projects. Additionally, I led the design and production of PCBs for over 10 projects, incorporating microcontrollers, power distribution circuits, and sensor interfaces.",
    ],
    skills: ["Robotics", "PCB Design", "Motion Control", "Java", "MATLAB", "Embedded C", "STEM Education"],
  },
  {
    company: "Team KJSCE Robocon",
    position: "Electronics Team Lead",
    duration: "September 2023 – July 2023",
    summary:
      "Led electronics team in ABU Robocon competition, achieving 95% pathfinding accuracy and 30% improved communication efficiency. Designed multi-microcontroller PCBs and implemented advanced sensor systems.",
    description: [
      "At KJSCE Robocon, I participated in ABU Robocon, a highly competitive Asia-Pacific Broadcasting Union Robot Contest, where teams design and build robots to complete high-speed, precision-based tasks. As the Electronics Team Lead, I was responsible for PCB design, sensor integration, motion control, and communication systems to enhance our robot's performance.",
      "One of my primary contributions was engineering multi-microcontroller PCBs to handle various subsystems efficiently. By integrating multiple controllers and optimizing power management circuits, I ensured smooth operation across actuation, sensing, and motor control units. Additionally, I implemented sensor interfaces for autonomous navigation, utilizing IMUs, encoders, and infrared sensors, which significantly improved pathfinding accuracy to 95%.",
      "To ensure real-time responsiveness, I developed wireless communication protocols using ZigBee and Bluetooth, reducing latency and improving data transmission efficiency by 30%. This was crucial for seamless coordination between autonomous and manually controlled robots during competition rounds. I also optimized UART, I2C, SPI, and CANBUS protocols for high-speed data exchange between microcontrollers, enabling fast and synchronized motion execution.",
      "This experience deepened my knowledge of robotic automation, multi-microcontroller integration, and high-speed actuation. The challenges of ABU Robocon pushed me to optimize both hardware and software solutions, ensuring maximum efficiency in real-world robotics applications.",
    ],
    skills: [
      "PCB Design",
      "Sensor Integration",
      "Motion Control",
      "Communication Protocols",
      "Robotics",
      "Team Leadership",
    ],
  },
]

function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
    >
      <motion.div layout className="flex justify-between items-start">
        <div className="flex-1">
          <motion.h3 layout className="text-2xl font-semibold text-cyan-300">
            {experience.position}
          </motion.h3>
          <motion.h4 layout className="text-xl text-gray-300">
            {experience.company}
          </motion.h4>
          {experience.duration && (
            <motion.p layout className="text-gray-400 mt-1">
              {experience.duration}
            </motion.p>
          )}
        </div>
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full hover:bg-gray-700/50 transition-all ${isExpanded ? "rotate-180" : ""}`}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <ChevronDown className="w-5 h-5 text-cyan-300" />
        </motion.button>
      </motion.div>

      <motion.div layout className="mt-4">
        <motion.p layout className="text-gray-300">
          {isExpanded ? experience.description[0] : experience.summary}
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            {experience.description.slice(1).map((paragraph, idx) => (
              <p key={idx} className="text-gray-300">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="mt-6 flex flex-wrap gap-2">
        {experience.skills.map((skill, idx) => (
          <motion.span layout key={idx} className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm">
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 gradient-text">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

