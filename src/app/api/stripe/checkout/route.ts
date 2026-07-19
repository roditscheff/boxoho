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
  firstName: z.string().min(1).max(80),
  email: z.string().email().max(200),
  place: z.string().max(200).optional().default(""),
  mapConsent: z.boolean().default(false),
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

  const { plan, firstName, email, locale } = parsed.data;
  let { place, mapConsent } = parsed.data;

  if (plan === "newsletter" && !isNewsletterPriceConfigured()) {
    return NextResponse.json(
      { error: "Newsletter price is not configured yet." },
      { status: 503 },
    );
  }

  const physical = isPhysicalPostcardPlan(plan as Plan);
  if (physical && place.trim().length < 2) {
    return NextResponse.json(
      { error: "Place is required for postcard plans." },
      { status: 400 },
    );
  }
  if (!physical) {
    place = "";
    mapConsent = false;
  }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  const stripe = getStripe();
  const metadata = {
    firstName,
    place,
    mapConsent: mapConsent ? "true" : "false",
    plan,
    source: "boxoho-postcard",
  };

  const common = {
    customer_email: email,
    line_items: [{ price: priceIdForPlan(plan as Plan), quantity: 1 }],
    success_url: `${appUrl}/${locale}?subscribed=1#postcard`,
    cancel_url: `${appUrl}/${locale}?cancelled=1#postcard`,
    phone_number_collection: { enabled: false },
    metadata,
    locale: (locale === "de" ? "de" : "en") as "de" | "en",
  };

  // Newsletter + monthly = subscription; yearly = one-time payment for 12 cards
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
            : {}),
          subscription_data: { metadata },
        });

  if (!session.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
