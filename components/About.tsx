"use client"

import { motion } from "framer-motion"
import { Code, Cpu, Zap } from "lucide-react"

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl -z-10 blur-xl"></div>
          <div className="bg-gray-800/60 backdrop-blur-md p-10 rounded-xl border border-cyan-500/20 shadow-xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                >
                  <Cpu className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
                >
                  <Code className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: 30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
                >
                  <Zap className="w-8 h-8 text-cyan-400" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-lg text-cyan-300 uppercase tracking-widest font-light mb-2"
              >
                Hello World
              </motion.p>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.7 }}
                className="text-5xl md:text-6xl font-bold mb-4"
              >
                I'm <span className="gradient-text">Keval Visaria</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.7 }}
                className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 origin-left"
              ></motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.7 }}
                className="text-xl md:text-2xl text-gray-300 font-light"
              >
                Robotics Engineer & Embedded Systems Specialist
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="mt-4 text-gray-400 max-w-2xl"
              >
                Crafting intelligent systems at the intersection of hardware and software
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <h2 className="text-4xl font-bold mb-8 gradient-text">About Me</h2>
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700 space-y-6">
          <p className="text-lg text-gray-300">
            Robotics isn't just my field of study—it's my passion. I'm Keval Visaria, a robotics engineer who thrives at
            the intersection of hardware and software, blending precision engineering with intelligent automation.
            Whether it's embedded systems, PCB design, or control systems, I enjoy bringing ideas to life by fusing
            electronics, code, and mechanics into seamless, functional technology.
          </p>
          <p className="text-lg text-gray-300">
            From writing efficient C++ and Python code to designing intricate PCB layouts, I love problem-solving and
            optimizing systems for efficiency and real-world impact. My expertise spans embedded platforms like
            Raspberry Pi, Jetson Nano, and Arduino, giving me the ability to push boundaries in automation and
            intelligent control.
          </p>
          <p className="text-lg text-gray-300">
            At heart, I am an innovator and a builder, always seeking to engineer smarter, more intuitive systems.
            Whether it's developing custom firmware, fine-tuning haptic feedback, or designing seamless integrations
            between hardware and software, I believe that great technology isn't just about circuits and code—it's about
            solving problems that matter.
          </p>
          <p className="text-lg text-cyan-300 font-semibold">Let's build the future, one innovation at a time. 🚀</p>
        </div>
      </div>
    </motion.section>
  )
}

