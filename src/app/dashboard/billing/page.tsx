"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const CREDIT_PACKS = [
  { id: "credits_1000", credits: 1000, price: 10 },
  { id: "credits_3000", credits: 3000, price: 25 },
  { id: "credits_7000", credits: 7000, price: 50 },
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
        <p className="mt-1 text-gray-400">Purchase credit packs</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {CREDIT_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/50"
          >
            <h3 className="text-lg font-semibold">{pack.credits.toLocaleString()} Credits</h3>
            <p className="mt-2 text-3xl font-bold text-purple-400">
              ${pack.price}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              ${(pack.price / pack.credits).toFixed(4)} per credit
            </p>
            <button
              onClick={() => handlePurchase(pack.id)}
              disabled={loading === pack.id}
              className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold transition hover:bg-purple-700 disabled:opacity-50"
            >
              {loading === pack.id ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
