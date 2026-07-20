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
  releaseYear: number | null;
  releaseMonth: number | null;
  releaseDay: number | null;
  collectionName: string | null;
};

type BulkSummary = {
  mode: string;
  total: number;
  created: number;
  updated: number;
  deleted: number;
  skipped: number;
  missingImages: string[];
  errors: string[];
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
  shippingName: string | null;
  shippingLine1: string | null;
  shippingLine2: string | null;
  shippingCity: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  cancelledAt: string | null;
  shipThisMonth: boolean;
  mapConsent: boolean;
  createdAt: string;
};

function splitName(shippingName: string | null, firstName: string) {
  const first = (firstName || "").trim();
  const full = (shippingName || first).trim();
  if (!full) return { firstName: first, lastName: "" };
  if (first && full.toLowerCase().startsWith(first.toLowerCase())) {
    return { firstName: first, lastName: full.slice(first.length).trim() };
  }
  const parts = full.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("de-CH");
}

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
  const [bulkSummary, setBulkSummary] = useState<BulkSummary | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
    setBulkSummary(null);
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

  async function bulkUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setBulkSummary(null);
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/admin/artworks/bulk", { method: "POST", body: form });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Bulk upload failed");
      return;
    }
    setBulkSummary(data.summary as BulkSummary);
    event.currentTarget.reset();
    await loadArtworks();
  }

  async function deleteArtwork(id: string) {
    if (!confirm("Dieses Artwork wirklich löschen?")) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/artworks/${id}`, { method: "DELETE" });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed");
      return;
    }
    setSelectedIds((ids) => ids.filter((x) => x !== id));
    await loadArtworks();
  }

  async function deleteSelected() {
    if (!selectedIds.length) return;
    if (!confirm(`${selectedIds.length} Artworks löschen?`)) return;
    setSaving(true);
    setError(null);
    for (const id of selectedIds) {
      const res = await fetch(`/api/admin/artworks/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed");
        setSaving(false);
        await loadArtworks();
        return;
      }
    }
    setSelectedIds([]);
    setSaving(false);
    await loadArtworks();
  }

  function toggleSelected(id: string) {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
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

          <div className="overflow-x-auto border-t border-rule">
            <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  <th className="px-2 py-3 font-normal">produkt</th>
                  <th className="px-2 py-3 font-normal">Vorname</th>
                  <th className="px-2 py-3 font-normal">Name</th>
                  <th className="px-2 py-3 font-normal">Strasse und Nr.</th>
                  <th className="px-2 py-3 font-normal">PLZ</th>
                  <th className="px-2 py-3 font-normal">Land</th>
                  <th className="px-2 py-3 font-normal">emailadresse</th>
                  <th className="px-2 py-3 font-normal">until</th>
                  <th className="px-2 py-3 font-normal">ended/expired</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-2 py-6 text-muted">
                      No customers for this filter yet.
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => {
                    const { firstName, lastName } = splitName(c.shippingName, c.firstName);
                    const street = [c.shippingLine1, c.shippingLine2]
                      .filter(Boolean)
                      .join(", ");
                    const ended =
                      c.status === "cancelled" || c.status === "expired"
                        ? formatDate(c.cancelledAt) || formatDate(c.periodEnd) || c.status
                        : "";
                    return (
                      <tr key={c.id} className="border-b border-rule/70 text-ink-soft">
                        <td className="px-2 py-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-stamp">
                          {c.plan || "—"}
                        </td>
                        <td className="px-2 py-3 text-ink">{firstName}</td>
                        <td className="px-2 py-3 text-ink">{lastName || "—"}</td>
                        <td className="px-2 py-3">{street || "—"}</td>
                        <td className="px-2 py-3">{c.shippingPostalCode || "—"}</td>
                        <td className="px-2 py-3">{c.shippingCountry || "—"}</td>
                        <td className="px-2 py-3">{c.email}</td>
                        <td className="px-2 py-3">{formatDate(c.periodEnd) || "—"}</td>
                        <td className="px-2 py-3">{ended || "—"}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "artworks" ? (
        <>
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl text-ink">Bulk upload (Excel + images)</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  Excel-Spalten: <code>jahr</code>, <code>monat</code>, <code>tag</code>,{" "}
                  <code>kollektion</code>, optional <code>bild</code> (
                  <code>2026-08-01-August</code>), <code>nummer</code>, <code>titel</code>,{" "}
                  <code>notizen</code>. Bilddateien gleich benennen:{" "}
                  <code>jahr-monat-tag-Kollektion.jpg</code>
                </p>
              </div>
              <a
                href="/api/admin/artworks/template"
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-stamp underline-offset-4 hover:underline"
              >
                Excel-Vorlage laden
              </a>
            </div>

            <form onSubmit={bulkUpload} className="mt-6 grid max-w-2xl gap-4">
              <label className="block">
                <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Mode
                </span>
                <select
                  name="mode"
                  defaultValue="append"
                  className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
                >
                  <option value="append">Ergänzen (nur neue)</option>
                  <option value="replace">Ersetzen / aktualisieren</option>
                  <option value="delete">Löschen (laut Excel-Zeilen)</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Excel (.xlsx)
                </span>
                <input
                  name="excel"
                  type="file"
                  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  required
                  className="w-full border border-rule bg-transparent px-4 py-3 font-mono text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Bilder (mehrere — Name = jahr-monat-tag-Kollektion)
                </span>
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full border border-rule bg-transparent px-4 py-3 font-mono text-sm"
                />
              </label>
              <button
                type="submit"
                disabled={saving}
                className="w-fit border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper disabled:opacity-50"
              >
                {saving ? "Working…" : "Bulk starten"}
              </button>
            </form>

            {bulkSummary ? (
              <div className="mt-6 max-w-2xl border border-rule bg-paper-deep/40 px-4 py-3 text-sm text-ink-soft">
                <p>
                  Mode {bulkSummary.mode}: {bulkSummary.created} neu, {bulkSummary.updated}{" "}
                  updated, {bulkSummary.deleted} gelöscht, {bulkSummary.skipped} übersprungen
                  (von {bulkSummary.total}).
                </p>
                {bulkSummary.missingImages.length ? (
                  <p className="mt-2 text-stamp">
                    Fehlende Bilder: {bulkSummary.missingImages.slice(0, 12).join(", ")}
                    {bulkSummary.missingImages.length > 12 ? "…" : ""}
                  </p>
                ) : null}
                {bulkSummary.errors.length ? (
                  <p className="mt-2 text-stamp">{bulkSummary.errors.slice(0, 5).join(" · ")}</p>
                ) : null}
              </div>
            ) : null}
          </section>

          <section>
            <h2 className="text-2xl text-ink">Einzelnes Artwork</h2>
            <form onSubmit={createArtwork} className="mt-6 grid max-w-xl gap-4">
              <label className="block">
                <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  Number
                </span>
                <input
                  name="number"
                  required
                  placeholder="2026-08-01-AUGUST"
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
                  Collection name
                </span>
                <input
                  name="collectionName"
                  placeholder="August"
                  className="w-full border border-rule bg-transparent px-4 py-3 outline-none focus:border-stamp"
                />
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    Year
                  </span>
                  <input
                    name="releaseYear"
                    type="number"
                    placeholder="2026"
                    className="w-full border border-rule bg-transparent px-3 py-3 outline-none focus:border-stamp"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    Month
                  </span>
                  <input
                    name="releaseMonth"
                    type="number"
                    min={1}
                    max={12}
                    placeholder="8"
                    className="w-full border border-rule bg-transparent px-3 py-3 outline-none focus:border-stamp"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    Day
                  </span>
                  <input
                    name="releaseDay"
                    type="number"
                    min={1}
                    max={31}
                    placeholder="1"
                    className="w-full border border-rule bg-transparent px-3 py-3 outline-none focus:border-stamp"
                  />
                </label>
              </div>
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl text-ink">Artworks ({artworks.length})</h2>
              <button
                type="button"
                disabled={!selectedIds.length || saving}
                onClick={deleteSelected}
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-stamp disabled:opacity-40"
              >
                Auswahl löschen ({selectedIds.length})
              </button>
            </div>
            <ul className="mt-6 divide-y divide-rule border-t border-rule">
              {artworks.map((a) => (
                <li key={a.id} className="flex items-center gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(a.id)}
                    onChange={() => toggleSelected(a.id)}
                    className="accent-[var(--stamp)]"
                    aria-label={`Select ${a.number}`}
                  />
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
                    <p className="truncate text-ink">{a.title || a.collectionName || "—"}</p>
                    <p className="mt-1 text-xs text-muted">
                      {[a.collectionName, a.releaseYear, a.releaseMonth, a.releaseDay]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    {a.registered ? "Registered" : "Open"}
                  </p>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => deleteArtwork(a.id)}
                    className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-stamp disabled:opacity-40"
                  >
                    Delete
                  </button>
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
