import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, Image, Coins, Box } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const [userCount, generationCount, totalRevenue, modelCount, recentTransactions] =
    await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.transaction.aggregate({
        where: { type: "purchase" },
        _sum: { amount: true },
      }),
      prisma.model.count(),
      prisma.transaction.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, color: "text-info" },
    { label: "Generations", value: generationCount, icon: Image, color: "text-success" },
    { label: "Revenue (credits)", value: totalRevenue._sum.amount ?? 0, icon: Coins, color: "text-warning" },
    { label: "AI Models", value: modelCount, icon: Box, color: "text-accent-300" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-white/50">System overview and management</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} glass className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10">
                <stat.icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <Card glass className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-3 text-sm">{tx.user.name || tx.user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={tx.type === "purchase" ? "success" : "default"} size="sm">
                      {tx.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{tx.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-white/40">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
