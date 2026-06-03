import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Gallery } from "@/components/gallery/Gallery";

export default async function GalleryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const generations = await prisma.generation.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { createdAt: "desc" },
    include: { model: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="mt-1 text-white/50">Your generated media</p>
      </div>
      <Gallery generations={generations} />
    </div>
  );
}
