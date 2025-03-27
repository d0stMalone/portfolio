"use client"

import { motion } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">Made with ❤️ by Keval Visaria.</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/d0stMalone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kevalvisaria/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

