"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Image,
  Video,
  CreditCard,
  Activity,
  Settings,
  Users,
  ShoppingCart,
  Wallet,
  Box,
  BarChart3,
  Shield,
} from "lucide-react";

interface SidebarProps {
  variant?: "dashboard" | "admin";
}

const dashboardItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/create", label: "Create", icon: Sparkles },
  { href: "/dashboard/gallery", label: "Gallery", icon: Image },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminItems = [
  { href: "/admin", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/models", label: "Models", icon: Box },
  { href: "/admin/pricing", label: "Pricing", icon: ShoppingCart },
  { href: "/admin/transactions", label: "Transactions", icon: Wallet },
  { href: "/admin/settings", label: "Settings", icon: Shield },
];

export function Sidebar({ variant = "dashboard" }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "admin" ? adminItems : dashboardItems;

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-white/[0.06] bg-bg-deep max-lg:w-16">
      <Link
        href={variant === "admin" ? "/admin" : "/dashboard"}
        className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-4"
      >
        <Sparkles size={20} className="shrink-0 text-accent-400" />
        <span className="text-sm font-bold max-lg:hidden">
          {variant === "admin" ? "Admin" : "CanvasModels"}
        </span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-accent-500/10 text-accent-300"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="max-lg:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] p-3">
        <Link
          href={variant === "admin" ? "/dashboard" : "/admin"}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-white/40 hover:text-white hover:bg-white/5"
          )}
        >
          {variant === "admin" ? (
            <>
              <LayoutDashboard size={18} className="shrink-0" />
              <span className="max-lg:hidden">User Dashboard</span>
            </>
          ) : (
            <>
              <Shield size={18} className="shrink-0" />
              <span className="max-lg:hidden">Admin</span>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
