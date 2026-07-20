import { NextResponse } from "next/server";
import {
  createAdminClient,
  isSupabaseConfigured,
  publicStorageUrl,
} from "@/lib/supabase/admin";
import { publicMapName } from "@/lib/collection";
import type { PublicMapPoint } from "@/lib/types";

function supabaseHost(): string | null {
  try {
    const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!raw) return null;
    return new URL(raw).host;
  } catch {
    return "invalid-url";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";
  const host = supabaseHost();

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      points: [] as PublicMapPoint[],
      host,
    });
  }

  try {
    const supabase = createAdminClient();
    const points: PublicMapPoint[] = [];

    if (filter === "all" || filter === "artworks") {
      const { data, error } = await supabase
        .from("artwork_registrations")
        .select(
          "id, first_name, is_anonymous, public_lat, public_lng, home_photo_path, artworks(image_path)",
        )
        .eq("map_consent", true)
        .not("public_lat", "is", null)
        .not("public_lng", "is", null);

      if (error) {
        return NextResponse.json(
          { error: error.message, host },
          { status: 500 },
        );
      }

      for (const row of data ?? []) {
        const raw = row.artworks as
          | { image_path: string }
          | { image_path: string }[]
          | null;
        const art = Array.isArray(raw) ? raw[0] : raw;
        const imagePath = row.home_photo_path || art?.image_path || null;
        const bucket = row.home_photo_path ? "registration-photos" : "artworks";
        points.push({
          id: `artwork-${row.id}`,
          type: "artwork",
          firstName: publicMapName(
            Boolean((row as { is_anonymous?: boolean }).is_anonymous),
            row.first_name,
          ),
          lat: row.public_lat as number,
          lng: row.public_lng as number,
          imageUrl: imagePath ? publicStorageUrl(bucket, imagePath) : null,
        });
      }
    }

    if (filter === "all" || filter === "postcards") {
      const { data, error } = await supabase
        .from("postcard_locations")
        .select("id, first_name, public_lat, public_lng")
        .eq("map_consent", true)
        .not("public_lat", "is", null)
        .not("public_lng", "is", null);

      if (error) {
        return NextResponse.json(
          { error: error.message, host },
          { status: 500 },
        );
      }

      for (const row of data ?? []) {
        points.push({
          id: `postcard-${row.id}`,
          type: "postcard",
          firstName: "",
          lat: row.public_lat as number,
          lng: row.public_lng as number,
          imageUrl: null,
        });
      }
    }

    return NextResponse.json({ configured: true, points, host });
  } catch (err) {
    const message = err instanceof Error ? `${err.name}: ${err.message}` : "Unknown error";
    return NextResponse.json({ error: message, host }, { status: 500 });
  }
}
