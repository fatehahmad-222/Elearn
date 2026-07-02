"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import Footer from "@/components/Footer";
import ParticleHero from "@/components/ParticleHero";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

export default function Marketing() {
  const courses = [
    { title: "Digital Marketing 101", lessons: 20, level: "Beginner" },
    { title: "SEO & Content Strategy", lessons: 26, level: "Intermediate" },
    { title: "Social Media Marketing", lessons: 18, level: "Beginner" },
    { title: "Email Marketing Mastery", lessons: 14, level: "Intermediate" },
    { title: "Analytics & Data-Driven Marketing", lessons: 32, level: "Advanced" },
    { title: "Growth Hacking", lessons: 24, level: "Advanced" },
  ];

  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <Ticker />
      <Navbar />

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <ParticleHero color="#22C55E" />
        <div className="relative z-10 text-center px-6">
          <FadeUp>
            <span className="px-4 py-1.5 bg-white/[0.04] rounded-full text-xs tracking-widest uppercase text-white/40 border border-white/[0.06]">
              Category
            </span>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-6xl md:text-8xl font-bold mt-6 tracking-tight">
              <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
                Marketing
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-4 text-white/40 max-w-xl mx-auto text-lg">
              Reach the right audience, tell your story, and grow your brand.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-20 grid md:grid-cols-3 gap-6 pb-24">
        {courses.map((course, i) => (
          <FadeUp key={course.title} delay={i * 80}>
            <div className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1">
              <div className="h-40 rounded-xl mb-5 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-white/[0.04]" />
              <span className="text-xs text-green-400 uppercase tracking-wide font-medium">{course.level}</span>
              <h3 className="font-semibold text-lg mt-1 text-white group-hover:text-green-400 transition-colors">{course.title}</h3>
              <div className="flex items-center justify-between mt-4 text-sm text-white/40">
                <span>{course.lessons} lessons</span>
                <button className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full text-xs font-semibold hover:scale-105 transition-all duration-300">
                  Enroll
                </button>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      <Footer />
    </div>
  );
}
