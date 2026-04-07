import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const [{ count: goals }, { count: decisions }, { count: notes }] = await Promise.all([
    supabase.from("goals").select("*", { count: "exact", head: true }),
    supabase.from("decisions").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true }),
  ]);

  return (
    <section>
      <h1 className="text-4xl mb-2">North Command Center</h1>
      <p className="text-muted mb-8">Track strategy, execution, and outcomes from one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">Execution Goals</p>
          <p className="text-3xl mt-1">{goals ?? 0}</p>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">Decisions Logged</p>
          <p className="text-3xl mt-1">{decisions ?? 0}</p>
        </article>
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm text-muted">Knowledge Notes</p>
          <p className="text-3xl mt-1">{notes ?? 0}</p>
        </article>
      </div>
    </section>
  );
}
