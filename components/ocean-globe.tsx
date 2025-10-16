"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export function OceanGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.THREE || !containerRef.current) return

    const THREE = window.THREE
    const canvasContainer = containerRef.current

    let width = canvasContainer.clientWidth
    let height = canvasContainer.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 2.5

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    canvasContainer.appendChild(renderer.domElement)

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.5)
    sunLight.position.set(5, 5, 5)
    scene.add(sunLight)

    const fillLight = new THREE.DirectionalLight(0x0ea5e9, 1.5) // Ocean blue fill light
    fillLight.position.set(-5, -5, -5)
    scene.add(fillLight)

    // Ocean Earth
    const planetRadius = 1.0
    const segments = 128
    const geometry = new THREE.SphereGeometry(planetRadius, segments, segments)
    const material = new THREE.MeshStandardMaterial({
      color: 0x0c4a6e, // Deep ocean blue
      roughness: 0.6,
      metalness: 0.2,
      vertexColors: true,
    })

    // Vertex colors for realistic ocean/land
    const vertices = geometry.attributes.position.array
    const colors = []
    const cOcean = new THREE.Color(0x0369a1) // Ocean blue
    const cDeepOcean = new THREE.Color(0x075985) // Deep ocean
    const cLand = new THREE.Color(0x059669) // Seafood green accent

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      const z = vertices[i + 2]

      const landNoise = Math.abs(Math.sin(x * 5) * Math.cos(y * 5) * Math.sin(z * 5))

      if (landNoise > 0.4) {
        colors.push(cLand.r, cLand.g, cLand.b)
      } else if (landNoise > 0.2) {
        colors.push(cOcean.r, cOcean.g, cOcean.b)
      } else {
        colors.push(cDeepOcean.r, cDeepOcean.g, cDeepOcean.b)
      }
    }
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const earth = new THREE.Mesh(geometry, material)
    scene.add(earth)

    // Ocean atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(planetRadius * 1.04, segments, segments)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x0ea5e9) }, // Sky blue glow
        coefficient: { value: 0.8 },
        power: { value: 2.5 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float coefficient;
        uniform float power;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(coefficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
          gl_FragColor = vec4(glowColor * intensity, intensity * 0.4);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    earth.add(atmosphere)

    // Stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.025 })
    const starsVertices = []
    for (let i = 0; i < 15000; i++) {
      starsVertices.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30)
    }
    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    scene.add(new THREE.Points(starsGeometry, starsMaterial))

    // Interaction controls
    let isDragging = false
    const previousMousePosition = { x: 0, y: 0 }
    const rotationSpeed = 0.004
    const autoRotateY = 0.0015

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousMousePosition.x = e.clientX
      previousMousePosition.y = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - previousMousePosition.x
      earth.rotation.y += deltaX * rotationSpeed
      previousMousePosition.x = e.clientX
    }

    renderer.domElement.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.0005
      atmosphereMaterial.uniforms.power.value = 2.5 + 0.5 * Math.sin(time)

      if (!isDragging) {
        earth.rotation.y += autoRotateY
      }

      atmosphere.rotation.copy(earth.rotation)
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      width = canvasContainer.clientWidth
      height = canvasContainer.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", handleResize)

    sceneRef.current = { renderer, scene, camera }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js" strategy="beforeInteractive" />
      <section className="relative bg-gradient-to-b from-sky-950 via-blue-950 to-slate-950 py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold text-sm mb-6">
              SUSTAINABLY SOURCED FROM PRISTINE WATERS
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Wild Alaskan Seafood</h2>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto mb-6 rounded-full shadow-[0_0_30px_rgba(14,165,233,0.8)]" />
            <p className="text-2xl md:text-3xl text-sky-200 font-light mb-4">From Ocean to Your Table</p>
            <p className="text-lg md:text-xl text-sky-300 font-light max-w-3xl mx-auto">
              Experience the purest seafood from the pristine waters of Alaska
            </p>
          </div>

          {/* 3D Globe Container */}
          <div
            ref={containerRef}
            className="w-full h-[600px] md:h-[700px] relative rounded-2xl overflow-hidden"
            style={{ touchAction: "none" }}
          />

          <div className="text-center mt-12">
            <p className="text-sky-300 text-lg max-w-2xl mx-auto">
              Our seafood is harvested from the cold, clean waters of Alaska, ensuring the highest quality and
              sustainability for generations to come.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

declare global {
  interface Window {
    THREE: any
  }
}
