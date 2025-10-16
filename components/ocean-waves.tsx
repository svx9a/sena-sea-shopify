"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function OceanWaves() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // 🌊 WAVE GEOMETRY
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50)
    const material = new THREE.MeshPhongMaterial({
      color: 0x007aff,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
      shininess: 100,
    })

    const wave = new THREE.Mesh(geometry, material)
    wave.rotation.x = -Math.PI / 2
    scene.add(wave)

    // 💫 LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    // 🌟 BUBBLES
    const bubbles: THREE.Mesh[] = []
    const bubbleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const bubbleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    })

    for (let i = 0; i < 30; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial)
      bubble.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 15)
      scene.add(bubble)
      bubbles.push(bubble)
    }

    camera.position.z = 10

    // 🎵 ANIMATION
    const clock = new THREE.Clock()
    const positions = geometry.attributes.position.array as Float32Array

    let animationId: number
    function animate() {
      animationId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // Animate waves
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 2]

        // Wave calculations
        const wave1 = Math.sin(x * 2 + time * 2) * 0.2
        const wave2 = Math.sin(z * 1.5 + time * 1.3) * 0.3
        const wave3 = Math.sin((x + z) * 0.8 + time * 3) * 0.1

        positions[i + 1] = wave1 + wave2 + wave3
      }

      geometry.attributes.position.needsUpdate = true

      // Animate bubbles
      bubbles.forEach((bubble) => {
        bubble.position.y += 0.01
        if (bubble.position.y > 3) bubble.position.y = -3
      })

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.1) * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // 🖱️ MOUSE INTERACTION
    let mouseX = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
    }
    document.addEventListener("mousemove", handleMouseMove)

    // 📱 RESPONSIVE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // 🧹 CLEANUP
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", handleMouseMove)
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      bubbleGeometry.dispose()
      bubbleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "linear-gradient(135deg, #0077BE 0%, #42A5F5 50%, #87CEEB 100%)" }}
    />
  )
}
