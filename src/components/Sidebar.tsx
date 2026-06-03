"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { CreditBalance } from "./CreditBalance";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "◻" },
  { href: "/dashboard/image", label: "Generate Image", icon: "🎨" },
  { href: "/dashboard/video", label: "Generate Video", icon: "🎬" },
  { href: "/dashboard/history", label: "History", icon: "📋" },
  { href: "/dashboard/billing", label: "Billing", icon: "💳" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-black">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/dashboard" className="text-xl font-bold">
          Canvas<span className="text-purple-400">Models</span>
        </Link>
      </div>
      <div className="px-4 py-4">
        <CreditBalance />
      </div>
      <nav className="px-3 py-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-purple-600/20 text-purple-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
        {isAdmin && (
          <>
            <div className="my-3 border-t border-white/10" />
            <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
              Admin
            </p>
            {[
              { href: "/admin", label: "Overview", icon: "📊" },
              { href: "/admin/users", label: "Users", icon: "👥" },
              { href: "/admin/models", label: "Models", icon: "🤖" },
              { href: "/admin/pricing", label: "Pricing", icon: "💰" },
              { href: "/admin/transactions", label: "Transactions", icon: "📝" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-purple-600/20 text-purple-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
