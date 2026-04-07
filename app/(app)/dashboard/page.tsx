import { createServerClient } from "@/lib/supabase/server";
import { InfographicCard } from "@/components/infographic-card";

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const [{ count: goals }, { count: decisions }, { count: notes }] = await Promise.all([
    supabase.from("goals").select("*", { count: "exact", head: true }),
    supabase.from("decisions").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true }),
  ]);

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Executive overview</p>
      <h1 className="text-4xl mb-2">North Command Center</h1>
      <p className="text-muted mb-8">Track strategy, execution, and outcomes from one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <article className="north-card p-5">
          <p className="text-sm text-muted">Execution Goals</p>
          <p className="text-3xl mt-1">{goals ?? 0}</p>
        </article>
        <article className="north-card p-5">
          <p className="text-sm text-muted">Decisions Logged</p>
          <p className="text-3xl mt-1">{decisions ?? 0}</p>
        </article>
        <article className="north-card p-5">
          <p className="text-sm text-muted">Knowledge Notes</p>
          <p className="text-3xl mt-1">{notes ?? 0}</p>
        </article>
      </div>
      <InfographicCard
        title="Strategic Activity Mix"
        subtitle="Infographic"
        items={[
          { label: "Execution", value: goals ?? 0, accent: "#b18a3d" },
          { label: "Decisions", value: decisions ?? 0, accent: "#2f6f63" },
          { label: "Knowledge", value: notes ?? 0, accent: "#3f5c88" },
        ]}
      />
    </section>
  );
}
