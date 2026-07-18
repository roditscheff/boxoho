import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAdminClient,
  isSupabaseConfigured,
  publicStorageUrl,
} from "@/lib/supabase/admin";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("artwork_registrations")
    .select(
      "id, first_name, email, place_text, lat, lng, public_lat, public_lng, map_consent, home_photo_path, created_at, artworks(number, title, image_path)",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    registrations: (data ?? []).map((r) => {
      const raw = r.artworks as
        | { number: string; title: string | null; image_path: string }
        | { number: string; title: string | null; image_path: string }[]
        | null;
      const art = Array.isArray(raw) ? raw[0] : raw;
      return {
        id: r.id,
        firstName: r.first_name,
        email: r.email,
        place: r.place_text,
        lat: r.lat,
        lng: r.lng,
        publicLat: r.public_lat,
        publicLng: r.public_lng,
        mapConsent: r.map_consent,
        homePhotoUrl: r.home_photo_path
          ? publicStorageUrl("registration-photos", r.home_photo_path)
          : null,
        artworkNumber: art?.number ?? null,
        artworkTitle: art?.title ?? null,
        artworkImageUrl: art?.image_path
          ? publicStorageUrl("artworks", art.image_path)
          : null,
        createdAt: r.created_at,
      };
    }),
  });
}
