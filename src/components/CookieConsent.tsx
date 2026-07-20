"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import {
  CONSENT_OPEN_EVENT,
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from "@/lib/consent";

type CookieConsentProps = {
  locale: Locale;
  consent: Dictionary["consent"];
};

type View = "main" | "settings";

export function CookieConsent({ locale, consent }: CookieConsentProps) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");
  const [state, setState] = useState<ConsentState | null>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsentCookie();
    setState(existing);
    setAnalytics(existing?.analytics ?? false);
    setMarketing(existing?.marketing ?? false);
    setReady(true);
    if (!existing) {
      setView("main");
      setOpen(true);
    }

    function onOpen(event: Event) {
      const detail = (event as CustomEvent<{ mode?: View }>).detail;
      const existingNow = readConsentCookie();
      setState(existingNow);
      setAnalytics(existingNow?.analytics ?? false);
      setMarketing(existingNow?.marketing ?? false);
      setView(detail?.mode === "settings" ? "settings" : "main");
      setOpen(true);
    }

    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("boxoho-consent-open", open);
    return () => document.documentElement.classList.remove("boxoho-consent-open");
  }, [open]);

  function save(next: { analytics: boolean; marketing: boolean }, closeBanner: boolean) {
    const written = writeConsentCookie(next);
    setState(written);
    setAnalytics(written.analytics);
    setMarketing(written.marketing);
    window.dispatchEvent(
      new CustomEvent("boxoho:consentchange", { detail: { consent: written } }),
    );
    if (closeBanner) setOpen(false);
  }

  if (!ready || !open) return null;

  return (
    <div className="boxoho-consent" role="presentation">
      <div
        className="boxoho-consent__bar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="boxoho-consent-title"
        tabIndex={-1}
      >
        <div className="boxoho-consent__inner">
          {view === "main" ? (
            <div>
              <h2 className="boxoho-consent__title" id="boxoho-consent-title">
                {consent.title}
              </h2>
              <p className="boxoho-consent__intro">{consent.intro}</p>
              <p className="boxoho-consent__legal">
                <Link href={localePath(locale, "/privacy")} className="text-stamp underline">
                  {consent.privacyLink}
                </Link>
              </p>
              <div className="boxoho-consent__actions">
                <button
                  type="button"
                  className="boxoho-consent__btn boxoho-consent__btn--ghost"
                  onClick={() => save({ analytics: false, marketing: false }, true)}
                >
                  {consent.necessaryOnly}
                </button>
                <button
                  type="button"
                  className="boxoho-consent__btn boxoho-consent__btn--ghost"
                  onClick={() => setView("settings")}
                >
                  {consent.settings}
                </button>
                <button
                  type="button"
                  className="boxoho-consent__btn boxoho-consent__btn--primary"
                  onClick={() => save({ analytics: true, marketing: true }, true)}
                >
                  {consent.acceptAll}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="boxoho-consent__title">{consent.settings}</h2>

              <div className="boxoho-consent__category boxoho-consent__category--locked">
                <div className="boxoho-consent__cat-head">
                  <strong>{consent.necessaryTitle}</strong>
                  <span className="boxoho-consent__badge" aria-hidden>
                    ✓
                  </span>
                </div>
                <p>{consent.necessaryDesc}</p>
              </div>

              <label className="boxoho-consent__category">
                <div className="boxoho-consent__cat-head">
                  <strong>{consent.analyticsTitle}</strong>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                </div>
                <p>{consent.analyticsDesc}</p>
              </label>

              <label className="boxoho-consent__category">
                <div className="boxoho-consent__cat-head">
                  <strong>{consent.marketingTitle}</strong>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                </div>
                <p>{consent.marketingDesc}</p>
              </label>

              <div className="boxoho-consent__actions">
                <button
                  type="button"
                  className="boxoho-consent__btn boxoho-consent__btn--ghost"
                  onClick={() => {
                    if (state) setOpen(false);
                    else setView("main");
                  }}
                >
                  {consent.close}
                </button>
                <button
                  type="button"
                  className="boxoho-consent__btn boxoho-consent__btn--primary"
                  onClick={() => save({ analytics, marketing }, true)}
                >
                  {consent.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
