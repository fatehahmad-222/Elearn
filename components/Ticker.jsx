"use client";
import { useEffect, useRef, useState } from "react";

function Ticker() {
  const tickerRef = useRef(null);
  const [width, setWidth] = useState(0);

  const items = [
    "Learn at your own pace",
    "New courses every week",
    "Build real-world skills",
    "Join a global community",
  ];

  useEffect(() => {
    if (tickerRef.current) {
      setWidth(tickerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-white/[0.04] bg-white/[0.02]">

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#07070d] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#07070d] to-transparent z-10" />

      <div
        ref={tickerRef}
        className="flex whitespace-nowrap"
        style={{
          animation: width
            ? `scroll ${width / 50}s linear infinite`
            : "none",
        }}
      >
        {[...items, ...items].map((text, i) => (
          <span
            key={i}
            className="mx-12 py-3 text-xs tracking-widest text-white/30 uppercase"
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${width}px);
          }
        }
      `}</style>
    </div>
  );
}

export default Ticker;
