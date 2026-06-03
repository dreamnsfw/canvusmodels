import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { generations: true } },
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-1 text-gray-400">Manage platform users</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Credits</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Generations</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-white/5">
                <td className="px-6 py-4">{user.name ?? "—"}</td>
                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                <td className="px-6 py-4">{user.credits.toLocaleString()}</td>
                <td className="px-6 py-4">{user._count.generations}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    user.role === "admin"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-white/10 text-gray-400"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
