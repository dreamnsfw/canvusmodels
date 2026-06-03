"use client";

import { useSession } from "next-auth/react";
import { CreditBadge } from "./CreditBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-bg-deep/80 backdrop-blur-xl px-6">
      <div />
      <div className="flex items-center gap-4">
        <CreditBadge />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/5 transition-colors">
              <Avatar src={session?.user?.image} name={session?.user?.name} size="sm" />
              <span className="text-sm font-medium max-md:hidden">
                {session?.user?.name || "User"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/dashboard/settings">
              <DropdownMenuItem>
                <User size={14} />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut size={14} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
