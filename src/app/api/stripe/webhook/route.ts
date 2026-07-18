import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { blurLocation, geocodePlace } from "@/lib/geo";
import { getStripe } from "@/lib/stripe";
import {
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

export const runtime = "nodejs";

async function upsertPostcardLocation(session: Stripe.Checkout.Session) {
  if (!isSupabaseConfigured()) return;

  const meta = session.metadata || {};
  if (meta.source !== "boxoho-postcard") return;

  const mapConsent = meta.mapConsent === "true";
  const firstName = (meta.firstName || "").trim() || "Friend";
  const shipping = session.collected_information?.shipping_details;
  const place =
    (meta.place || "").trim() ||
    [shipping?.address?.city, shipping?.address?.country].filter(Boolean).join(", ");

  if (!place) return;

  const geo = await geocodePlace(place);
  if (!geo) return;

  let publicLat: number | null = null;
  let publicLng: number | null = null;
  if (mapConsent) {
    const blurred = blurLocation(geo.lat, geo.lng);
    publicLat = blurred.publicLat;
    publicLng = blurred.publicLng;
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  const email =
    session.customer_details?.email ||
    session.customer_email ||
    "";

  if (!email || !customerId) return;

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("postcard_locations")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  const payload = {
    first_name: firstName,
    email,
    place_text: place,
    lat: geo.lat,
    lng: geo.lng,
    public_lat: publicLat,
    public_lng: publicLng,
    map_consent: mapConsent,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId ?? null,
    shipping_name: shipping?.name ?? null,
  };

  if (existing?.id) {
    await supabase.from("postcard_locations").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("postcard_locations").insert(payload);
  }
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
      await upsertPostcardLocation(session);
    }
  }

  return NextResponse.json({ received: true });
}
