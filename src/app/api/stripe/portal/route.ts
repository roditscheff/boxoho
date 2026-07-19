import { NextResponse } from "next/server";
import { z } from "zod";
import { getAppUrl } from "@/lib/site";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["en", "de"]).default("en"),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const stripe = getStripe();
  const customers = await stripe.customers.list({
    email: parsed.data.email,
    limit: 1,
  });
  const customer = customers.data[0];
  if (!customer) {
    return NextResponse.json({ error: "No customer found for that email" }, { status: 404 });
  }

  const appUrl = getAppUrl();
  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${appUrl}/${parsed.data.locale}#postcard`,
  });

  return NextResponse.json({ url: portal.url });
}
