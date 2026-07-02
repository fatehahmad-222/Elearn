"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Code, Palette, BarChart3, Briefcase,
  GraduationCap, Star, Sparkles, ArrowRight,
} from "lucide-react";

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

function StatsBar() {
  const stats = [
    { value: "500+", label: "Courses" },
    { value: "50K+", label: "Students" },
    { value: "98%", label: "Satisfaction" },
    { value: "200+", label: "Instructors" },
  ];

  return (
    <section className="relative z-10 -mt-20 pb-20">
      <FadeUp>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-4 bg-[#07070d]/80">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-white/40 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Categories() {
  const categories = [
    { name: "Programming", icon: Code, desc: "Web, mobile & software development", color: "from-blue-500/20 to-blue-600/10" },
    { name: "Design", icon: Palette, desc: "UI/UX, graphic & product design", color: "from-purple-500/20 to-purple-600/10" },
    { name: "Marketing", icon: BarChart3, desc: "Digital marketing & growth", color: "from-emerald-500/20 to-emerald-600/10" },
    { name: "Business", icon: Briefcase, desc: "Entrepreneurship & management", color: "from-amber-500/20 to-amber-600/10" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-white/40 text-center mb-16 max-w-lg mx-auto">
            Choose from a wide range of expert-led courses tailored to your goals.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <FadeUp key={cat.name} delay={i * 100}>
              <Link href={`/explore/${cat.name.toLowerCase()}`}>
                <div className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cat.color}`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <cat.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-white/40">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: GraduationCap,
      title: "Interactive Learning",
      desc: "Hands-on projects, quizzes, and real-world scenarios that reinforce every concept you learn.",
    },
    {
      icon: Star,
      title: "Top Instructors",
      desc: "Learn from industry professionals with years of real-world experience and proven expertise.",
    },
    {
      icon: Sparkles,
      title: "Certifications",
      desc: "Earn verified certificates to showcase your skills and stand out to employers.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white/[0.01] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">E.</span>
          </h2>
          <p className="text-white/40 text-center mb-16 max-w-lg mx-auto">
            Everything you need to take your skills to the next level.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <FadeUp key={feat.title} delay={i * 120}>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-500">
                  <feat.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feat.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { step: "01", title: "Choose a Course", desc: "Browse our catalog of expert-crafted courses and find the perfect fit for your goals." },
    { step: "02", title: "Learn at Your Pace", desc: "Access lessons anytime, anywhere. Study on your schedule with lifetime access." },
    { step: "03", title: "Get Certified", desc: "Earn industry-recognized certificates and showcase your new expertise." },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-white/40 text-center mb-16 max-w-lg mx-auto">
            Three simple steps to start your learning journey.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((s, i) => (
            <FadeUp key={s.step} delay={i * 120}>
              <div className="text-center relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-500/5 border border-white/[0.06] flex items-center justify-center mx-auto mb-8 relative z-10 backdrop-blur-sm">
                  <span className="text-2xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{s.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6">
      <FadeUp>
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-white/[0.06] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Start{" "}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">Learning?</span>
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto">
              Join thousands of learners and start your journey today.
            </p>
            <Link href="/signup">
              <button className="px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-amber-500/30 inline-flex items-center gap-2 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-sm">&copy; {new Date().getFullYear()} E-Learn Platform</p>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <Link key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function BelowFold() {
  return (
    <>
      <StatsBar />
      <Categories />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  );
}
