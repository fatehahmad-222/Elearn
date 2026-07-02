"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import Footer from "@/components/Footer";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

export default function Explore() {
  const categories = [
    { name: "Programming", count: "24 courses", path: "/explore/programming" },
    { name: "Design", count: "18 courses", path: "/explore/design" },
    { name: "Marketing", count: "12 courses", path: "/explore/marketing" },
    { name: "Business", count: "15 courses", path: "/explore/business" },
    { name: "Photography", count: "9 courses" },
    { name: "Music", count: "11 courses" },
  ];

  const featured = [
    { title: "JavaScript Mastery", lessons: 48, rating: 4.8 },
    { title: "UI/UX Design Fundamentals", lessons: 36, rating: 4.7 },
    { title: "Data Science with Python", lessons: 52, rating: 4.9 },
    { title: "Digital Marketing 101", lessons: 28, rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <Ticker />
      <Navbar />

      <section className="relative max-w-6xl mx-auto px-6 mt-16">
        <FadeUp>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-3.5 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            />
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <h1 className="text-4xl md:text-5xl font-bold mt-16">
            Explore
          </h1>
        </FadeUp>
        <FadeUp delay={200}>
          <p className="mt-3 text-white/40 max-w-2xl">
            Discover courses across a wide range of categories. Find what inspires you.
          </p>
        </FadeUp>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <FadeUp>
          <h2 className="text-2xl font-semibold mb-8">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Categories</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const content = (
              <FadeUp key={cat.name} delay={i * 80}>
                <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 mb-4" />
                  <h3 className="font-medium text-white">{cat.name}</h3>
                  <p className="text-sm text-white/40 mt-1">{cat.count}</p>
                </div>
              </FadeUp>
            );
            return cat.path ? (
              <Link key={cat.name} href={cat.path}>{content}</Link>
            ) : (
              <div key={cat.name}>{content}</div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-20 mb-24">
        <FadeUp>
          <h2 className="text-2xl font-semibold mb-8">
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Featured Courses</span>
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-4 gap-6">
          {featured.map((course, i) => (
            <FadeUp key={course.title} delay={i * 80}>
              <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group">
                <div className="h-32 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl mb-4" />
                <h3 className="font-medium text-white group-hover:text-amber-400 transition-colors">{course.title}</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-white/40">
                  <span>{course.lessons} lessons</span>
                  <span className="text-amber-400">★ {course.rating}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
