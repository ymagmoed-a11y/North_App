"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { InfographicCard } from "@/components/infographic-card";

type Layer = { id: string; name: string };

export default function LifeLayersPage() {
  const supabase = useMemo(() => createClient(), []);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.from("life_layers").select("*").order("name").then(({ data }) => {
      setLayers((data as Layer[]) ?? []);
    });
    const channel = supabase
      .channel("life_layers_watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "life_layers" }, async () => {
        const { data } = await supabase.from("life_layers").select("*").order("name");
        setLayers((data as Layer[]) ?? []);
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function addLayer() {
    if (!name.trim()) return;
    await supabase.from("life_layers").insert({ name });
    setName("");
  }

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Structure</p>
      <h1 className="text-4xl mb-4">Life Layers</h1>
      <div className="flex gap-2 mb-4">
        <input className="border rounded p-2 bg-white" placeholder="New layer" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="bg-zinc-900 text-white rounded px-4" onClick={addLayer}>Add</button>
      </div>
      <ul className="space-y-2">
        {layers.map((layer) => (
          <li key={layer.id} className="north-card p-3">{layer.name}</li>
        ))}
      </ul>
      <div className="mt-4">
        <InfographicCard
          title="Layer Distribution"
          subtitle="Infographic"
          items={layers.slice(0, 5).map((layer) => ({ label: layer.name, value: 1 }))}
        />
      </div>
    </section>
  );
}
