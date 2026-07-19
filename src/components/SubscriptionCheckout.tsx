"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import type { Plan } from "@/lib/stripe";

type SubscriptionCheckoutProps = {
  locale: Locale;
  postcard: Dictionary["postcard"];
};

export function SubscriptionCheckout({ locale, postcard }: SubscriptionCheckoutProps) {
  const t = postcard.subscription;
  const [plan, setPlan] = useState<Plan>("monthly");
  const [mapConsent, setMapConsent] = useState(false);
  const [portalEmail, setPortalEmail] = useState("");
  const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const isPhysical = plan === "monthly" || plan === "yearly";

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
          mapConsent: isPhysical ? mapConsent : false,
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          plan === "newsletter" && res.status === 503
            ? t.newsletterMissingPrice
            : data.error || t.errorGeneric;
        setError(msg);
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
        body: JSON.stringify({ email: portalEmail, locale }),
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
      id: "newsletter",
      title: t.planNewsletterTitle,
      body: t.planNewsletterBody,
      price: t.priceNewsletter,
    },
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

  const ctaLabel =
    plan === "newsletter" ? t.ctaNewsletter : plan === "monthly" ? t.ctaMonth : t.ctaYear;

  return (
    <div className="space-y-8">
      {banner ? (
        <p className="border border-rule bg-paper-deep/50 px-4 py-3 text-sm text-ink-soft">
          {banner}
        </p>
      ) : null}

      <div
        className="grid gap-4 md:grid-cols-3"
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

      {isPhysical ? (
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={mapConsent}
            onChange={(e) => setMapConsent(e.target.checked)}
            className="mt-1 accent-[var(--stamp)]"
          />
          <span>{t.mapConsent}</span>
        </label>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={loading !== null}
          onClick={startCheckout}
          className="rounded-full bg-stamp px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft disabled:opacity-40"
        >
          {loading === "checkout" ? t.loading : ctaLabel}
        </button>
      </div>

      <div className="border-t border-rule pt-6">
        <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
          {t.manageCta}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-0 flex-1">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              {t.portalEmail}
            </span>
            <input
              type="email"
              value={portalEmail}
              onChange={(e) => setPortalEmail(e.target.value)}
              placeholder={t.portalEmailPlaceholder}
              className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
            />
          </label>
          <button
            type="button"
            disabled={loading !== null || !portalEmail}
            onClick={openPortal}
            className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-stamp hover:underline disabled:opacity-40"
          >
            {loading === "portal" ? t.loading : t.manageSubmit}
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
        {t.shippingNote}
      </p>
    </div>
  );
}
