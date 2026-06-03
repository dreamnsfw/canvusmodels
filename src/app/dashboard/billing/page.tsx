"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Check, ArrowRight, Coins } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const CREDIT_PACKS = [
  { id: "credits_1000", name: "Starter", credits: 1000, price: 1000, popular: false },
  { id: "credits_3000", name: "Pro", credits: 3000, price: 2500, popular: true },
  { id: "credits_7000", name: "Ultra", credits: 7000, price: 5000, popular: false },
];

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packId: string) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-1 text-white/50">Purchase credit packs to start generating</p>
      </div>

      <Card glass className="p-6 inline-flex items-center gap-3">
        <Coins size={20} className="text-accent-300" />
        <div>
          <p className="text-xs text-white/40">Current Balance</p>
          <p className="text-2xl font-bold">0 credits</p>
        </div>
      </Card>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid gap-6 md:grid-cols-3"
      >
        {CREDIT_PACKS.map((pack) => (
          <motion.div
            key={pack.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Card
              glass
              hover
              className={`relative p-8 ${pack.popular ? "border-accent-500/40 ring-1 ring-accent-500/20" : ""}`}
            >
              {pack.popular && (
                <Badge variant="premium" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-lg font-semibold">{pack.name}</h3>
              <p className="mt-3">
                <span className="text-4xl font-bold">{formatCurrency(pack.price)}</span>
              </p>
              <p className="mt-1 text-sm text-white/40">
                {pack.credits.toLocaleString()} credits
              </p>
              <p className="text-xs text-white/30 mt-1">
                {(pack.price / pack.credits).toFixed(1)}¢ per credit
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Check size={14} className="text-accent-400" />
                  {pack.credits.toLocaleString()} credits
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Check size={14} className="text-accent-400" />
                  Use on any model
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Check size={14} className="text-accent-400" />
                  Credits never expire
                </li>
              </ul>
              <Button
                onClick={() => handlePurchase(pack.id)}
                loading={loading === pack.id}
                variant={pack.popular ? "primary" : "outline"}
                className="w-full mt-8"
              >
                Buy Now
                <ArrowRight size={14} />
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
