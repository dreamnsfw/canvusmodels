import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default async function AdminModelsPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const models = await prisma.model.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Models</h1>
        <p className="mt-1 text-white/50">Manage AI models and pricing</p>
      </div>
      <Card glass className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Provider</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Credits Cost</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Status</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-sm">{model.name}</td>
                <td className="px-4 py-3 text-sm text-white/50">{model.provider}</td>
                <td className="px-4 py-3 text-sm capitalize">{model.type}</td>
                <td className="px-4 py-3 text-sm">{model.creditsCost}</td>
                <td className="px-4 py-3">
                  <Badge variant={model.enabled ? "success" : "error"} size="sm">
                    {model.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
