"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";
import Footer from "@/components/Footer";

const Ticker = dynamic(() => import("@/components/Ticker"), {
  ssr: false,
  loading: () => null,
});

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: ["5 courses", "Basic quizzes", "Community access", "No certificate"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      features: ["Unlimited courses", "Advanced quizzes", "Priority support", "Certificates"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "/month",
      features: ["Everything in Pro", "Team dashboard", "Custom content", "Dedicated support"],
      cta: "Contact Sales",
      popular: false,
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
              Simple Pricing
            </span>
          </h1>
        </FadeUp>
        <FadeUp delay={100}>
          <p className="mt-3 text-white/40 max-w-lg mx-auto">
            Choose the plan that fits your learning goals. Upgrade anytime.
          </p>
        </FadeUp>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8 mb-24">
        {plans.map((plan, i) => (
          <FadeUp key={plan.name} delay={i * 100}>
            <div
              className={`relative bg-white/[0.03] border ${
                plan.popular ? "border-amber-400/30 shadow-lg shadow-amber-500/5" : "border-white/[0.06]"
              } rounded-3xl p-8 hover:bg-white/[0.06] transition-all duration-500`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs rounded-full font-medium">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-sm text-white/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-10 w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-105 active:scale-95"
                    : "border border-white/[0.12] text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </FadeUp>
        ))}
      </section>

      <Footer />
    </div>
  );
}
