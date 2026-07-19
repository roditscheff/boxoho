export const site = {
  name: "BOXOHO",
  email: "info@boxoho.com",
  address: "Muttenzerstrasse 48, 4127 Birsfelden, Schweiz",
  uid: "CHE-417.167.604",
  company: "Sundrbi GmbH",
  instagram: "https://instagram.com/boxoho",
  /** Canonical public site URL (Stripe success/cancel redirects). */
  appUrl: "https://www.boxoho.com",
  /** Set when the shop is live, e.g. "https://shop.boxoho.ch" */
  shopUrl: "",
} as const;

/** Public app origin for redirects. Never use a Supabase URL here. */
export function getAppUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  if (raw && !/supabase\.co/i.test(raw)) return raw;
  if (process.env.NODE_ENV === "development" && !raw) {
    return "http://127.0.0.1:3000";
  }
  return site.appUrl;
}
