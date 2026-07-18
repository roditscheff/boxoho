import { NextResponse } from "next/server";
import {
  createAdminClient,
  isSupabaseConfigured,
  publicStorageUrl,
} from "@/lib/supabase/admin";

type Params = { params: Promise<{ number: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured yet." },
      { status: 503 },
    );
  }

  const { number: raw } = await params;
  const number = decodeURIComponent(raw).trim().toUpperCase();
  if (!number) {
    return NextResponse.json({ error: "Missing number" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: artwork, error } = await supabase
    .from("artworks")
    .select("id, number, title, image_path, artwork_registrations(id)")
    .ilike("number", number)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  const regs = artwork.artwork_registrations as
    | { id: string }
    | { id: string }[]
    | null;
  const regList = Array.isArray(regs) ? regs : regs ? [regs] : [];

  return NextResponse.json({
    id: artwork.id,
    number: artwork.number,
    title: artwork.title,
    imageUrl: publicStorageUrl("artworks", artwork.image_path),
    alreadyRegistered: regList.length > 0,
  });
}
