"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";

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
      <h1 className="text-4xl mb-4">Knowledge Base</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded p-4 shadow-sm space-y-2">
          <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full border rounded p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <textarea className="w-full border rounded p-2 min-h-48" placeholder="Markdown content" value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="bg-zinc-900 text-white rounded px-4 py-2" onClick={save}>Save note</button>
        </div>
        <div className="space-y-3">
          {notes.map((note) => (
            <article key={note.id} className="bg-white rounded p-4 shadow-sm">
              <h3 className="text-xl">{note.title}</h3>
              <p className="text-sm text-muted mb-2">{note.category}</p>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
