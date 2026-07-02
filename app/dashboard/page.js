"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, BookOpen, BarChart3, User, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#07070d] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/[0.06] p-6 hidden md:flex flex-col justify-between">
        <div>
          <Link href="/">
            <h1 className="text-xl font-bold mb-10">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                E.
              </span>
            </h1>
          </Link>
          <nav className="flex flex-col gap-4 text-sm">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === "overview" ? "text-amber-400" : "text-white/40 hover:text-white/80"
              }`}
            >
              <BarChart3 size={18} /> Overview
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === "courses" ? "text-amber-400" : "text-white/40 hover:text-white/80"
              }`}
            >
              <BookOpen size={18} /> My Courses
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 transition-colors ${
                activeTab === "profile" ? "text-amber-400" : "text-white/40 hover:text-white/80"
              }`}
            >
              <User size={18} /> Profile
            </button>
          </nav>
        </div>

        <div className="text-xs text-white/20">
          © {new Date().getFullYear()} E-Learn
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-white/20" size={16} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer text-white/40 hover:text-white/80 transition-colors" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500" />
          </div>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {["Courses", "Hours", "Certificates", "Progress"].map((item, i) => (
                <FadeUp key={item} delay={i * 60}>
                  <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl">
                    <p className="text-sm text-white/40">{item}</p>
                    <h3 className="text-2xl font-bold mt-2">{[12, 48, 5, "76% "][i]}</h3>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Continue Learning */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4 text-white/80">Continue Learning</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <FadeUp key={i} delay={i * 60}>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                      <div className="h-32 rounded-xl mb-4 bg-gradient-to-br from-amber-500/10 to-amber-600/5" />
                      <h4 className="font-medium">Course Title {i}</h4>
                      <p className="text-xs text-white/40 mt-1">Progress: {i * 25}%</p>
                      <div className="w-full bg-white/[0.06] h-2 rounded-full mt-2">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${i * 25}%` }}
                        />
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/80">Recommended</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {["UI Design", "React", "Marketing", "Startup"].map((course, i) => (
                  <FadeUp key={course} delay={i * 60}>
                    <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                      <div className="h-24 rounded-lg mb-3 bg-gradient-to-br from-amber-500/10 to-amber-600/5" />
                      <h4 className="text-sm font-medium">{course}</h4>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses */}
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Courses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <FadeUp key={i} delay={i * 60}>
                  <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                    <div className="h-32 rounded-xl mb-4 bg-gradient-to-br from-amber-500/10 to-amber-600/5" />
                    <h4 className="font-medium">Course {i}</h4>
                    <p className="text-xs text-white/40">12 lessons</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl max-w-md">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 mb-4" />
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-white/40">john@example.com</p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
