export const CONSENT_COOKIE = "boxoho_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 365 * 24 * 60 * 60;
export const CONSENT_OPEN_EVENT = "boxoho:consent-open";

export type ConsentState = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function serializeConsent(consent: Pick<ConsentState, "analytics" | "marketing">): string {
  return `v${CONSENT_VERSION}.${consent.analytics ? "1" : "0"}.${consent.marketing ? "1" : "0"}`;
}

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  const match = String(raw).match(/^v(\d+)\.([01])\.([01])$/);
  if (!match || Number(match[1]) !== CONSENT_VERSION) return null;
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: match[2] === "1",
    marketing: match[3] === "1",
  };
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return parseConsent(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function writeConsentCookie(
  consent: Pick<ConsentState, "analytics" | "marketing">,
): ConsentState {
  const next: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(consent.analytics),
    marketing: Boolean(consent.marketing),
  };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(serializeConsent(next))}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
  return next;
}

export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT, { detail: { mode: "settings" } }));
}
