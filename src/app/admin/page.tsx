import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const [userCount, generationCount, totalRevenue, modelCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.generation.count(),
      prisma.transaction.aggregate({
        where: { type: "purchase" },
        _sum: { amount: true },
      }),
      prisma.model.count(),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-gray-400">System overview and management</p>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="mt-2 text-3xl font-bold">{userCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">Generations</p>
          <p className="mt-2 text-3xl font-bold">{generationCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">Revenue (credits)</p>
          <p className="mt-2 text-3xl font-bold">
            {totalRevenue._sum.amount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">AI Models</p>
          <p className="mt-2 text-3xl font-bold">{modelCount}</p>
        </div>
      </div>
    </div>
  );
}
