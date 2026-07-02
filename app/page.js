"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight, BookOpen, Users, Star,
  Code, Palette, BarChart3, Briefcase,
  GraduationCap, Sparkles, ChevronDown
} from "lucide-react";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

const Cube = dynamic(() => import("@/components/Cube"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" />,
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
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Categories
            </span>
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
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              E.
            </span>
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
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Works
            </span>
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
              <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Learning?
              </span>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <Ticker />
      <Navbar />
      <Hero />
      <StatsBar />
      <Categories />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
