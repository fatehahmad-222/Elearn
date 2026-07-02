"use client";

import { useRef, useEffect, useCallback } from "react";

export default function Cube() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const targetsRef = useRef([]);
  const origRef = useRef([]);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 5000;
    const half = 120;
    const particles = [];
    const orig = [];
    const targets = [];

    for (let i = 0; i < count; i++) {
      const face = Math.floor(Math.random() * 6);
      let x, y, z;
      const r = half;
      const jitter = 3;
      switch (face) {
        case 0:
          x = (Math.random() - 0.5) * 2 * r; y = (Math.random() - 0.5) * 2 * r; z = r + (Math.random() - 0.5) * jitter;
          break;
        case 1:
          x = (Math.random() - 0.5) * 2 * r; y = (Math.random() - 0.5) * 2 * r; z = -r + (Math.random() - 0.5) * jitter;
          break;
        case 2:
          x = r + (Math.random() - 0.5) * jitter; y = (Math.random() - 0.5) * 2 * r; z = (Math.random() - 0.5) * 2 * r;
          break;
        case 3:
          x = -r + (Math.random() - 0.5) * jitter; y = (Math.random() - 0.5) * 2 * r; z = (Math.random() - 0.5) * 2 * r;
          break;
        case 4:
          x = (Math.random() - 0.5) * 2 * r; y = r + (Math.random() - 0.5) * jitter; z = (Math.random() - 0.5) * 2 * r;
          break;
        case 5:
          x = (Math.random() - 0.5) * 2 * r; y = -r + (Math.random() - 0.5) * jitter; z = (Math.random() - 0.5) * 2 * r;
          break;
      }
      const p = { x, y, z };
      particles.push(p);
      orig.push({ x, y, z });
      targets.push({ x, y, z });
    }

    particlesRef.current = particles;
    origRef.current = orig;
    targetsRef.current = targets;

    function project(x, y, z, rx, ry) {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      let nx = x * cosY - z * sinY;
      let nz = x * sinY + z * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      let ny = y * cosX - nz * sinX;
      let nz2 = y * sinX + nz * cosX;
      const persp = 600;
      const s = persp / (persp + nz2);
      return {
        x: nx * s + canvas.width / 2,
        y: ny * s + canvas.height / 2,
        s,
      };
    }

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time / 1000;
      const angleY = t * 0.12;
      const angleX = Math.sin(t * 0.25) * 0.3;
      const pts = particlesRef.current;
      const tgts = targetsRef.current;
      const speed = hoveredRef.current ? 0.07 : 0.025;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const tgt = tgts[i];
        p.x += (tgt.x - p.x) * speed;
        p.y += (tgt.y - p.y) * speed;
        p.z += (tgt.z - p.z) * speed;

        const pr = project(p.x, p.y, p.z, angleX, angleY);
        if (pr.s < 0.05) continue;

        const size = Math.max(0.4, 1.8 * pr.s);
        const alpha = Math.min(1, 0.2 + 0.8 * pr.s);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
        ctx.fill();

        if (size > 1.5) {
          ctx.shadowColor = "rgba(251, 191, 36, 0.3)";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const burst = useCallback(() => {
    const targets = targetsRef.current;
    for (let i = 0; i < targets.length; i++) {
      targets[i].x = (Math.random() - 0.5) * 5000;
      targets[i].y = (Math.random() - 0.5) * 4000;
      targets[i].z = (Math.random() - 0.5) * 3000;
    }
  }, []);

  const restore = useCallback(() => {
    const targets = targetsRef.current;
    const orig = origRef.current;
    for (let i = 0; i < targets.length; i++) {
      targets[i].x = orig[i].x;
      targets[i].y = orig[i].y;
      targets[i].z = orig[i].z;
    }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />
      <div
        className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-10"
        onMouseEnter={() => { hoveredRef.current = true; burst(); }}
        onMouseLeave={() => { hoveredRef.current = false; restore(); }}
      />
    </>
  );
}
