import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const generations = await prisma.generation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Generation History</h1>
        <p className="mt-1 text-gray-400">Your recent AI generations</p>
      </div>
      {generations.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-gray-400">No generations yet. Start creating!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {generations.map((gen) => (
            <div
              key={gen.id}
              className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              {gen.imageUrl && (
                <img
                  src={gen.imageUrl}
                  alt={gen.prompt}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              )}
              {gen.videoUrl && (
                <video
                  src={gen.videoUrl}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{gen.prompt}</p>
                <p className="text-sm text-gray-400">
                  {gen.type === "image" ? "Image" : "Video"} &middot; {gen.credits} credits &middot;{" "}
                  {new Date(gen.createdAt).toLocaleDateString()}
                </p>
              </div>
              {(gen.imageUrl || gen.videoUrl) && (
                <a
                  href={gen.imageUrl ?? gen.videoUrl ?? "#"}
                  download
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
                >
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
