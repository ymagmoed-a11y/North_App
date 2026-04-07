"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
      <h1 className="text-4xl mb-4">Life Layers</h1>
      <div className="flex gap-2 mb-4">
        <input className="border rounded p-2 bg-white" placeholder="New layer" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="bg-zinc-900 text-white rounded px-4" onClick={addLayer}>Add</button>
      </div>
      <ul className="space-y-2">
        {layers.map((layer) => (
          <li key={layer.id} className="bg-white rounded p-3 shadow-sm">{layer.name}</li>
        ))}
      </ul>
    </section>
  );
}
