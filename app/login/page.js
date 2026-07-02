"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900 font-sans">
      <header className="flex justify-between items-center px-8 py-5">
        <h1 className="text-xl font-semibold tracking-tight">E.</h1>
        <Link href="/signup">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:opacity-90">
            Sign Up
          </button>
        </Link>
      </header>

      <section className="flex flex-col items-center justify-center mt-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="mt-4 text-gray-600 text-center max-w-md">
          Continue your learning journey.
        </p>

        <div className="mt-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            {/* ✅ Email OR Username */}
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={form.identifier}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-full focus:ring-2 focus:ring-black"
            />

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-full hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}