import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminUsersPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { generations: true } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-1 text-white/50">Manage platform users</p>
      </div>
      <Card glass className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Credits</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Generations</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-sm">{user.name ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-white/50">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.credits.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{user._count.generations}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === "admin" ? "premium" : "default"} size="sm">
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-white/40">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
