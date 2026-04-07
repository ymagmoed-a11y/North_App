"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [identity, setIdentity] = useState("");
  const [baseCity, setBaseCity] = useState("");
  const [retireAge, setRetireAge] = useState(50);
  const [northStar, setNorthStar] = useState("");
  const [revenueStreams, setRevenueStreams] = useState("Advisory retainers, Investments");
  const [wealthTarget, setWealthTarget] = useState("");
  const [rules, setRules] = useState("Protect focus; invest monthly; avoid short-term distractions.");

  async function completeOnboarding(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;
    if (!user) {
      setLoading(false);
      router.push("/login");
      return;
    }

    await supabase.from("user_profiles").upsert({
      user_id: user.id,
      full_name: fullName,
      identity,
      base_city: baseCity,
      target_retire_age: retireAge,
      wealth_target: wealthTarget,
      revenue_streams: revenueStreams.split(",").map((s) => s.trim()),
      rules: rules.split(";").map((s) => s.trim()),
    });

    await supabase.from("north_star").upsert({
      user_id: user.id,
      title: `${fullName || "My"} North Star`,
      mission: northStar,
      vision_data: {
        identity,
        base_city: baseCity,
        retire_age: retireAge,
        revenue_streams: revenueStreams.split(",").map((s) => s.trim()),
        wealth_target: wealthTarget,
        rules: rules.split(";").map((s) => s.trim()),
      },
    });

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <section className="max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Welcome to North</p>
      <h1 className="text-4xl mb-2">Strategic Onboarding</h1>
      <p className="text-muted mb-6">Capture the core inputs that shape your one-page life strategy.</p>
      <form onSubmit={completeOnboarding} className="north-card p-6 grid md:grid-cols-2 gap-4">
        <input className="border rounded p-2 bg-white" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input className="border rounded p-2 bg-white" placeholder="Identity (e.g. Financial strategist)" value={identity} onChange={(e) => setIdentity(e.target.value)} required />
        <input className="border rounded p-2 bg-white" placeholder="Base city / region" value={baseCity} onChange={(e) => setBaseCity(e.target.value)} required />
        <input className="border rounded p-2 bg-white" type="number" min={35} max={80} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} />
        <textarea className="md:col-span-2 border rounded p-2 bg-white min-h-24" placeholder="Mission / North Star statement" value={northStar} onChange={(e) => setNorthStar(e.target.value)} required />
        <input className="md:col-span-2 border rounded p-2 bg-white" placeholder="Revenue streams (comma separated)" value={revenueStreams} onChange={(e) => setRevenueStreams(e.target.value)} />
        <input className="md:col-span-2 border rounded p-2 bg-white" placeholder="Wealth target (e.g. $3m by 50)" value={wealthTarget} onChange={(e) => setWealthTarget(e.target.value)} />
        <textarea className="md:col-span-2 border rounded p-2 bg-white min-h-24" placeholder="Rules (separate with ;)" value={rules} onChange={(e) => setRules(e.target.value)} />
        <button disabled={loading} className="md:col-span-2 rounded bg-[#191714] text-[#f7f1e6] px-4 py-3">
          {loading ? "Saving..." : "Complete onboarding"}
        </button>
      </form>
    </section>
  );
}
