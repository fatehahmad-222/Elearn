"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const pathRef = useRef(null);
  const points = useRef([]);
  const lastMoveTime = useRef(Date.now());

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  // screen size
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      lastMoveTime.current = Date.now();

      const newPoint = { x: e.clientX, y: e.clientY };
      points.current.push(newPoint);
    };

    window.addEventListener("mousemove", handleMove);

    let animationFrame;

    const animate = () => {
      const now = Date.now();
      const pts = points.current;

      // 🔥 smooth flow of points
      for (let i = 0; i < pts.length - 1; i++) {
        pts[i].x += (pts[i + 1].x - pts[i].x) * 0.25;
        pts[i].y += (pts[i + 1].y - pts[i].y) * 0.25;
      }

      // 🔥 NATURAL DECAY instead of hard cut
      if (now - lastMoveTime.current > 30) {
        // remove slowly
        pts.shift();
      }

      // max cap (safety)
      if (pts.length > 50) {
        pts.shift();
      }

      // build smooth path
      if (pathRef.current && pts.length > 1) {
        let d = `M ${pts[0].x} ${pts[0].y}`;

        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;

          d += ` Q ${pts[i].x} ${pts[i].y} ${xc} ${yc}`;
        }

        pathRef.current.setAttribute("d", d);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <svg
      className="fixed inset-0 pointer-events-none z-[9999]"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="threadFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="#C89B3C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        fill="none"
        stroke="url(#threadFade)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}