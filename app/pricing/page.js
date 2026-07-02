import Link from "next/link";

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
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans">
      <header className="flex justify-between items-center px-8 py-5">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight cursor-pointer">E.</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/explore">Explore</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/pricing" className="text-black font-medium">Pricing</Link>
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
        <h1 className="text-4xl md:text-5xl font-bold">Simple Pricing</h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto">
          Choose the plan that fits your learning goals. Upgrade anytime.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-3 gap-8 mb-24">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative bg-white rounded-3xl p-8 border ${
              plan.popular ? "border-black shadow-lg" : "shadow-sm"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs rounded-full font-medium">
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>

            <ul className="mt-8 flex flex-col gap-4">
              {plan.features.map((f, j) => (
                <li key={j} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`mt-10 w-full py-3 rounded-full text-sm font-medium ${
                plan.popular
                  ? "bg-black text-white hover:opacity-90"
                  : "border border-gray-300 hover:border-gray-400"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} E-Learn Platform
      </footer>
    </div>
  );
}
