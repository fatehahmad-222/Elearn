"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Starfield() {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -(Math.random() * 35 + 8);
    }
    return pos;
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CubePieces() {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);

  const COUNT = 5400;
  const dummy = new THREE.Object3D();

  const cubes = useMemo(() => {
    const temp = [];
    const size = 3;

    for (let i = 0; i < COUNT; i++) {
      const original = new THREE.Vector3(
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size
      );

      let dir = original.clone().normalize();
      if (dir.length() < 0.001) {
        dir = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize();
      }

      temp.push({
        original,
        dir,
        position: original.clone(),
        scatterOffset: 0,
        scatterSpeed: 0.05 + Math.random() * 0.07,
      });
    }

    return temp;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    cubes.forEach((cube, i) => {
      if (hovered) {
        cube.scatterOffset += cube.scatterSpeed;
      } else {
        cube.scatterOffset *= 0.92;
      }

      const targetPos = cube.original.clone().add(
        cube.dir.clone().multiplyScalar(cube.scatterOffset)
      );
      cube.position.lerp(targetPos, 0.06);

      dummy.position.copy(cube.position);
      dummy.rotation.x += 0.002;
      dummy.rotation.y += 0.002;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    meshRef.current.rotation.x += 0.0012;
    meshRef.current.rotation.y += 0.0018;
    meshRef.current.rotation.z += 0.0008;

    scaleRef.current += ((hovered ? 1.8 : 1) - scaleRef.current) * 0.08;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={groupRef} position={[3.8, 0, 0]}>
      <mesh visible={false} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[5, 5, 5]} />
      </mesh>
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <boxGeometry args={[0.055, 0.055, 0.055]} />
        <meshStandardMaterial
          color="#C89B3C"
          emissive="#C89B3C"
          emissiveIntensity={0.2}
          metalness={0.85}
          roughness={0.15}
        />
      </instancedMesh>
    </group>
  );
}

export default function Cube() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -2, 4]} intensity={0.6} color="#C89B3C" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#FFD700" />
        <Starfield />
        <CubePieces />
      </Canvas>
    </div>
  );
}
