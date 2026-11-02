"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const experiences = [
  {
    company: "Meta (via Beyondsoft)",
    position: "Robotics Field Engineer",
    duration: "November 2025 – Present",
    summary:
      "Deploy, operate, and validate 10+ autonomous mobile robots in high-availability production environments in Temple, TX, combining structured field testing, sensor validation, and fleet diagnostics.",
    description: [
      "At Meta (via Beyondsoft) in Temple, TX, I deploy, operate, and scale fleet robotics systems across high-availability production environments, working with cross-functional engineering, operations, and facilities teams to keep robots production-ready.",
      "I run structured, release-level field testing for 10+ autonomous mobile robots — sensor profiling and validation for LiDAR, cameras, radar, GPS/GNSS, and IMU, plus edge-case maneuvers, obstacle avoidance, and controller tuning. I also debug autonomy issues in the field using ROS2, Linux CLI, ROS bag analysis, Rviz, and PlotJuggler, and fix minor bugs in the autonomy stack during operations.",
      "To cut manual work, I author Python and Bash automation for fleet diagnostics and log-data extraction, document test results and failure analyses for engineering feedback, and drive predictive-maintenance and site-optimization work while enforcing LOTO field safety around autonomous machinery.",
    ],
    skills: [
      "ROS2",
      "Field Testing",
      "Sensor Validation",
      "Fleet Operations",
      "Python",
      "Bash",
      "Linux",
      "LiDAR",
      "Root-Cause Analysis",
    ],
  },
  {
    company: "Tatum Robotics",
    position: "Embedded Systems Engineer Intern",
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
    duration: "September 2022 – July 2023",
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
    duration: "August 2021 – August 2022",
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
      className="panel panel-hover p-6 md:p-8 overflow-hidden"
    >
      <motion.div layout className="flex justify-between items-start">
        <div className="flex-1">
          <motion.h3 layout className="text-2xl font-semibold text-emerald-300">
            {experience.position}
          </motion.h3>
          <motion.h4 layout className="text-xl text-zinc-300">
            {experience.company}
          </motion.h4>
          {experience.duration && (
            <motion.p layout className="mt-1 font-mono text-xs tracking-[0.14em] text-zinc-400">
              {experience.duration}
              {experience.duration.includes("Present") && (
                <span className="ml-3 border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">CURRENT</span>
              )}
            </motion.p>
          )}
        </div>
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full hover:bg-white/10 transition-all ${isExpanded ? "rotate-180" : ""}`}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <ChevronDown className="w-5 h-5 text-emerald-300" />
        </motion.button>
      </motion.div>

      <motion.div layout className="mt-4">
        <motion.p layout className="text-zinc-300">
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
              <p key={idx} className="text-zinc-300">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="mt-6 flex flex-wrap gap-2">
        {experience.skills.map((skill, idx) => (
          <motion.span layout key={idx} className="border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300">
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
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-index">02 / EXPERIENCE</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl mb-10">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

