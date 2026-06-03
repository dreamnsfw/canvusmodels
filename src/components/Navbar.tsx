"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Canvas<span className="text-purple-400">Models</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-gray-400 transition hover:text-white">
            Pricing
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-400 transition hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold transition hover:bg-purple-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
