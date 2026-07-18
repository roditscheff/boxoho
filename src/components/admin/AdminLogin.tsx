"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-4">
      <label className="block">
        <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
          required
        />
      </label>
      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper disabled:opacity-50"
      >
        {loading ? "…" : "Log in"}
      </button>
    </form>
  );
}
