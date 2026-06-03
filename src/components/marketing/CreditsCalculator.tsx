"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const tiers = [
  { name: "Starter", credits: 1000, price: "$10", popular: false, features: ["~100 images", "~10 videos", "Email support"] },
  { name: "Pro", credits: 3000, price: "$25", popular: true, features: ["~300 images", "~30 videos", "Priority support"] },
  { name: "Ultra", credits: 7000, price: "$50", popular: false, features: ["~700 images", "~70 videos", "Priority support", "API access"] },
];

export function CreditsCalculator() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Simple <span className="text-gradient">Credit System</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Buy credits once, use them across all models. No subscriptions, no hidden fees.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                hover
                glass
                className={`relative p-8 ${tier.popular ? "border-accent-500/40 ring-1 ring-accent-500/20" : ""}`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-4 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-white/40 text-sm ml-1">/ {tier.credits.toLocaleString()} credits</span>
                </p>
                <div className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="h-1 w-1 rounded-full bg-accent-400" />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
