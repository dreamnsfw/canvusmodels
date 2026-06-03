import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Image, Video, Coins, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [generationCount, totalCreditsUsed, recentGenerations] = await Promise.all([
    prisma.generation.count({ where: { userId: session.user.id } }),
    prisma.generation.aggregate({
      where: { userId: session.user.id },
      _sum: { credits: true },
    }),
    prisma.generation.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="mt-1 text-white/50">
          Welcome back, {session.user.name ?? "Creator"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card glass className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10">
              <Coins size={18} className="text-accent-300" />
            </div>
            <div>
              <p className="text-xs text-white/40">Credits</p>
              <p className="text-xl font-bold">{(session.user as any).credits?.toLocaleString() ?? 0}</p>
            </div>
          </div>
        </Card>
        <Card glass className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10">
              <Image size={18} className="text-accent-300" />
            </div>
            <div>
              <p className="text-xs text-white/40">Generations</p>
              <p className="text-xl font-bold">{generationCount}</p>
            </div>
          </div>
        </Card>
        <Card glass className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10">
              <Video size={18} className="text-accent-300" />
            </div>
            <div>
              <p className="text-xs text-white/40">Credits Used</p>
              <p className="text-xl font-bold">{totalCreditsUsed._sum.credits ?? 0}</p>
            </div>
          </div>
        </Card>
        <Link href="/dashboard/billing">
          <Card glass hover className="p-5 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10">
                  <Sparkles size={18} className="text-accent-300" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Buy Credits</p>
                  <p className="text-xl font-bold text-accent-300">+</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/30" />
            </div>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Link href="/dashboard/create?mode=image">
          <Card glass hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Generate Image</h3>
                <p className="mt-1 text-sm text-white/50">Create AI images from text prompts</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10">
                <Image size={22} className="text-accent-300" />
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/dashboard/create?mode=video">
          <Card glass hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Generate Video</h3>
                <p className="mt-1 text-sm text-white/50">Create AI videos from text prompts</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10">
                <Video size={22} className="text-accent-300" />
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {recentGenerations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Generations</h2>
          <div className="space-y-2">
            {recentGenerations.map((gen) => (
              <div key={gen.id} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  {gen.type === "image" ? <Image size={16} className="text-white/40" /> : <Video size={16} className="text-white/40" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{gen.prompt}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {gen.type} · {gen.credits} credits · {new Date(gen.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {(gen.imageUrl || gen.videoUrl) && (
                  <a
                    href={gen.imageUrl ?? gen.videoUrl ?? "#"}
                    download
                    className="shrink-0 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
