import type React from "react"
import "./globals.css"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-body" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

const description =
  "Robotics Field Engineer deploying, validating, and operating autonomous mobile robots. ROS2, sensor validation, field testing, and embedded systems."

export const metadata = {
  metadataBase: new URL("https://kevalvisaria.com"),
  title: "Keval Visaria",
  icons: { icon: "favicon-kv.svg" },
  description,
  openGraph: {
    type: "website",
    url: "https://kevalvisaria.com",
    siteName: "Keval Visaria",
    title: "Keval Visaria — Robotics Field Engineer",
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keval Visaria — Robotics Field Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keval Visaria — Robotics Field Engineer",
    description,
    images: ["/og-image.png"],
  },
}

export const viewport = {
  themeColor: "#050807",
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
