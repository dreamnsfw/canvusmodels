import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

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
        <p className="mt-1 text-gray-400">All credit transactions</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map((tx) => (
              <tr key={tx.id} className="transition hover:bg-white/5">
                <td className="px-6 py-4">{tx.user.name ?? tx.user.email}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    tx.type === "purchase"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={tx.amount > 0 ? "text-green-400" : "text-red-400"}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{tx.description ?? "—"}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
