import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminTransactionsPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { email: true, name: true } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="mt-1 text-white/50">All credit transactions</p>
      </div>
      <Card glass className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-sm">{tx.user.name ?? tx.user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={tx.type === "purchase" ? "success" : tx.type === "refund" ? "warning" : "default"} size="sm">
                    {tx.type}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={tx.amount > 0 ? "text-success" : "text-error"}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-white/50">{tx.description ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-white/40">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
