'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

const GRID = 3
const SPACING = 0.5
const CUBE_SIZE = 0.35
const OFFSET = (GRID - 1) * SPACING / 2

function Scene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshesRef = useRef<(THREE.Mesh | null)[]>([])

  const cubes = useMemo(() => {
    const arr: Array<{
      orig: THREE.Vector3
      pos: THREE.Vector3
      vel: THREE.Vector3
    }> = []
    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        for (let z = 0; z < GRID; z++) {
          const orig = new THREE.Vector3(
            x * SPACING - OFFSET,
            y * SPACING - OFFSET,
            z * SPACING - OFFSET,
          )
          const dir = orig.clone().normalize()
          if (dir.length() < 0.01) dir.set(0, 1, 0)
          const spread = 2 + Math.random() * 2
          const vel = dir.clone().multiplyScalar(spread)
          vel.x += (Math.random() - 0.5) * 1.5
          vel.y += (Math.random() - 0.5) * 1.5
          vel.z += (Math.random() - 0.5) * 1.5
          arr.push({ orig, pos: orig.clone(), vel })
        }
      }
    }
    return arr
  }, [])

  const geom = useMemo(
    () => new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE),
    [],
  )

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const group = groupRef.current
    if (!group) return

    if (hovered) {
      for (const c of cubes) {
        c.vel.multiplyScalar(1 - dt * 0.18)
        c.pos.x += c.vel.x * dt * 3
        c.pos.y += c.vel.y * dt * 3
        c.pos.z += c.vel.z * dt * 3
      }
    } else {
      for (const c of cubes) {
        c.pos.lerp(c.orig, 1 - Math.pow(0.005, dt * 2))
      }
      group.rotation.x = -0.2 + Math.sin(Date.now() * 0.0003) * 0.05
      group.rotation.y += dt * 0.25
    }

    for (let i = 0; i < cubes.length; i++) {
      const m = meshesRef.current[i]
      if (m) m.position.copy(cubes[i].pos)
    }
  })

  return (
    <group ref={groupRef} position={[3.5, 0, 0]} rotation={[-0.2, 0.3, 0]}>
      {cubes.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshesRef.current[i] = el }}
          geometry={geom}
        >
          <meshStandardMaterial
            color="#fbbf24"
            transparent
            opacity={0.05}
            metalness={0.1}
            roughness={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
          <Edges
            color="#fbbf24"
            transparent
            opacity={0.35}
            renderOrder={1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function BurstCube() {
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {mounted && (
        <Canvas
          camera={{ position: [4, 2.5, 4], fov: 40, near: 0.1, far: 100 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />
          <directionalLight position={[-3, 2, -3]} intensity={0.25} />
          <Scene hovered={hovered} />
          <AdaptiveDpr pixelated />
        </Canvas>
      )}
      <div
        className="absolute top-1/2 right-[3%] -translate-y-1/2 w-[200px] h-[200px] pointer-events-auto z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  )
}
