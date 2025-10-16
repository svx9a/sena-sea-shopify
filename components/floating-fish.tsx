"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function Fish({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Mesh>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])
  const frequency = useMemo(() => 1 + Math.random() * 2, [])

  useFrame((state) => {
    if (!groupRef.current || !tailRef.current) return

    const time = state.clock.getElapsedTime()

    // Swimming motion
    groupRef.current.position.x += speed
    groupRef.current.position.y += Math.sin(time * frequency + offset) * 0.02
    groupRef.current.rotation.y = Math.sin(time * frequency + offset) * 0.1
    groupRef.current.rotation.z = Math.sin(time * frequency + offset) * 0.05

    // Tail wagging
    tailRef.current.rotation.y = Math.sin(time * frequency * 3 + offset) * 0.3

    // Reset position when fish swims off screen
    if (groupRef.current.position.x > 15) {
      groupRef.current.position.x = -15
      groupRef.current.position.y = (Math.random() - 0.5) * 10
      groupRef.current.position.z = (Math.random() - 0.5) * 10
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.random() * Math.PI * 2, 0]}>
      {/* Fish body */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial color={color} shininess={100} specular="#444444" />
        <mesh scale={[1.5, 0.8, 0.6]} />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshPhongMaterial color={color === "#ff6b6b" ? "#ff5252" : color === "#4ecdc4" ? "#3db8af" : "#ff8c69"} />
      </mesh>

      {/* Top fin */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, 0.4, 6]} />
        <meshPhongMaterial color={color === "#ff6b6b" ? "#ff5252" : color === "#4ecdc4" ? "#3db8af" : "#ff8c69"} />
      </mesh>

      {/* Side fins */}
      <mesh position={[0.2, -0.3, 0.3]} rotation={[0, 0, Math.PI / 4]} scale={0.6}>
        <coneGeometry args={[0.15, 0.4, 6]} />
        <meshPhongMaterial color={color === "#ff6b6b" ? "#ff5252" : color === "#4ecdc4" ? "#3db8af" : "#ff8c69"} />
      </mesh>

      <mesh position={[0.2, -0.3, -0.3]} rotation={[0, 0, Math.PI / 4]} scale={0.6}>
        <coneGeometry args={[0.15, 0.4, 6]} />
        <meshPhongMaterial color={color === "#ff6b6b" ? "#ff5252" : color === "#4ecdc4" ? "#3db8af" : "#ff8c69"} />
      </mesh>
    </group>
  )
}

function Scene() {
  const fishData = useMemo(() => {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffa07a"]
    return Array.from({ length: 8 }, (_, i) => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
        number,
        number,
        number,
      ],
      color: colors[i % 3],
      speed: 0.02 + Math.random() * 0.03,
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 0, 5]} color="#4ecdc4" intensity={0.5} />

      {fishData.map((fish, i) => (
        <Fish key={i} position={fish.position} color={fish.color} speed={fish.speed} />
      ))}
    </>
  )
}

export function FloatingFish() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
