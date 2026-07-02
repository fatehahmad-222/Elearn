import Link from "next/link";

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
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans">
      <header className="flex justify-between items-center px-8 py-5">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight cursor-pointer">E.</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/explore">Explore</Link>
          <Link href="/courses" className="text-black font-medium">Courses</Link>
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

      <section className="text-center mt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Our Courses</h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Explore our curated collection of courses designed to take you from beginner to pro.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8 mb-24">
        {courses.map((course, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md transition flex flex-col"
          >
            <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-5" />

            <span className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {course.level}
            </span>

            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{course.desc}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{course.lessons} lessons</span>
              <button className="px-5 py-2 bg-black text-white rounded-full text-sm hover:opacity-90">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}
