import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  normalizeImageKey,
  parseArtworkExcel,
  type ArtworkBulkRow,
  type BulkMode,
} from "@/lib/artwork-bulk";
import {
  createAdminClient,
  isSupabaseConfigured,
  type SupabaseClient,
} from "@/lib/supabase/admin";

function isImageFile(file: File): boolean {
  return (
    file.type.startsWith("image/") ||
    /\.(jpe?g|png|webp|gif)$/i.test(file.name)
  );
}

async function findExisting(
  supabase: SupabaseClient,
  row: ArtworkBulkRow,
): Promise<{ id: string; number: string; image_path: string } | null> {
  const byNumber = await supabase
    .from("artworks")
    .select("id, number, image_path")
    .eq("number", row.number)
    .maybeSingle();
  if (byNumber.data) return byNumber.data;

  const bySlot = await supabase
    .from("artworks")
    .select("id, number, image_path")
    .eq("release_year", row.year)
    .eq("release_month", row.month)
    .eq("release_day", row.day)
    .eq("collection_name", row.collectionName)
    .maybeSingle();
  return bySlot.data ?? null;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const form = await request.formData();
  const mode = String(form.get("mode") ?? "append") as BulkMode;
  if (!["append", "replace", "delete"].includes(mode)) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const excel = form.get("excel");
  if (!(excel instanceof File) || excel.size === 0) {
    return NextResponse.json({ error: "Excel file required" }, { status: 400 });
  }

  const rows = parseArtworkExcel(await excel.arrayBuffer());
  if (!rows.length) {
    return NextResponse.json(
      {
        error:
          "No valid rows in Excel. Need jahr, monat, tag, kollektion — or a bild column like 2026-08-01-August.",
      },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();
  const images = new Map<string, File>();
  for (const value of form.getAll("images")) {
    if (value instanceof File && value.size > 0 && isImageFile(value)) {
      images.set(normalizeImageKey(value.name).toLowerCase(), value);
    }
  }

  const summary = {
    mode,
    total: rows.length,
    created: 0,
    updated: 0,
    deleted: 0,
    skipped: 0,
    missingImages: [] as string[],
    errors: [] as string[],
  };

  if (mode === "delete") {
    for (const row of rows) {
      const existing = await findExisting(supabase, row);
      if (!existing) {
        summary.skipped += 1;
        continue;
      }
      const { error } = await supabase.from("artworks").delete().eq("id", existing.id);
      if (error) {
        summary.errors.push(`${row.number}: ${error.message}`);
        continue;
      }
      summary.deleted += 1;
    }
    return NextResponse.json({ ok: true, summary });
  }

  for (const row of rows) {
    const image =
      images.get(row.imageKey.toLowerCase()) ||
      images.get(normalizeImageKey(row.number).toLowerCase());

    const existing = await findExisting(supabase, row);

    if (mode === "append" && existing) {
      summary.skipped += 1;
      continue;
    }

    // Replace without new image: update metadata only
    if (mode === "replace" && existing && !image) {
      const { error } = await supabase
        .from("artworks")
        .update({
          number: row.number,
          title: row.title,
          notes: row.notes,
          release_year: row.year,
          release_month: row.month,
          release_day: row.day,
          collection_name: row.collectionName,
        })
        .eq("id", existing.id);
      if (error) {
        summary.errors.push(`${row.number}: ${error.message}`);
        continue;
      }
      summary.updated += 1;
      continue;
    }

    if (!image) {
      summary.missingImages.push(row.imageKey);
      summary.skipped += 1;
      continue;
    }

    const ext = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${row.number.replace(/[^A-Z0-9_-]/gi, "")}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await image.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("artworks")
      .upload(path, buffer, {
        contentType: image.type || "image/jpeg",
        upsert: false,
      });
    if (uploadError) {
      summary.errors.push(`${row.number}: ${uploadError.message}`);
      continue;
    }

    const payload = {
      number: row.number,
      title: row.title,
      notes: row.notes,
      image_path: path,
      release_year: row.year,
      release_month: row.month,
      release_day: row.day,
      collection_name: row.collectionName,
    };

    if (existing) {
      const { error } = await supabase
        .from("artworks")
        .update(payload)
        .eq("id", existing.id);
      if (error) {
        summary.errors.push(`${row.number}: ${error.message}`);
        continue;
      }
      summary.updated += 1;
    } else {
      const { error } = await supabase.from("artworks").insert(payload);
      if (error) {
        summary.errors.push(`${row.number}: ${error.message}`);
        continue;
      }
      summary.created += 1;
    }
  }

  return NextResponse.json({ ok: true, summary });
}
