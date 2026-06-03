"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const tiers = [
  { name: "Starter", credits: 1000, price: 1000, popular: false, features: ["~100 images", "~10 videos", "Email support"] },
  { name: "Pro", credits: 3000, price: 2500, popular: true, features: ["~300 images", "~30 videos", "Priority support"] },
  { name: "Ultra", credits: 7000, price: 5000, popular: false, features: ["~700 images", "~70 videos", "Priority support", "API access"] },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Buy credits, use them across all models. Nothing expires.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                hover
                glass
                className={`relative p-8 h-full flex flex-col ${tier.popular ? "border-accent-500/40 ring-1 ring-accent-500/20" : ""}`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-600 px-4 py-1 text-xs font-semibold whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-2">
                  <span className="text-4xl font-bold">${tier.price / 100}</span>
                  <span className="text-white/40 text-sm ml-1"> / {tier.credits.toLocaleString()} credits</span>
                </p>
                <p className="mt-1 text-xs text-white/30">
                  ${(tier.price / tier.credits).toFixed(1)} per credit
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <Check size={14} className="text-accent-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <Button variant={tier.popular ? "primary" : "outline"} className="w-full">
                    Get {tier.name}
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
