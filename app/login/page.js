"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import FadeUp from "@/components/FadeUp";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070d] text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <Navbar />

      <section className="flex flex-col items-center justify-center mt-20 px-6">
        <FadeUp>
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={100}>
          <p className="mt-4 text-white/40 text-center max-w-md">
            Continue your learning journey.
          </p>
        </FadeUp>

        <FadeUp delay={150}>
          <div className="mt-10 w-full max-w-md bg-white/[0.03] border border-white/[0.06] p-8 rounded-3xl">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="identifier"
                placeholder="Email or Username"
                value={form.identifier}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-full text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-full text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />

              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/40">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-amber-400 font-medium hover:text-amber-300">
                Sign up
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
