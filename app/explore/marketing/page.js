import Link from "next/link";
import Ticker from "@/components/Ticker";
import ParticleHero from "@/components/DynamicParticleHero";

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
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans overflow-x-hidden">
      <Ticker />

      <header className="relative z-20 flex justify-between items-center px-8 py-5">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight">E.</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/explore" className="hover:text-black transition">Explore</Link>
          <Link href="/courses" className="hover:text-black transition">Courses</Link>
          <Link href="/pricing" className="hover:text-black transition">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="text-sm text-gray-700 hover:text-black transition">Log in</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:opacity-90 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <ParticleHero />
        <div className="relative z-10 text-center px-6">
          <span className="px-4 py-1.5 bg-gray-900/10 rounded-full text-xs tracking-widest uppercase text-gray-500 border border-gray-900/10">
            Category
          </span>
          <h1 className="text-6xl md:text-8xl font-bold mt-6 tracking-tight text-gray-900">
            Marketing
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
            Reach the right audience, tell your story, and grow your brand.
          </p>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-20 grid md:grid-cols-3 gap-6 pb-24">
        {courses.map((course, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="h-40 rounded-xl mb-5 bg-gradient-to-br from-green-100 to-emerald-100 border border-gray-100" />
            <span className="text-xs text-green-500 uppercase tracking-wide font-medium">{course.level}</span>
            <h3 className="font-semibold text-lg mt-1 text-gray-900 group-hover:text-green-600 transition">{course.title}</h3>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>{course.lessons} lessons</span>
              <button className="px-4 py-1.5 bg-black text-white rounded-full text-xs hover:opacity-90 transition">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}
