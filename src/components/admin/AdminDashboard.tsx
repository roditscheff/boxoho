"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ArtworkRow = {
  id: string;
  number: string;
  title: string | null;
  imageUrl: string;
  notes: string | null;
  registered: boolean;
  createdAt: string;
};

type RegistrationRow = {
  id: string;
  firstName: string;
  email: string;
  place: string;
  mapConsent: boolean;
  artworkNumber: string | null;
  artworkImageUrl: string | null;
  homePhotoUrl: string | null;
  createdAt: string;
};

export function AdminDashboard() {
  const router = useRouter();
  const [artworks, setArtworks] = useState<ArtworkRow[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    const [aRes, rRes] = await Promise.all([
      fetch("/api/admin/artworks"),
      fetch("/api/admin/registrations"),
    ]);
    if (!aRes.ok || !rRes.ok) {
      setError("Could not load admin data. Check Supabase env vars.");
      return;
    }
    const aData = await aRes.json();
    const rData = await rRes.json();
    setArtworks(aData.artworks ?? []);
    setRegistrations(rData.registrations ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function createArtwork(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/admin/artworks", { method: "POST", body: form });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Upload failed");
      return;
    }
    event.currentTarget.reset();
    await load();
  }

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
          Signed in
        </p>
        <button
          type="button"
          onClick={logout}
          className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-stamp"
        >
          Log out
        </button>
      </div>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}

      <section>
        <h2 className="text-2xl text-ink">Add artwork</h2>
        <form onSubmit={createArtwork} className="mt-6 grid max-w-xl gap-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              Number
            </span>
            <input
              name="number"
              required
              placeholder="BX-2026-014"
              className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              Title (optional)
            </span>
            <input
              name="title"
              className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              Image
            </span>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="w-full border border-rule bg-transparent px-4 py-3 font-mono text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              Notes (private)
            </span>
            <textarea
              name="notes"
              rows={3}
              className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="w-fit border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save artwork"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl text-ink">Artworks ({artworks.length})</h2>
        <ul className="mt-6 divide-y divide-rule border-t border-rule">
          {artworks.map((a) => (
            <li key={a.id} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-paper-deep">
                <Image src={a.imageUrl} alt={a.number} fill className="object-cover" unoptimized />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-stamp">
                  {a.number}
                </p>
                <p className="truncate text-ink">{a.title || "—"}</p>
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                {a.registered ? "Registered" : "Open"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-ink">Collectors ({registrations.length})</h2>
        <ul className="mt-6 divide-y divide-rule border-t border-rule">
          {registrations.map((r) => (
            <li key={r.id} className="grid gap-2 py-4 md:grid-cols-[5rem_1fr]">
              <div className="relative h-16 w-16 overflow-hidden bg-paper-deep">
                {(r.homePhotoUrl || r.artworkImageUrl) && (
                  <Image
                    src={r.homePhotoUrl || r.artworkImageUrl!}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="text-sm leading-relaxed text-ink-soft">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-stamp">
                  {r.artworkNumber} · {r.mapConsent ? "On map" : "Private"}
                </p>
                <p className="mt-1 text-ink">
                  {r.firstName} · {r.email}
                </p>
                <p>{r.place}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
