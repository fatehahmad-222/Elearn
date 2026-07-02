"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <Navbar />

      <section className="flex flex-col items-center justify-center mt-20 px-6">
        <FadeUp>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Create your account
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={100}>
          <p className="mt-4 text-white/40 text-center max-w-md">
            Start your journey and unlock unlimited learning opportunities.
          </p>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="mt-10 w-full max-w-md bg-white/[0.03] border border-white/[0.06] p-8 rounded-3xl">
            <form
              className="flex flex-col gap-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const email = e.target.email.value;
                const password = e.target.password.value;
                setMessage("");
                setIsError(false);
                try {
                  const res = await fetch("/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    setMessage(data.message);
                    setIsError(false);
                    e.target.reset();
                  } else {
                    setMessage(data.message);
                    setIsError(true);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage("Something went wrong");
                  setIsError(true);
                }
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Full name"
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-full text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-full text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-full text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />

              <button className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300">
                Sign Up
              </button>
            </form>

            {message && (
              <p className={`mt-4 text-center text-sm ${
                isError ? "text-red-400" : "text-green-400"
              }`}>
                {message}
              </p>
            )}

            <div className="mt-6 text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-400 font-medium hover:text-amber-300">
                Log in
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

      <footer className="mt-24 py-8 text-center text-white/20 text-sm">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}
