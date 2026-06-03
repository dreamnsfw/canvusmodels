import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ImageGenerator } from "@/components/ImageGenerator";

export default async function ImagePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Generate Image</h1>
        <p className="mt-1 text-gray-400">
          Describe the image you want to create
        </p>
      </div>
      <ImageGenerator />
    </div>
  );
}
