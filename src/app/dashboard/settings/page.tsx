import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-white/50">Manage your account</p>
      </div>
      <Card glass className="p-6 max-w-lg">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/40">Name</p>
            <p className="font-medium">{session.user.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-white/40">Email</p>
            <p className="font-medium">{session.user.email}</p>
          </div>
          <div>
            <p className="text-sm text-white/40">Role</p>
            <p className="font-medium capitalize">{(session.user as any).role || "User"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
