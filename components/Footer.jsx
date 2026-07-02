import Link from "next/link";

export default function Footer() {
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
