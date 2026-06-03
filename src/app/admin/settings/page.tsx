import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";

export default async function AdminSettingsPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const stats = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "admin" } }),
    prisma.model.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="mt-1 text-white/50">Platform configuration</p>
      </div>
      <Card glass className="p-6 max-w-lg space-y-4">
        <div>
          <p className="text-sm text-white/40">Total Users</p>
          <p className="font-medium">{stats[0]}</p>
        </div>
        <div>
          <p className="text-sm text-white/40">Admins</p>
          <p className="font-medium">{stats[1]}</p>
        </div>
        <div>
          <p className="text-sm text-white/40">AI Models Registered</p>
          <p className="font-medium">{stats[2]}</p>
        </div>
      </Card>
    </div>
  );
}
