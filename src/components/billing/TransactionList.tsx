import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

interface ActivityFeedProps {
  transactions: Transaction[];
}

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  if (transactions.length === 0) {
    return <p className="text-sm text-white/30 py-8 text-center">No transactions yet</p>;
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
              tx.type === "purchase" || tx.type === "bonus"
                ? "bg-success/10"
                : "bg-error/10"
            )}
          >
            <span className="text-xs">
              {tx.type === "purchase" || tx.type === "bonus" ? "💰" : "➖"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              {tx.description || tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
            </p>
            <p className="text-xs text-white/30 capitalize">{tx.type}</p>
          </div>
          <span
            className={cn(
              "text-sm font-medium shrink-0",
              tx.amount > 0 ? "text-success" : "text-error"
            )}
          >
            {tx.amount > 0 ? "+" : ""}
            {tx.amount.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
