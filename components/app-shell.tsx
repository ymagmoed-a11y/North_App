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
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="border-r bg-[#f6f1e7] p-6">
        <h1 className="text-3xl mb-1 text-gold">North</h1>
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-6">Personal Operating System</p>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block rounded-md px-3 py-2 text-sm border",
                pathname === item.href
                  ? "bg-[#191714] text-[#f7f1e6] border-[#191714]"
                  : "text-[#5f584f] bg-white hover:bg-[#f1ece1]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-8 rounded-md bg-[#191714] px-3 py-2 text-sm text-[#f7f1e6]"
        >
          Logout
        </button>
      </aside>
      <main className="p-8 bg-background">{children}</main>
    </div>
  );
}
