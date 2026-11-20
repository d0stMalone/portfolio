import type React from "react"
import "./globals.css"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { site } from "../lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-body" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

// Structured data so search engines understand who this site is about
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Keval Visaria",
  url: "https://kevalvisaria.com",
  image: "https://kevalvisaria.com/keval.webp",
  jobTitle: "Robotics Field Engineer",
  worksFor: { "@type": "Organization", name: "Beyondsoft" },
  address: { "@type": "PostalAddress", addressLocality: "Temple", addressRegion: "TX", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Northeastern University" },
    { "@type": "CollegeOrUniversity", name: "K.J. Somaiya College of Engineering" },
  ],
  knowsAbout: ["Robotics", "ROS 2", "Nav2", "SLAM", "Autonomous mobile robots", "Sensor fusion", "LiDAR", "Embedded systems", "PCB design"],
  sameAs: [site.github, site.linkedin],
}

const description =
  "Robotics Field Engineer deploying, validating, and operating autonomous mobile robots. ROS2, sensor validation, field testing, and embedded systems."

export const metadata = {
  metadataBase: new URL("https://kevalvisaria.com"),
  title: "Keval Visaria",
  alternates: { canonical: "https://kevalvisaria.com/" },
  keywords: ["Keval Visaria", "robotics engineer", "field robotics", "ROS 2", "Nav2", "SLAM", "autonomous mobile robots", "embedded systems"],
  authors: [{ name: "Keval Visaria", url: "https://kevalvisaria.com" }],
  icons: {
    icon: [
      { url: "icon-kv-v3.svg", type: "image/svg+xml" },
      { url: "icon-kv-v3-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "favicon.ico",
    apple: "apple-touch-icon.png",
  },
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
  themeColor: "#09090b",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Skip the boot intro on repeat visits within a session, before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("kv-booted"))document.documentElement.classList.add("kv-booted")}catch(e){}`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        {site.goatcounter && (
          <script
            data-goatcounter={`https://${site.goatcounter}.goatcounter.com/count`}
            async
            src="https://gc.zgo.at/count.js"
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${display.variable} bg-[#09090b] font-body text-zinc-200 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
