"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar({ hideNav = false }) {
  const pathname = usePathname();

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
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors duration-300 ${
              pathname === link.href || pathname.startsWith(link.href + "/")
                ? "text-white/90"
                : "text-white/50 hover:text-white/90"
            }`}
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
