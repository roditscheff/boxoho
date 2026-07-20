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
    .from("artworks")
    .select(
      "id, number, title, image_path, notes, created_at, release_year, release_month, release_day, collection_name, artwork_registrations(id)",
    )
    .order("release_year", { ascending: false })
    .order("release_month", { ascending: false })
    .order("release_day", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    artworks: (data ?? []).map((a) => {
      const regs = a.artwork_registrations as
        | { id: string }
        | { id: string }[]
        | null;
      const regList = Array.isArray(regs) ? regs : regs ? [regs] : [];
      return {
        id: a.id,
        number: a.number,
        title: a.title,
        imageUrl: publicStorageUrl("artworks", a.image_path),
        notes: a.notes,
        createdAt: a.created_at,
        releaseYear: a.release_year,
        releaseMonth: a.release_month,
        releaseDay: a.release_day,
        collectionName: a.collection_name,
        registered: regList.length > 0,
      };
    }),
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const form = await request.formData();
  const number = String(form.get("number") ?? "").trim().toUpperCase();
  const title = String(form.get("title") ?? "").trim() || null;
  const notes = String(form.get("notes") ?? "").trim() || null;
  const releaseYear = Number(form.get("releaseYear") || 0) || null;
  const releaseMonth = Number(form.get("releaseMonth") || 0) || null;
  const releaseDay = Number(form.get("releaseDay") || 0) || null;
  const collectionName = String(form.get("collectionName") ?? "").trim() || null;
  const image = form.get("image");

  if (!number) {
    return NextResponse.json({ error: "Number required" }, { status: 400 });
  }
  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "Image required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const ext = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${number.replace(/[^A-Z0-9_-]/gi, "")}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await image.arrayBuffer());

  const { error: uploadError } = await supabase.storage.from("artworks").upload(path, buffer, {
    contentType: image.type || "image/jpeg",
    upsert: false,
  });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("artworks")
    .insert({
      number,
      title,
      notes,
      image_path: path,
      release_year: releaseYear,
      release_month: releaseMonth,
      release_day: releaseDay,
      collection_name: collectionName,
    })
    .select("id, number")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, artwork: data });
}
