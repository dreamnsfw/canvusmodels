import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [generationCount, totalCreditsUsed] = await Promise.all([
    prisma.generation.count({ where: { userId: session.user.id } }),
    prisma.generation.aggregate({
      where: { userId: session.user.id },
      _sum: { credits: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-400">
          Welcome back, {session.user.name ?? "Creator"}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">Total Generations</p>
          <p className="mt-2 text-3xl font-bold">{generationCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">Credits Used</p>
          <p className="mt-2 text-3xl font-bold">
            {totalCreditsUsed._sum.credits ?? 0}
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="rounded-xl border border-purple-500/30 bg-purple-600/10 p-6 transition hover:bg-purple-600/20"
        >
          <p className="text-sm text-purple-400">Buy Credits</p>
          <p className="mt-2 text-3xl font-bold text-purple-400">+</p>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/dashboard/image"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/50"
        >
          <div>
            <h3 className="text-lg font-semibold">Generate Image</h3>
            <p className="text-sm text-gray-400">Create AI images from text</p>
          </div>
          <span className="text-3xl">🎨</span>
        </Link>
        <Link
          href="/dashboard/video"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-purple-500/50"
        >
          <div>
            <h3 className="text-lg font-semibold">Generate Video</h3>
            <p className="text-sm text-gray-400">Create AI videos from text</p>
          </div>
          <span className="text-3xl">🎬</span>
        </Link>
      </div>
    </div>
  );
}
