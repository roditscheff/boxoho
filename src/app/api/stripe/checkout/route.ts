import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured, priceIdForPlan, type Plan } from "@/lib/stripe";

const schema = z.object({
  plan: z.enum(["monthly", "yearly"]),
  firstName: z.string().min(1).max(80),
  email: z.string().email().max(200),
  place: z.string().min(2).max(200),
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

  const { plan, firstName, email, place, mapConsent, locale } = parsed.data;
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

  // Monthly = recurring subscription; yearly = one-time payment for 12 cards
  const session =
    plan === "monthly"
      ? await stripe.checkout.sessions.create({
          mode: "subscription",
          customer_email: email,
          line_items: [{ price: priceIdForPlan(plan as Plan), quantity: 1 }],
          success_url: `${appUrl}/${locale}?subscribed=1#postcard`,
          cancel_url: `${appUrl}/${locale}?cancelled=1#postcard`,
          shipping_address_collection: { allowed_countries: [...shippingCountries] },
          phone_number_collection: { enabled: false },
          metadata,
          subscription_data: { metadata },
          locale: locale === "de" ? "de" : "en",
        })
      : await stripe.checkout.sessions.create({
          mode: "payment",
          customer_email: email,
          customer_creation: "always",
          line_items: [{ price: priceIdForPlan(plan as Plan), quantity: 1 }],
          success_url: `${appUrl}/${locale}?subscribed=1#postcard`,
          cancel_url: `${appUrl}/${locale}?cancelled=1#postcard`,
          shipping_address_collection: { allowed_countries: [...shippingCountries] },
          phone_number_collection: { enabled: false },
          metadata,
          payment_intent_data: { metadata },
          locale: locale === "de" ? "de" : "en",
        });

  if (!session.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
