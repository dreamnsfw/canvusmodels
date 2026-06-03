"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function CreditBalance() {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/credits")
        .then((res) => res.json())
        .then((data) => setCredits(data.credits))
        .catch(() => {});
    }
  }, [session]);

  if (!session?.user) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-gray-400">Credit Balance</p>
      <p className="mt-1 text-2xl font-bold text-purple-400">
        {credits !== null ? credits.toLocaleString() : "..."}
      </p>
      <p className="text-xs text-gray-500">credits remaining</p>
    </div>
  );
}
