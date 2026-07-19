import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getStripe,
  isNewsletterPriceConfigured,
  isPhysicalPostcardPlan,
  isStripeConfigured,
  priceIdForPlan,
  type Plan,
} from "@/lib/stripe";

const schema = z.object({
  plan: z.enum(["newsletter", "monthly", "yearly"]),
  mapConsent: z.boolean().default(false),
  legalConsent: z.literal(true),
  locale: z.enum(["en", "de"]).default("en"),
});

const shippingCountries = [
  "CH",
  "DE",
  "AT",
  "FR",
  "IT",
  "GB",
  "US",
  "CA",
  "AU",
  "NL",
  "BE",
  "ES",
  "PT",
  "SE",
  "NO",
  "DK",
  "FI",
  "IE",
  "LU",
  "LI",
] as const;

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { plan, locale, mapConsent } = parsed.data;
  const physical = isPhysicalPostcardPlan(plan as Plan);

  if (plan === "newsletter" && !isNewsletterPriceConfigured()) {
    return NextResponse.json(
      { error: "Newsletter price is not configured yet." },
      { status: 503 },
    );
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const stripe = getStripe();
  const metadata = {
    mapConsent: mapConsent ? "true" : "false",
    legalConsent: "true",
    legalConsentAt: new Date().toISOString(),
    plan,
    source: "boxoho-postcard",
  };

  const common = {
    line_items: [{ price: priceIdForPlan(plan as Plan), quantity: 1 }],
    success_url: `${appUrl}/${locale}?subscribed=1#postcard`,
    cancel_url: `${appUrl}/${locale}?cancelled=1#postcard`,
    phone_number_collection: { enabled: false },
    metadata,
    locale: (locale === "de" ? "de" : "en") as "de" | "en",
  };

  // Newsletter + monthly = subscription; yearly = one-time payment for 12 cards.
  // Name/email/address in Stripe. Map blur (~100 km) is computed server-side from that address.
  // Newsletter: billing address when map consent is on (no shipping).
  const session =
    plan === "yearly"
      ? await stripe.checkout.sessions.create({
          ...common,
          mode: "payment",
          customer_creation: "always",
          shipping_address_collection: { allowed_countries: [...shippingCountries] },
          payment_intent_data: { metadata },
        })
      : await stripe.checkout.sessions.create({
          ...common,
          mode: "subscription",
          ...(physical
            ? { shipping_address_collection: { allowed_countries: [...shippingCountries] } }
            : mapConsent
              ? { billing_address_collection: "required" as const }
              : {}),
          subscription_data: { metadata },
        });

  if (!session.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
