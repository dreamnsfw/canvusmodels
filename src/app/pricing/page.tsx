import { Navbar } from "@/components/Navbar";
import Link from "next/link";

const plans = [
  { credits: 1000, price: "$10", popular: false, features: ["~100 images", "~10 videos", "Email support"] },
  { credits: 3000, price: "$25", popular: true, features: ["~300 images", "~30 videos", "Priority support"] },
  { credits: 7000, price: "$50", popular: false, features: ["~700 images", "~70 videos", "Priority support", "API access"] },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Simple Pricing</h1>
            <p className="mt-4 text-xl text-gray-400">
              Pay as you go with flexible credit packs
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.credits}
                className={`relative rounded-xl border p-8 ${
                  plan.popular
                    ? "border-purple-500 bg-purple-600/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.credits.toLocaleString()} Credits</h3>
                <p className="mt-4 text-4xl font-bold text-purple-400">{plan.price}</p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-purple-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 font-semibold transition ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border border-white/20 hover:bg-white/5"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
