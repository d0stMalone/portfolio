"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Reveal, { SectionHeading } from "./Reveal"

const experiences = [
  {
    company: "Meta (via Beyondsoft)",
    position: "Robotics Field Engineer",
    highlights: ["Release-level field testing for a fleet of 10+ autonomous mobile robots", "Sensor profiling & validation: LiDAR, cameras, radar, GPS/GNSS, IMU", "Python & Bash automation for fleet diagnostics and log extraction"],
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
    highlights: ["Custom I2C drivers for haptic motor feedback on a humanoid arm", "systemd services & timers that cut driver bring-up time", "Circuit and PCB design for the arm's power management"],
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
    highlights: ["15% control-system efficiency gain using sensor fusion", "Designed PCBs for 10+ robotics projects", "Mentored high-school FTC & FRC robotics teams"],
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
    highlights: ["95% pathfinding accuracy with IMU, encoder & IR sensing", "30% more efficient ZigBee/Bluetooth data link", "Multi-microcontroller PCBs talking UART, I2C, SPI & CAN"],
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

type Exp = (typeof experiences)[number]

function ExperienceCard({ experience, index }: { experience: Exp; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const current = experience.duration.includes("Present")

  return (
    <Reveal delay={0.05} className="relative pl-8 md:pl-12">
      {/* timeline node */}
      <span
        className={`absolute left-0 top-7 flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center border ${
          current ? "border-emerald-400 bg-emerald-400/20" : "border-white/25 bg-[#09090b]"
        }`}
      >
        <span className={`h-[5px] w-[5px] ${current ? "pulse-dot bg-emerald-400" : "bg-zinc-500"}`} />
      </span>

      <article className="panel spotlight p-6 transition-colors duration-300 hover:border-emerald-400/40 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-zinc-500">
              {experience.duration}
              {current && (
                <span className="ml-3 border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
                  CURRENT
                </span>
              )}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50 md:text-2xl">{experience.position}</h3>
            <p className="text-base text-emerald-300">{experience.company}</p>
          </div>
          <span className="hidden font-mono text-4xl font-bold text-white/[0.06] md:block">0{index + 1}</span>
        </div>

        <ul className="mt-5 grid gap-2.5">
          {experience.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-zinc-200">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-t border-white/10 pt-5 text-zinc-400">
                {experience.description.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {experience.skills.slice(0, isExpanded ? undefined : 5).map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
            {!isExpanded && experience.skills.length > 5 && (
              <span className="chip text-zinc-500">+{experience.skills.length - 5}</span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Show less" : "Full story"}
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <SectionHeading index="02" label="EXPERIENCE" title="Experience" />
      <div className="relative mt-10">
        <div className="absolute bottom-4 left-0 top-4 w-px bg-gradient-to-b from-emerald-400/70 via-white/15 to-transparent" />
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
