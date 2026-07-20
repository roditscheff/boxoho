import { NextResponse } from "next/server";
import { z } from "zod";
import { blurLocation, geocodePlace } from "@/lib/geo";
import {
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

const schema = z.object({
  number: z.string().min(1).max(64),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  street: z.string().min(1).max(200),
  postalCode: z.string().min(1).max(32),
  city: z.string().min(1).max(120),
  country: z.string().min(1).max(120),
  email: z.string().email().max(200),
  mapConsent: z.boolean().default(false),
  isAnonymous: z.boolean().default(false),
});

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured yet." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const parsed = schema.safeParse({
    number: String(form.get("number") ?? "").trim().toUpperCase(),
    firstName: String(form.get("firstName") ?? "").trim(),
    lastName: String(form.get("lastName") ?? "").trim(),
    street: String(form.get("street") ?? "").trim(),
    postalCode: String(form.get("postalCode") ?? "").trim(),
    city: String(form.get("city") ?? "").trim(),
    country: String(form.get("country") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    mapConsent: form.get("mapConsent") === "true" || form.get("mapConsent") === "on",
    isAnonymous:
      form.get("isAnonymous") === "true" || form.get("isAnonymous") === "on",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const {
    number,
    firstName,
    lastName,
    street,
    postalCode,
    city,
    country,
    email,
    mapConsent,
    isAnonymous,
  } = parsed.data;
  const placeText = `${street}, ${postalCode} ${city}, ${country}`;
  const supabase = createAdminClient();

  const { data: artwork, error: artError } = await supabase
    .from("artworks")
    .select("id, number, artwork_registrations(id)")
    .ilike("number", number)
    .maybeSingle();

  if (artError) {
    return NextResponse.json({ error: artError.message }, { status: 500 });
  }
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  const existingRaw = artwork.artwork_registrations as
    | { id: string }
    | { id: string }[]
    | null;
  const existing = Array.isArray(existingRaw)
    ? existingRaw
    : existingRaw
      ? [existingRaw]
      : [];
  if (existing.length) {
    return NextResponse.json(
      { error: "This artwork is already registered" },
      { status: 409 },
    );
  }

  const geo = await geocodePlace(`${postalCode} ${city}, ${country}`);
  if (!geo) {
    return NextResponse.json(
      { error: "Could not find that address. Please check city and country." },
      { status: 422 },
    );
  }

  let publicLat: number | null = null;
  let publicLng: number | null = null;
  if (mapConsent) {
    const blurred = blurLocation(geo.lat, geo.lng);
    publicLat = blurred.publicLat;
    publicLng = blurred.publicLng;
  }

  let homePhotoPath: string | null = null;
  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Photo too large (max 8 MB)" }, { status: 400 });
    }
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${artwork.id}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await photo.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("registration-photos")
      .upload(path, buffer, {
        contentType: photo.type || "image/jpeg",
        upsert: false,
      });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    homePhotoPath = path;
  }

  const { error: insertError } = await supabase.from("artwork_registrations").insert({
    artwork_id: artwork.id,
    first_name: firstName,
    last_name: lastName,
    street,
    postal_code: postalCode,
    city,
    country,
    email,
    place_text: placeText,
    lat: geo.lat,
    lng: geo.lng,
    public_lat: publicLat,
    public_lng: publicLng,
    map_consent: mapConsent,
    is_anonymous: isAnonymous,
    home_photo_path: homePhotoPath,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
