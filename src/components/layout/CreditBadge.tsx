"use client";

import { useSession } from "next-auth/react";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditBadgeProps {
  className?: string;
}

export function CreditBadge({ className }: CreditBadgeProps) {
  const { data: session } = useSession();
  const credits = (session?.user as { credits?: number })?.credits ?? 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl bg-accent-500/10 border border-accent-500/20 px-3 py-1.5",
        className
      )}
    >
      <Coins size={14} className="text-accent-300" />
      <span className="text-sm font-medium text-accent-300">
        {credits.toLocaleString()} credits
      </span>
    </div>
  );
}
