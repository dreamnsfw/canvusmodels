import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { VideoGenerator } from "@/components/VideoGenerator";

export default async function VideoPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Generate Video</h1>
        <p className="mt-1 text-gray-400">
          Describe the video you want to create
        </p>
      </div>
      <VideoGenerator />
    </div>
  );
}
