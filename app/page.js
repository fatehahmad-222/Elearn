"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  BookOpen, Users, Star, ChevronDown
} from "lucide-react";
import Cube from "@/components/Cube";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

const BelowFold = dynamic(() => import("@/components/BelowFold"), {
  ssr: false,
  loading: () => null,
});

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FloatingBadge({ icon: Icon, value, label, className }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] shadow-2xl select-none ${className}`}>
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-500/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{value}</p>
        <p className="text-xs text-white/40">{label}</p>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="relative z-50 flex justify-between items-center px-6 md:px-10 py-5 max-w-7xl mx-auto">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            E.
          </span>
        </h1>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm">
        {[
          { href: "/explore", label: "Explore" },
          { href: "/courses", label: "Courses" },
          { href: "/pricing", label: "Pricing" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/50 hover:text-white/90 transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login">
          <button className="text-sm text-white/60 hover:text-white transition-colors duration-300">
            Log in
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/20">
            Sign Up Free
          </button>
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-[15%] -left-[8%] w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[45%] right-[25%] w-[350px] h-[350px] bg-amber-400/4 rounded-full blur-[80px]" />
      </div>

      <Cube />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-xs text-white/60 tracking-wide uppercase">
                Now Enrolling &mdash; Summer 2026
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <h1 className="text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-tight">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
                THE MODERN
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                LEARNING
              </span>
              <br />
              <span className="text-white">EXPERIENCE</span>
            </h1>
          </FadeUp>

          <FadeUp delay={300}>
            <p className="mt-6 text-base md:text-lg text-white/40 max-w-lg leading-relaxed">
              Master in-demand skills with expert-led courses. Interactive projects, real-world scenarios, and certifications that matter.
            </p>
          </FadeUp>

          <FadeUp delay={450}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              
             
            </div>
          </FadeUp>
        </div>
      </div>

      <FloatingBadge
        icon={BookOpen}
        value="500+"
        label="Expert Courses"
        className="absolute top-[22%] right-[6%] hidden lg:flex animate-float"
      />
      <FloatingBadge
        icon={Users}
        value="50K+"
        label="Active Students"
        className="absolute top-[52%] right-[2%] hidden lg:flex animate-float-delayed"
      />
      <FloatingBadge
        icon={Star}
        value="4.9"
        label="Avg. Rating"
        className="absolute bottom-[28%] right-[10%] hidden lg:flex animate-float-slow"
      />

      <div className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2 text-white/20 z-20">
        
        <ChevronDown className="w-4 h-4 animate-scroll-hint" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <Ticker />
      <Navbar />
      <Hero />
      <BelowFold />
    </div>
  );
}
