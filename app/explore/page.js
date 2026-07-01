"use client";

import Link from "next/link";
import Ticker from "@/components/Ticker";
import { Search } from "lucide-react";

export default function Explore() {
  const categories = [
    { name: "Programming", count: "24 courses", color: "bg-blue-100", path: "/explore/programming" },
    { name: "Design", count: "18 courses", color: "bg-pink-100", path: "/explore/design" },
    { name: "Marketing", count: "12 courses", color: "bg-green-100", path: "/explore/marketing" },
    { name: "Business", count: "15 courses", color: "bg-purple-100", path: "/explore/business" },
    { name: "Photography", count: "9 courses", color: "bg-yellow-100" },
    { name: "Music", count: "11 courses", color: "bg-red-100" },
  ];

  const featured = [
    { title: "JavaScript Mastery", lessons: 48, rating: 4.8 },
    { title: "UI/UX Design Fundamentals", lessons: 36, rating: 4.7 },
    { title: "Data Science with Python", lessons: 52, rating: 4.9 },
    { title: "Digital Marketing 101", lessons: 28, rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans">
      <Ticker />
      <header className="flex justify-between items-center px-8 py-5">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight cursor-pointer">E.</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/explore" className="text-black font-medium">Explore</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="text-sm text-gray-700 hover:text-black">Log in</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:opacity-90">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-12 pr-4 py-3 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-16">Explore</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Discover courses across a wide range of categories. Find what inspires you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-semibold mb-8">Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const content = (
              <div className="p-6 bg-white rounded-2xl border hover:shadow-md transition cursor-pointer">
                <div className={`w-10 h-10 rounded-lg ${cat.color} mb-4`} />
                <h3 className="font-medium">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count}</p>
              </div>
            );
            return cat.path ? (
              <Link key={i} href={cat.path}>{content}</Link>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-20 mb-24">
        <h2 className="text-2xl font-semibold mb-8">Featured Courses</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {featured.map((course, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-2xl border hover:shadow-md transition"
            >
              <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4" />
              <h3 className="font-medium">{course.title}</h3>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{course.lessons} lessons</span>
                <span>★ {course.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}
