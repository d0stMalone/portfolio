"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function RoboticArena() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create a simple robot model
    const robotGeometry = new THREE.BoxGeometry(1, 1, 1)
    const robotMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const robot = new THREE.Mesh(robotGeometry, robotMaterial)
    scene.add(robot)

    camera.position.z = 5

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      robot.rotation.x += 0.01
      robot.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

