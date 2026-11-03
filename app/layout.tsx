import type React from "react"
import "./globals.css"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-body" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

export const metadata = {
  title: "Keval Visaria",
  icons: { icon: "favicon.svg" },
  description:
    "Robotics Field Engineer deploying, validating, and operating autonomous mobile robots. ROS2, sensor validation, field testing, and embedded systems.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} bg-[#050807] font-body text-zinc-200 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
