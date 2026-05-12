import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/north-star", label: "North Star", icon: "explore" },
  { href: "/life-layers", label: "Life Layers", icon: "layers" },
  { href: "/execution", label: "Execution", icon: "bolt" },
  { href: "/progress", label: "Progress", icon: "trending_up" },
  { href: "/decisions", label: "Decisions", icon: "gavel" },
  { href: "/knowledge", label: "Knowledge Base", icon: "menu_book" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    // Using supabase client for logout (keep existing behavior)
    const { createClient } = await import("@/lib/supabase/client");
    await createClient().auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant py-8 overflow-y-auto">
        <div className="px-6 mb-6">
          <h1 className="font-headline-md text-primary font-bold">North</h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            Strategic Execution
          </p>
        </div>
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center px-4 py-3 rounded-md text-sm border-l-2",
                pathname === item.href
                  ? "bg-surface-container-high text-primary border-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary border-transparent"
              )}
            >
              <span className="material-symbols-outlined mr-3" data-icon={item.icon}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-4 py-6 flex items-center gap-3">
          <img
            alt="User avatar"
            src="/profile.jpg"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
          />
          <div>
            <p className="font-label-caps text-label-caps text-primary">A. Sterling</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              Founder / CEO
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full py-2 bg-primary text-on-primary font-label-caps rounded-md"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="flex justify-between items-center h-16 px-6 bg-surface border-b border-outline-variant">
          <div className="flex items-center">
            <span className="font-headline-sm text-headline-sm font-bold text-primary">
              {pathname.split("/")[1] || "Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
              notifications
            </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
              account_circle
            </span>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto bg-surface-container-low p-8">
          {children}
        </section>
      </main>
    </div>
  );
}
