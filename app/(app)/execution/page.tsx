"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Goal = { id: string; title: string; timeframe: "weekly" | "monthly" | "yearly"; status: string };

export default function ExecutionPage() {
  const supabase = useMemo(() => createClient(), []);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");
  const [timeframe, setTimeframe] = useState<Goal["timeframe"]>("weekly");

  useEffect(() => {
    supabase.from("goals").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setGoals((data as Goal[]) ?? []);
    });
    const channel = supabase
      .channel("goals_watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "goals" }, async () => {
        const { data } = await supabase.from("goals").select("*").order("created_at", { ascending: false });
        setGoals((data as Goal[]) ?? []);
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function addGoal() {
    if (!title.trim()) return;
    await supabase.from("goals").insert({ title, timeframe, status: "Not started" });
    setTitle("");
  }

  return (
    <section>
      <h1 className="text-4xl mb-4">Execution Engine</h1>
      <div className="flex gap-2 mb-5">
        <input className="border rounded p-2 bg-white" placeholder="Goal title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="border rounded p-2 bg-white" value={timeframe} onChange={(e) => setTimeframe(e.target.value as Goal["timeframe"])}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button className="bg-zinc-900 text-white rounded px-4" onClick={addGoal}>Add</button>
      </div>
      <ul className="space-y-2">
        {goals.map((goal) => (
          <li key={goal.id} className="bg-white rounded p-3 shadow-sm flex justify-between">
            <span>{goal.title}</span><span className="text-muted text-sm">{goal.timeframe} - {goal.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
