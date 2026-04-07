"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error } = await createClient().auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl mb-6">Create account</h1>
        <input className="w-full mb-3 border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full mb-3 border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <button className="w-full bg-zinc-900 text-white rounded p-2">Sign up</button>
        <p className="text-sm mt-4">Already have account? <Link className="text-gold" href="/login">Login</Link></p>
      </form>
    </div>
  );
}
