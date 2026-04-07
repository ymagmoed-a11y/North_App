"use client";

import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { InfographicCard } from "@/components/infographic-card";

type NorthStar = {
  id?: string;
  title: string;
  mission: string;
  vision_data: string;
};

export default function NorthStarPage() {
  const [form, setForm] = useState<NorthStar>({ title: "My North Star", mission: "", vision_data: "{}" });
  const [msg, setMsg] = useState("");
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.from("north_star").select("*").order("updated_at", { ascending: false }).limit(1).then(({ data }) => {
      if (data?.[0]) setForm({ id: data[0].id, title: data[0].title, mission: data[0].mission, vision_data: JSON.stringify(data[0].vision_data, null, 2) });
    });
  }, [supabase]);

  async function save() {
    setMsg("");
    const payload = { title: form.title, mission: form.mission, vision_data: JSON.parse(form.vision_data || "{}") };
    const { error } = form.id
      ? await supabase.from("north_star").update(payload).eq("id", form.id)
      : await supabase.from("north_star").insert(payload);
    setMsg(error ? error.message : "Saved");
  }

  function exportPdf() {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(form.title, 10, 20);
    doc.setFontSize(12);
    doc.text(form.mission || "-", 10, 32);
    doc.text(form.vision_data, 10, 45);
    doc.save("north-star.pdf");
  }

  return (
    <section className="space-y-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Vision canvas</p>
      <h1 className="text-4xl">North Star One-Pager</h1>
      <input className="w-full border rounded p-2 bg-white" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
      <textarea className="w-full border rounded p-2 bg-white min-h-24" placeholder="Mission statement" value={form.mission} onChange={(e) => setForm((s) => ({ ...s, mission: e.target.value }))} />
      <textarea className="w-full border rounded p-2 bg-white min-h-60 font-mono text-sm" placeholder='{"identity":"","roadmap":[]}' value={form.vision_data} onChange={(e) => setForm((s) => ({ ...s, vision_data: e.target.value }))} />
      <InfographicCard
        title="Strategy Completeness"
        subtitle="Infographic"
        items={[
          { label: "Title", value: form.title ? 1 : 0 },
          { label: "Mission", value: form.mission ? 1 : 0, accent: "#2f6f63" },
          { label: "Vision Data", value: form.vision_data ? 1 : 0, accent: "#3f5c88" },
        ]}
      />
      <div className="flex gap-2">
        <button className="rounded bg-zinc-900 text-white px-4 py-2" onClick={save}>Save</button>
        <button className="rounded border px-4 py-2 bg-white" onClick={exportPdf}>Export PDF</button>
      </div>
      {msg && <p className="text-sm text-muted">{msg}</p>}
    </section>
  );
}
