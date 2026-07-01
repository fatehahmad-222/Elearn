"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, BookOpen, BarChart3, User, Search } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-10">E.</h1>
          <nav className="flex flex-col gap-4 text-sm">
            <button onClick={() => setActiveTab("overview")} className="flex items-center gap-2 hover:text-black">
              <BarChart3 size={18}/> Overview
            </button>
            <button onClick={() => setActiveTab("courses")} className="flex items-center gap-2 hover:text-black">
              <BookOpen size={18}/> My Courses
            </button>
            <button onClick={() => setActiveTab("profile")} className="flex items-center gap-2 hover:text-black">
              <User size={18}/> Profile
            </button>
          </nav>
        </div>

        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} E-Learn
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-full border bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="cursor-pointer" />
            <div className="w-9 h-9 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {["Courses", "Hours", "Certificates", "Progress"].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                  <p className="text-sm text-gray-500">{item}</p>
                  <h3 className="text-2xl font-bold mt-2">{[12, 48, 5, "76% "][i]}</h3>
                </div>
              ))}
            </div>

            {/* Continue Learning */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4">Continue Learning</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="h-32 bg-gray-200 rounded-xl mb-4" />
                    <h4 className="font-medium">Course Title {i}</h4>
                    <p className="text-xs text-gray-500 mt-1">Progress: {i*25}%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                      <div className="bg-black h-2 rounded-full" style={{width: `${i*25}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {["UI Design", "React", "Marketing", "Startup"].map((course, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="h-24 bg-gray-200 rounded-lg mb-3" />
                    <h4 className="text-sm font-medium">{course}</h4>
                  </div>
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
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="h-32 bg-gray-200 rounded-xl mb-4" />
                  <h4 className="font-medium">Course {i}</h4>
                  <p className="text-xs text-gray-500">12 lessons</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md">
              <div className="w-16 h-16 rounded-full bg-gray-300 mb-4" />
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">john@example.com</p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-full text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
