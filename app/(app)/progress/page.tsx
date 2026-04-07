"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { InfographicCard } from "@/components/infographic-card";

type Metric = { id: string; name: string };

export default function ProgressPage() {
  const supabase = useMemo(() => createClient(), []);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.from("metrics").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setMetrics((data as Metric[]) ?? []);
    });
    const channel = supabase
      .channel("metrics_watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "metrics" }, async () => {
        const { data } = await supabase.from("metrics").select("*").order("created_at", { ascending: false });
        setMetrics((data as Metric[]) ?? []);
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function addMetric() {
    if (!name.trim()) return;
    await supabase.from("metrics").insert({ name });
    setName("");
  }

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Metrics intelligence</p>
      <h1 className="text-4xl mb-4">Progress Tracker</h1>
      <div className="flex gap-2 mb-5">
        <input className="border rounded p-2 bg-white" placeholder="Metric name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="bg-zinc-900 text-white rounded px-4" onClick={addMetric}>Add</button>
      </div>
      <ul className="space-y-2">
        {metrics.map((metric) => (
          <li key={metric.id} className="north-card p-3">{metric.name}</li>
        ))}
      </ul>
      <div className="mt-4">
        <InfographicCard
          title="Metric Portfolio"
          subtitle="Infographic"
          items={metrics.slice(0, 6).map((metric, i) => ({
            label: metric.name,
            value: metrics.length - i,
            accent: i % 2 ? "#2f6f63" : "#b18a3d",
          }))}
        />
      </div>
    </section>
  );
}
