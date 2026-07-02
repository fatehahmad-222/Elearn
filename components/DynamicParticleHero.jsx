"use client";
import dynamic from "next/dynamic";

const ParticleHero = dynamic(() => import("@/components/ParticleHero"), {
  ssr: false,
  loading: () => null,
});

export default function DynamicParticleHero(props) {
  return <ParticleHero {...props} />;
}
