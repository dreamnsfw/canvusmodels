import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ActivityFeed } from "@/components/billing/TransactionList";

export default async function ActivityPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [transactions, generations] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.generation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Activity</h1>
        <p className="mt-1 text-white/50">Your credit transactions and generations</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">Transactions</h2>
          <ActivityFeed transactions={transactions as any} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Generations</h2>
          <div className="space-y-2">
            {generations.length === 0 ? (
              <p className="text-sm text-white/30 py-8 text-center">No generations yet</p>
            ) : (
              generations.map((gen) => (
                <div key={gen.id} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 shrink-0">
                    <span className="text-xs">{gen.type === "image" ? "🖼" : "🎬"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{gen.prompt}</p>
                    <p className="text-xs text-white/30">
                      {gen.status} · {gen.credits} credits
                    </p>
                  </div>
                  <span className="text-xs text-white/30 shrink-0">
                    {new Date(gen.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
