import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { blurLocation, geocodePlace } from "@/lib/geo";
import { addMonths } from "@/lib/postcard-customers";
import { getStripe } from "@/lib/stripe";
import {
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

export const runtime = "nodejs";

async function upsertPostcardFromCheckout(session: Stripe.Checkout.Session) {
  if (!isSupabaseConfigured()) return;

  const meta = session.metadata || {};
  if (meta.source !== "boxoho-postcard") return;

  const plan = meta.plan === "yearly" ? "yearly" : "monthly";
  const mapConsent = meta.mapConsent === "true";
  const firstName = (meta.firstName || "").trim() || "Friend";
  const shipping = session.collected_information?.shipping_details;
  const address = shipping?.address;
  const place =
    (meta.place || "").trim() ||
    [address?.city, address?.country].filter(Boolean).join(", ");

  const email =
    session.customer_details?.email ||
    session.customer_email ||
    "";

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!email || !customerId) return;

  let publicLat: number | null = null;
  let publicLng: number | null = null;
  let lat: number | null = null;
  let lng: number | null = null;

  if (place) {
    const geo = await geocodePlace(place);
    if (geo) {
      lat = geo.lat;
      lng = geo.lng;
      if (mapConsent) {
        const blurred = blurLocation(geo.lat, geo.lng);
        publicLat = blurred.publicLat;
        publicLng = blurred.publicLng;
      }
    }
  }

  const stripe = getStripe();
  let subscriptionId: string | null =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  const now = new Date();
  let periodStart = now.toISOString();
  let periodEnd: string | null = null;

  if (plan === "yearly") {
    periodEnd = addMonths(now, 12).toISOString();
  } else if (subscriptionId) {
    try {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const item = sub.items.data[0];
      if (item) {
        periodStart = new Date(item.current_period_start * 1000).toISOString();
        periodEnd = new Date(item.current_period_end * 1000).toISOString();
      } else {
        periodEnd = addMonths(now, 1).toISOString();
      }
    } catch {
      periodEnd = addMonths(now, 1).toISOString();
    }
  }

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("postcard_locations")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  const payload = {
    first_name: firstName,
    email,
    place_text: place || [address?.city, address?.country].filter(Boolean).join(", ") || "—",
    lat,
    lng,
    public_lat: mapConsent ? publicLat : null,
    public_lng: mapConsent ? publicLng : null,
    map_consent: mapConsent,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    plan,
    status: "active",
    shipping_name: shipping?.name ?? null,
    shipping_line1: address?.line1 ?? null,
    shipping_line2: address?.line2 ?? null,
    shipping_city: address?.city ?? null,
    shipping_postal_code: address?.postal_code ?? null,
    shipping_state: address?.state ?? null,
    shipping_country: address?.country ?? null,
    period_start: periodStart,
    period_end: periodEnd,
    cancelled_at: null,
  };

  if (existing?.id) {
    await supabase.from("postcard_locations").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("postcard_locations").insert(payload);
  }
}

async function syncSubscription(subscription: Stripe.Subscription) {
  if (!isSupabaseConfigured()) return;
  if (subscription.metadata?.source !== "boxoho-postcard") {
    // Still update if we know the customer from a prior Boxoho checkout
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("postcard_locations")
    .select("id, plan")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!existing?.id) return;

  const cancelAtPeriodEnd = subscription.cancel_at_period_end;
  const stripeStatus = subscription.status;
  let status = "active";
  let cancelledAt: string | null = null;

  if (
    stripeStatus === "canceled" ||
    stripeStatus === "unpaid" ||
    stripeStatus === "incomplete_expired"
  ) {
    status = "cancelled";
    cancelledAt = new Date().toISOString();
  } else if (cancelAtPeriodEnd) {
    status = "cancelled";
    cancelledAt = new Date().toISOString();
  }

  const item = subscription.items.data[0];
  const periodStartTs = item?.current_period_start ?? subscription.created;
  const periodEndTs =
    item?.current_period_end ??
    subscription.cancel_at ??
    subscription.ended_at ??
    null;
  const periodEnd = periodEndTs ? new Date(periodEndTs * 1000) : null;

  if (periodEnd && periodEnd < new Date() && status === "cancelled") {
    status = "expired";
  }

  await supabase
    .from("postcard_locations")
    .update({
      stripe_subscription_id: subscription.id,
      status,
      cancelled_at: cancelledAt,
      period_start: new Date(periodStartTs * 1000).toISOString(),
      period_end: periodEnd?.toISOString() ?? null,
      plan: existing.plan || "monthly",
    })
    .eq("id", existing.id);
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.mode === "subscription" || session.mode === "payment") {
      await upsertPostcardFromCheckout(session);
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    await syncSubscription(event.data.object as Stripe.Subscription);
  }

  return NextResponse.json({ received: true });
}
