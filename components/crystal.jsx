"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* =========================
   CUBE PIECES
========================= */

function CubePieces() {
  const meshRef = useRef();

  const [hovered, setHovered] = useState(false);

  const COUNT = 6000;
  const dummy = new THREE.Object3D();

  const cubes = useMemo(() => {
    const temp = [];
    const size = 3.3;

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;

      temp.push({
        original: new THREE.Vector3(x, y, z),
        position: new THREE.Vector3(x, y, z),
      });
    }

    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const center = new THREE.Vector3(0, 0, 0);

    cubes.forEach((cube, i) => {
      // direction from center → outward explosion
      const dir = cube.position.clone().sub(center).normalize();

      if (hovered) {
        // 🔥 STRONG visible explosion force
        cube.position.add(dir.multiplyScalar(0.08));
      } else {
        // 🔄 return smoothly to original cube shape
        cube.position.lerp(cube.original, 0.06);
      }

      dummy.position.copy(cube.position);

      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.002;

      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // cinematic rotation
    meshRef.current.rotation.x += 0.0015;
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.z += 0.001;

    // floating motion
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <group position={[4, 0, 0]}>
      <instancedMesh
        ref={meshRef}
        args={[null, null, COUNT]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.035, 0.035, 0.035]} />

        <meshStandardMaterial
          color="#D8BC7A"
          roughness={0.25}
          metalness={0.85}
        />
      </instancedMesh>
    </group>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function Cube() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 45,
        }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, 5]} intensity={1.5} />

        <CubePieces />
      </Canvas>
    </div>
  );
}