import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Workspace } from "@/components/workspace/Workspace";

export default async function CreatePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <Workspace />;
}
