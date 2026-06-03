import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PageProps } from "@/types";

export default async function MediaDetailPage({ params }: PageProps<{ id: string }>) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { id } = await params;

  const gen = await prisma.generation.findUnique({
    where: { id },
    include: { model: true },
  });

  if (!gen || gen.userId !== session.user.id) notFound();

  return (
    <div className="space-y-6">
      <Link href="/dashboard/gallery" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
        <ArrowLeft size={14} /> Back to Gallery
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card glass className="p-0 overflow-hidden">
          {gen.imageUrl ? (
            <img src={gen.imageUrl} alt={gen.prompt} className="w-full object-cover" />
          ) : gen.videoUrl ? (
            <video src={gen.videoUrl} className="w-full" controls />
          ) : (
            <div className="flex items-center justify-center h-64 text-white/20">
              No media available
            </div>
          )}
        </Card>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{gen.prompt}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={gen.type === "image" ? "info" : "premium"}>{gen.type}</Badge>
              <Badge>{gen.status}</Badge>
              {gen.model && <Badge variant="default">{gen.model.name}</Badge>}
            </div>
          </div>
          <Card glass className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Credits</span>
              <span>{gen.credits}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Created</span>
              <span>{new Date(gen.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
