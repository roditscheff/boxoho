"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import type { Plan } from "@/lib/stripe";

type SubscriptionCheckoutProps = {
  locale: Locale;
  postcard: Dictionary["postcard"];
  plan: Plan;
  onPlanChange: (plan: Plan) => void;
};

export function SubscriptionCheckout({
  locale,
  postcard,
  plan,
  onPlanChange,
}: SubscriptionCheckoutProps) {
  const t = postcard.subscription;
  const [mapConsent, setMapConsent] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [portalEmail, setPortalEmail] = useState("");
  const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") setBanner(t.successBanner);
    if (params.get("cancelled") === "1") setBanner(t.cancelBanner);
  }, [t.cancelBanner, t.successBanner]);

  async function startCheckout() {
    if (!legalConsent) {
      setError(t.legalConsentRequired);
      return;
    }

    setLoading("checkout");
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          mapConsent,
          legalConsent: true,
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

  const selected =
    plan === "newsletter"
      ? t.factsNewsletter
      : plan === "yearly"
        ? t.factsYear
        : t.factsMonth;

  return (
    <div className="space-y-6">
      {banner ? (
        <p className="border border-rule bg-paper-deep/50 px-4 py-3 text-sm text-ink-soft">
          {banner}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="postcard-plan"
          className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted"
        >
          {t.planSelectLabel} ▾
        </label>
        <div className="relative">
          <select
            id="postcard-plan"
            value={plan}
            onChange={(e) => onPlanChange(e.target.value as Plan)}
            className="w-full appearance-none rounded-full border-2 border-stamp bg-paper px-5 py-3.5 pr-12 font-mono text-[0.85rem] text-ink outline-none transition-colors focus:border-stamp-soft"
          >
            <option value="newsletter">{t.planNewsletterOption}</option>
            <option value="monthly">{t.planMonthOption}</option>
            <option value="yearly">{t.planYearOption}</option>
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-stamp"
          >
            ▾
          </span>
        </div>
      </div>

      <div className="border-l-2 border-dashed border-stamp/40 pl-4">
        <ul className="space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">
          {selected.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stamp/70" aria-hidden />
              {fact}
            </li>
          ))}
        </ul>
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

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          checked={legalConsent}
          onChange={(e) => {
            setLegalConsent(e.target.checked);
            if (e.target.checked) setError(null);
          }}
          required
          className="mt-1 accent-[var(--stamp)]"
        />
        <span>
          {t.legalConsentBefore}{" "}
          <Link
            href={localePath(locale, "/terms")}
            className="text-stamp underline underline-offset-2 hover:text-stamp-soft"
          >
            {t.legalConsentTerms}
          </Link>{" "}
          {t.legalConsentAnd}{" "}
          <Link
            href={localePath(locale, "/privacy")}
            className="text-stamp underline underline-offset-2 hover:text-stamp-soft"
          >
            {t.legalConsentPrivacy}
          </Link>
          .
        </span>
      </label>

      <div>
        <button
          type="button"
          disabled={loading !== null || !legalConsent}
          onClick={startCheckout}
          className="w-full rounded-full bg-stamp px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft disabled:opacity-40 sm:px-6 sm:py-4 sm:text-[0.78rem] md:w-auto"
        >
          {loading === "checkout" ? t.loading : t.ctaBuy}
        </button>
        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
          {postcard.note}
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowPortal((v) => !v)}
          className="text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-stamp hover:decoration-stamp"
        >
          {t.manageCta}
        </button>
        {showPortal ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
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
        ) : null}
      </div>

      {error ? <p className="text-sm text-stamp">{error}</p> : null}
    </div>
  );
}
