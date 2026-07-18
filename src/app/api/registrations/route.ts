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
  email: z.string().email().max(200),
  place: z.string().min(2).max(200),
  mapConsent: z.boolean().default(false),
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
    email: String(form.get("email") ?? "").trim(),
    place: String(form.get("place") ?? "").trim(),
    mapConsent: form.get("mapConsent") === "true" || form.get("mapConsent") === "on",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { number, firstName, email, place, mapConsent } = parsed.data;
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

  const geo = await geocodePlace(place);
  if (!geo) {
    return NextResponse.json(
      { error: "Could not find that place. Try a city and country." },
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
    email,
    place_text: place,
    lat: geo.lat,
    lng: geo.lng,
    public_lat: publicLat,
    public_lng: publicLng,
    map_consent: mapConsent,
    home_photo_path: homePhotoPath,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
