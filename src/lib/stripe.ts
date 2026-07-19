import Stripe from "stripe";

export type Plan = "newsletter" | "monthly" | "yearly";

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_MONTHLY &&
      process.env.STRIPE_PRICE_YEARLY,
  );
}

export function isNewsletterPriceConfigured(): boolean {
  return Boolean(process.env.STRIPE_PRICE_NEWSLETTER);
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, {
    apiVersion: "2026-06-24.dahlia",
  });
}

export function priceIdForPlan(plan: Plan): string {
  const id =
    plan === "newsletter"
      ? process.env.STRIPE_PRICE_NEWSLETTER
      : plan === "monthly"
        ? process.env.STRIPE_PRICE_MONTHLY
        : process.env.STRIPE_PRICE_YEARLY;
  if (!id) throw new Error(`Missing Stripe price for ${plan}`);
  return id;
}

export function isPhysicalPostcardPlan(plan: Plan): boolean {
  return plan === "monthly" || plan === "yearly";
}
