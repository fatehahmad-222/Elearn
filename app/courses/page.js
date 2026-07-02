"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import Footer from "@/components/Footer";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

export default function Courses() {
  const courses = [
    {
      title: "JavaScript Fundamentals",
      desc: "Master the building blocks of web development with JavaScript.",
      lessons: 24,
      level: "Beginner",
    },
    {
      title: "React for Modern Apps",
      desc: "Build interactive UIs with React, hooks, and modern tooling.",
      lessons: 32,
      level: "Intermediate",
    },
    {
      title: "Node.js Backend Development",
      desc: "Create scalable APIs, handle authentication, and work with databases.",
      lessons: 28,
      level: "Intermediate",
    },
    {
      title: "Python for Data Science",
      desc: "Learn data analysis, visualization, and machine learning with Python.",
      lessons: 40,
      level: "Beginner",
    },
    {
      title: "UI/UX Design Principles",
      desc: "Design beautiful, user-friendly interfaces from scratch.",
      lessons: 18,
      level: "All Levels",
    },
    {
      title: "Full-Stack Web Development",
      desc: "Go from frontend to backend and build complete web applications.",
      lessons: 56,
      level: "Advanced",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <Ticker />
      <Navbar />

      <section className="text-center mt-24 px-6">
        <FadeUp>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Our Courses
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={100}>
          <p className="mt-3 text-white/40 max-w-lg mx-auto">
            Explore our curated collection of courses designed to take you from beginner to pro.
          </p>
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8 mb-24">
        {courses.map((course, i) => (
          <FadeUp key={course.title} delay={i * 80}>
            <div className="group p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1 flex flex-col">
              <div className="h-36 rounded-xl mb-5 bg-gradient-to-br from-amber-500/10 to-amber-600/5" />
              <span className="text-xs text-amber-400 uppercase tracking-wide mb-2">{course.level}</span>
              <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-amber-400 transition-colors">{course.title}</h3>
              <p className="text-white/40 text-sm mb-4 flex-1">{course.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">{course.lessons} lessons</span>
                <button className="px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-300">
                  Enroll Now
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
