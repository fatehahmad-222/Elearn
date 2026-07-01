"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900 font-sans">

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5">
        <h1 className="text-xl font-semibold tracking-tight">E.</h1>

        <Link href="/login">
          <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:opacity-90">
            Log In
          </button>
        </Link>
      </header>

      {/* Signup Section */}
      <section className="flex flex-col items-center justify-center mt-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
          Create your account
        </h1>

        <p className="mt-4 text-gray-600 text-center max-w-md">
          Start your journey and unlock unlimited learning opportunities.
        </p>

        <div className="mt-10 w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border">

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
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name, email, password }),
                });

                const data = await res.json();

                if (data.success) {
                  setMessage(data.message);
                  setIsError(false);
                  e.target.reset(); // clear form
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
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button className="w-full py-3 bg-black text-white rounded-full hover:opacity-90">
              Sign Up
            </button>
          </form>

          {/* Message */}
          {message && (
            <p className={`mt-4 text-center text-sm ${
              isError ? "text-red-600" : "text-green-600"
            }`}>
              {message}
            </p>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}