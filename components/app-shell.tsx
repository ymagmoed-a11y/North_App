"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/north-star", label: "North Star" },
  { href: "/life-layers", label: "Life Layers" },
  { href: "/execution", label: "Execution" },
  { href: "/progress", label: "Progress" },
  { href: "/decisions", label: "Decisions" },
  { href: "/knowledge", label: "Knowledge" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await createClient().auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-zinc-200 bg-white p-6">
        <h1 className="text-2xl mb-6 text-gold">North</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block rounded-md px-3 py-2 text-sm",
                pathname === item.href
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-8 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
        >
          Logout
        </button>
      </aside>
      <main className="p-8">{children}</main>
    </div>
  );
}
