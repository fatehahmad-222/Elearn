"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ color, count = 2000 }) {
  const ref = useRef();

  const { positions, thetas, phis, radii, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const th = new Float32Array(count);
    const ph = new Float32Array(count);
    const rd = new Float32Array(count);
    const sp = new Float32Array(count);
    const ps = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi);
      th[i] = theta;
      ph[i] = phi;
      rd[i] = radius;
      sp[i] = 0.2 + Math.random() * 0.3;
      ps[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, thetas: th, phis: ph, radii: rd, speeds: sp, phases: ps };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      thetas[i] += 0.002 + Math.sin(t * 0.1 + phases[i]) * 0.001;
      phis[i] += 0.0005 + Math.cos(t * 0.08 + phases[i]) * 0.0003;
      const r = radii[i] + Math.sin(t * speeds[i] + phases[i]) * 0.5;
      const idx = i * 3;
      pos[idx] = r * Math.sin(phis[i]) * Math.cos(thetas[i]);
      pos[idx + 1] = r * Math.sin(phis[i]) * Math.sin(thetas[i]) * 0.6;
      pos[idx + 2] = r * Math.cos(phis[i]);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.x += 0.0003;
    ref.current.rotation.y += 0.0008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleHero({ color = "#B89B5E" }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 14], fov: 50 }} gl={{ alpha: true }}>
        <Particles color={color} />
      </Canvas>
    </div>
  );
}
