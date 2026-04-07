import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app-shell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return <AppShell>{children}</AppShell>;
}
