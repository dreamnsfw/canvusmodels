"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const tiers = [
  { name: "Starter", credits: 1000, price: 1000, popular: false, features: ["~100 images", "~10 videos", "Email support"] },
  { name: "Pro", credits: 3000, price: 2500, popular: true, features: ["~300 images", "~30 videos", "Priority support"] },
  { name: "Ultra", credits: 7000, price: 5000, popular: false, features: ["~700 images", "~70 videos", "Priority support", "API access"] },
];

export default function PricingPage() {
  return (
    <section className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold md:text-6xl">
            Simple <span className="text-gradient">Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            Pay as you go with flexible credit packs. Use credits across all models.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card glass hover className={`relative p-8 h-full flex flex-col ${tier.popular ? "border-accent-500/40 ring-1 ring-accent-500/20" : ""}`}>
                {tier.popular && (
                  <Badge variant="premium" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-3">
                  <span className="text-4xl font-bold">{formatCurrency(tier.price)}</span>
                  <span className="text-white/40 text-sm ml-1"> / {tier.credits.toLocaleString()} credits</span>
                </p>
                <p className="mt-1 text-xs text-white/30">
                  {(tier.price / tier.credits).toFixed(1)}¢ per credit
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
                    Get {tier.name} <ArrowRight size={14} />
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
