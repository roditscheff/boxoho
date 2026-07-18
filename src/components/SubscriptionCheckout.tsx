"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type Plan = "monthly" | "yearly";

type SubscriptionCheckoutProps = {
  locale: Locale;
  postcard: Dictionary["postcard"];
};

export function SubscriptionCheckout({ locale, postcard }: SubscriptionCheckoutProps) {
  const t = postcard.subscription;
  const [plan, setPlan] = useState<Plan>("monthly");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [mapConsent, setMapConsent] = useState(false);
  const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") setBanner(t.successBanner);
    if (params.get("cancelled") === "1") setBanner(t.cancelBanner);
  }, [t.cancelBanner, t.successBanner]);

  async function startCheckout() {
    setLoading("checkout");
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

  const plans: { id: Plan; title: string; body: string; price: string }[] = [
    {
      id: "monthly",
      title: t.planMonthTitle,
      body: t.planMonthBody,
      price: t.priceMonth,
    },
    {
      id: "yearly",
      title: t.planYearTitle,
      body: t.planYearBody,
      price: t.priceYear,
    },
  ];

  return (
    <div className="space-y-8">
      {banner ? (
        <p className="border border-rule bg-paper-deep/50 px-4 py-3 text-sm text-ink-soft">
          {banner}
        </p>
      ) : null}

      <div
        className="grid gap-4 md:grid-cols-2"
        role="radiogroup"
        aria-label={t.eyebrow}
      >
        {plans.map((item) => {
          const selected = plan === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setPlan(item.id)}
              className={`border px-5 py-5 text-left transition-colors ${
                selected
                  ? "border-ink bg-paper-deep/40"
                  : "border-rule hover:border-ink/50"
              }`}
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {item.title}
              </p>
              <p className="mt-2 text-2xl text-ink">{item.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </button>
          );
        })}
      </div>

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

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={loading !== null || !firstName || !email || !place}
          onClick={startCheckout}
          className="border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
        >
          {loading === "checkout"
            ? t.loading
            : plan === "monthly"
              ? t.ctaMonth
              : t.ctaYear}
        </button>
        <button
          type="button"
          disabled={loading !== null || !email}
          onClick={openPortal}
          className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-stamp hover:underline disabled:opacity-40"
        >
          {loading === "portal" ? t.loading : t.manageCta}
        </button>
      </div>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
        {t.shippingNote}
      </p>
    </div>
  );
}
