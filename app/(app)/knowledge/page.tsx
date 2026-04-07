"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";
import { InfographicCard } from "@/components/infographic-card";

type Note = { id: string; title: string; category: string; content: string };

export default function KnowledgePage() {
  const supabase = useMemo(() => createClient(), []);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Systems");
  const [content, setContent] = useState("");

  useEffect(() => {
    supabase.from("notes").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setNotes((data as Note[]) ?? []);
    });
  }, [supabase]);

  async function save() {
    if (!title.trim()) return;
    await supabase.from("notes").insert({ title, category, content });
    setTitle("");
    setContent("");
    const { data } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
    setNotes((data as Note[]) ?? []);
  }

  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-1">Knowledge system</p>
      <h1 className="text-4xl mb-4">Knowledge Base</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="north-card p-4 space-y-2">
          <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <textarea className="w-full border rounded p-2 min-h-48" placeholder="Markdown content" value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="bg-zinc-900 text-white rounded px-4 py-2" onClick={save}>Save note</button>
        </div>
        <div className="space-y-3">
          {notes.map((note) => (
            <article key={note.id} className="north-card p-4">
              <h3 className="text-xl">{note.title}</h3>
              <p className="text-sm text-muted mb-2">{note.category}</p>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <InfographicCard
          title="Category Density"
          subtitle="Infographic"
          items={Object.entries(
            notes.reduce<Record<string, number>>((acc, note) => {
              acc[note.category] = (acc[note.category] ?? 0) + 1;
              return acc;
            }, {})
          ).map(([label, value]) => ({ label, value, accent: "#3f5c88" }))}
        />
      </div>
    </section>
  );
}
