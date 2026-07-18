"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type SubscriptionCheckoutProps = {
  locale: Locale;
  postcard: Dictionary["postcard"];
};

export function SubscriptionCheckout({ locale, postcard }: SubscriptionCheckoutProps) {
  const t = postcard.subscription;
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [mapConsent, setMapConsent] = useState(false);
  const [loading, setLoading] = useState<"monthly" | "yearly" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") setBanner(t.successBanner);
    if (params.get("cancelled") === "1") setBanner(t.cancelBanner);
  }, [t.cancelBanner, t.successBanner]);

  async function startCheckout(plan: "monthly" | "yearly") {
    setLoading(plan);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          firstName,
          email,
          place,
          mapConsent,
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.errorGeneric);
        setLoading(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(t.errorGeneric);
      setLoading(null);
    }
  }

  async function openPortal() {
    setLoading("portal");
    setError(null);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.errorGeneric);
        setLoading(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError(t.errorGeneric);
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      {banner ? (
        <p className="border border-rule bg-paper-deep/50 px-4 py-3 text-sm text-ink-soft">
          {banner}
        </p>
      ) : null}

      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {t.firstName}
          </span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {t.email}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {t.place}
          </span>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder={t.placePlaceholder}
            required
            className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={mapConsent}
          onChange={(e) => setMapConsent(e.target.checked)}
          className="mt-1 accent-[var(--stamp)]"
        />
        <span>{t.mapConsent}</span>
      </label>

      <p className="font-mono text-sm tracking-[0.04em] text-stamp">
        <span className="block">{t.priceMonth}</span>
        <span className="mt-1 block">{t.priceYear}</span>
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={loading !== null || !firstName || !email || !place}
          onClick={() => startCheckout("monthly")}
          className="border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
        >
          {loading === "monthly" ? t.loading : t.ctaMonth}
        </button>
        <button
          type="button"
          disabled={loading !== null || !firstName || !email || !place}
          onClick={() => startCheckout("yearly")}
          className="border border-stamp px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stamp transition-colors hover:bg-stamp hover:text-paper disabled:opacity-40"
        >
          {loading === "yearly" ? t.loading : t.ctaYear}
        </button>
      </div>

      <button
        type="button"
        disabled={loading !== null || !email}
        onClick={openPortal}
        className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-stamp hover:underline disabled:opacity-40"
      >
        {loading === "portal" ? t.loading : t.manageCta}
      </button>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
        {t.shippingNote}
      </p>
    </div>
  );
}
