import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminPricingPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") redirect("/dashboard");

  const models = await prisma.model.findMany({
    orderBy: { type: "asc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="mt-1 text-gray-400">Configure credit costs per model</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Model</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Current Cost</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Provider</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {models.map((model) => (
              <tr key={model.id} className="transition hover:bg-white/5">
                <td className="px-6 py-4">{model.name}</td>
                <td className="px-6 py-4 capitalize">{model.type}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-purple-400">
                    {model.creditsCost} credits
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{model.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
