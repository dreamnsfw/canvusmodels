import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if ((session?.user as any)?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 min-h-screen w-full bg-[#0a0a0f] p-8">
        {children}
      </main>
    </div>
  );
}
