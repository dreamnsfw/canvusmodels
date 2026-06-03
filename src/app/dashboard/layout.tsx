import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 min-h-screen w-full bg-[#0a0a0f] p-8">
        {children}
      </main>
    </div>
  );
}
