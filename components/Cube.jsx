"use client";

import { useState } from "react";

const faces = [
  { name: "front", delay: 0 },
  { name: "back", delay: 0.15 },
  { name: "right", delay: 0.3 },
  { name: "left", delay: 0.45 },
  { name: "top", delay: 0.6 },
  { name: "bottom", delay: 0.75 },
];

export default function Cube() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
          <div className="absolute inset-0 cube-scene">
            <div className={`cube${hovered ? " exploding" : ""}`}>
              {faces.map(({ name, delay }) => (
                <div key={name} className={`cube-face ${name}`}>
                  <div
                    className="cube-face-inner"
                    style={{ transitionDelay: `${delay}s` }}
                  >
                    <div className="cube-face-grid" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-amber-400/60 rounded-full shadow-[0_0_60px_30px_rgba(251,191,36,0.2)]" />
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * 360;
              return (
                <div
                  key={`burst-${i}`}
                  className={`burst-particle${hovered ? " active" : ""}`}
                  style={{
                    "--angle": `${angle}deg`,
                    "--distance": `${350 + (i % 6) * 100}px`,
                    "--delay": `${(i % 8) * 0.08}s`,
                    "--size": `${1.5 + (i % 4) * 1.5}px`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
