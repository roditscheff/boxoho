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

type CustomerRow = {
  id: string;
  firstName: string;
  email: string;
  place: string;
  plan: string | null;
  status: string;
  address: string;
  periodStart: string | null;
  periodEnd: string | null;
  shipThisMonth: boolean;
  mapConsent: boolean;
  createdAt: string;
};

type Tab = "artworks" | "collectors" | "customers";
type CustomerFilter =
  | "all"
  | "active_newsletter"
  | "active_monthly"
  | "yearly"
  | "cancelled"
  | "ship_this_month";

const CUSTOMER_FILTERS: { id: CustomerFilter; label: string }[] = [
  { id: "ship_this_month", label: "Ship this month" },
  { id: "active_monthly", label: "Active monthly" },
  { id: "active_newsletter", label: "Active newsletter" },
  { id: "yearly", label: "Yearly pack" },
  { id: "cancelled", label: "Cancelled / expired" },
  { id: "all", label: "All" },
];

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("customers");
  const [artworks, setArtworks] = useState<ArtworkRow[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [customerFilter, setCustomerFilter] =
    useState<CustomerFilter>("ship_this_month");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadArtworks = useCallback(async () => {
    const [aRes, rRes] = await Promise.all([
      fetch("/api/admin/artworks"),
      fetch("/api/admin/registrations"),
    ]);
    if (!aRes.ok || !rRes.ok) {
      setError("Could not load artworks / collectors. Check Supabase.");
      return;
    }
    const aData = await aRes.json();
    const rData = await rRes.json();
    setArtworks(aData.artworks ?? []);
    setRegistrations(rData.registrations ?? []);
  }, []);

  const loadCustomers = useCallback(async (filter: CustomerFilter) => {
    const res = await fetch(`/api/admin/customers?filter=${filter}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not load customers. Run SQL migration 003?");
      return;
    }
    const data = await res.json();
    setCustomers(data.customers ?? []);
  }, []);

  useEffect(() => {
    setError(null);
    if (tab === "customers") {
      void loadCustomers(customerFilter);
    } else {
      void loadArtworks();
    }
  }, [tab, customerFilter, loadArtworks, loadCustomers]);

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
    await loadArtworks();
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex flex-wrap gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          {(
            [
              ["customers", "Customers"],
              ["artworks", "Artworks"],
              ["collectors", "Collectors"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`border px-4 py-2 transition-colors ${
                tab === id
                  ? "border-ink bg-ink text-paper"
                  : "border-rule text-ink-soft hover:border-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-stamp"
        >
          Log out
        </button>
      </div>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}

      {tab === "customers" ? (
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl text-ink">Postcard customers</h2>
              <p className="mt-2 text-sm text-ink-soft">
                {customers.length} shown · filter and export for monthly mailing
              </p>
            </div>
            <a
              href={`/api/admin/customers/export?filter=${customerFilter}`}
              className="border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Export CSV
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {CUSTOMER_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCustomerFilter(f.id)}
                className={`border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] ${
                  customerFilter === f.id
                    ? "border-stamp text-stamp"
                    : "border-rule text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-rule border-t border-rule">
            {customers.length === 0 ? (
              <li className="py-6 text-sm text-muted">No customers for this filter yet.</li>
            ) : (
              customers.map((c) => (
                <li key={c.id} className="grid gap-2 py-4 md:grid-cols-[8rem_1fr]">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-stamp">
                    <p>{c.plan || "—"}</p>
                    <p className="mt-1 text-muted">{c.status}</p>
                    {c.shipThisMonth ? (
                      <p className="mt-1 text-ink">Ship</p>
                    ) : null}
                  </div>
                  <div className="text-sm leading-relaxed text-ink-soft">
                    <p className="text-ink">
                      {c.firstName} · {c.email}
                    </p>
                    <p className="mt-1">{c.address || c.place}</p>
                    {c.periodEnd ? (
                      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                        Until {new Date(c.periodEnd).toLocaleDateString()}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}

      {tab === "artworks" ? (
        <>
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
                    <Image
                      src={a.imageUrl}
                      alt={a.number}
                      fill
                      className="object-cover"
                      unoptimized
                    />
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
        </>
      ) : null}

      {tab === "collectors" ? (
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
      ) : null}
    </div>
  );
}
