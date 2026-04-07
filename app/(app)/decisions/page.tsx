"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateAlignmentScore, getRecommendation } from "@/lib/decision";
import { createClient } from "@/lib/supabase/client";
import { InfographicCard } from "@/components/infographic-card";

type Decision = { id: string; description: string; alignment_score: number; recommendation: string };

export default function DecisionsPage() {
  const supabase = useMemo(() => createClient(), []);
  const [items, setItems] = useState<Decision[]>([]);
  const [description, setDescription] = useState("");
  const [timeCost, setTimeCost] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(50);
  const [layerImpact, setLayerImpact] = useState(3);

  useEffect(() => {
    supabase.from("decisions").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setItems((data as Decision[]) ?? []);
    });
  }, [supabase]);

  async function evaluateAndSave() {
    const alignment_score = calculateAlignmentScore(expectedReturn, timeCost, layerImpact);
    const recommendation = getRecommendation(alignment_score);
    await supabase.from("decisions").insert({ description, time_cost: timeCost, expected_return: expectedReturn, alignment_score, recommendation });
    setDescription("");
    const { data } = await supabase.from("decisions").select("*").order("created_at", { ascending: false });
    setItems((data as Decision[]) ?? []);
  }

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Decision quality</p>
      <h1 className="text-4xl mb-4">Decision Filter</h1>
      <div className="north-card p-4 mb-5 space-y-2">
        <textarea className="w-full border rounded p-2" placeholder="Opportunity description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="grid grid-cols-3 gap-2">
          <input className="border rounded p-2" type="number" value={timeCost} onChange={(e) => setTimeCost(Number(e.target.value))} />
          <input className="border rounded p-2" type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
          <input className="border rounded p-2" type="number" min={1} max={5} value={layerImpact} onChange={(e) => setLayerImpact(Number(e.target.value))} />
        </div>
        <button className="bg-zinc-900 text-white rounded px-4 py-2" onClick={evaluateAndSave}>Evaluate</button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="north-card p-3">
            <p>{item.description}</p>
            <p className="text-sm text-muted">Score: {item.alignment_score} - {item.recommendation}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <InfographicCard
          title="Recommendation Mix"
          subtitle="Infographic"
          items={[
            { label: "Proceed", value: items.filter((d) => d.recommendation === "Proceed").length },
            { label: "Consider", value: items.filter((d) => d.recommendation === "Consider").length, accent: "#2f6f63" },
            { label: "Reject", value: items.filter((d) => d.recommendation === "Reject").length, accent: "#893f3f" },
          ]}
        />
      </div>
    </section>
  );
}
