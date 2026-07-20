import { NextResponse } from "next/server";
import {
  buildMonthPlaceholders,
  daysInMonth,
  DEFAULT_COLLECTION_BLOCKS,
  selectFeaturedArtworks,
  type CollectionBlock,
  type CollectionPiece,
} from "@/lib/collection";
import {
  createAdminClient,
  isSupabaseConfigured,
  publicStorageUrl,
} from "@/lib/supabase/admin";

type ArtworkRow = {
  id: string;
  number: string;
  title: string | null;
  image_path: string;
  release_year: number | null;
  release_month: number | null;
  release_day: number | null;
  collection_name: string | null;
  artwork_registrations:
    | { first_name: string; is_anonymous: boolean }
    | { first_name: string; is_anonymous: boolean }[]
    | null;
};

function emptyDefaultMonths(): CollectionBlock[] {
  return DEFAULT_COLLECTION_BLOCKS.map(({ year, month, collectionName, days }) => ({
    year,
    month,
    collectionName,
    pieces: buildMonthPlaceholders(year, month, days, collectionName),
  }));
}

function flattenPieces(months: CollectionBlock[]): CollectionPiece[] {
  return months.flatMap((block) => block.pieces);
}

export async function GET() {
  const fallback = emptyDefaultMonths();

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      configured: false,
      months: fallback,
      featured: selectFeaturedArtworks(flattenPieces(fallback)),
    });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("artworks")
      .select(
        "id, number, title, image_path, release_year, release_month, release_day, collection_name, artwork_registrations(first_name, is_anonymous)",
      )
      .order("release_year", { ascending: true })
      .order("release_month", { ascending: true })
      .order("release_day", { ascending: true });

    if (error) {
      return NextResponse.json({
        configured: true,
        months: fallback,
        featured: selectFeaturedArtworks(flattenPieces(fallback)),
        warning: error.message,
      });
    }

    const rows = (data ?? []) as ArtworkRow[];
    const withSlot = rows.filter(
      (row) => row.release_year && row.release_month && row.release_day,
    );

    if (!withSlot.length) {
      return NextResponse.json({
        configured: true,
        months: fallback,
        featured: selectFeaturedArtworks(flattenPieces(fallback)),
      });
    }

    const groupKeys = new Map<
      string,
      { year: number; month: number; collectionName: string }
    >();
    for (const row of withSlot) {
      const collectionName = row.collection_name?.trim() || "Collection";
      const key = `${row.release_year}-${row.release_month}-${collectionName}`;
      groupKeys.set(key, {
        year: row.release_year!,
        month: row.release_month!,
        collectionName,
      });
    }

    const months: CollectionBlock[] = [...groupKeys.values()]
      .sort((a, b) => a.year - b.year || a.month - b.month || a.collectionName.localeCompare(b.collectionName))
      .map((group) => {
        const days = daysInMonth(group.year, group.month);
        const pieces: CollectionPiece[] = buildMonthPlaceholders(
          group.year,
          group.month,
          days,
          group.collectionName,
        );

        for (const row of withSlot) {
          const name = row.collection_name?.trim() || "Collection";
          if (
            row.release_year !== group.year ||
            row.release_month !== group.month ||
            name !== group.collectionName
          ) {
            continue;
          }
          const day = row.release_day!;
          if (day < 1 || day > pieces.length) continue;

          const regRaw = row.artwork_registrations;
          const reg = Array.isArray(regRaw) ? regRaw[0] : regRaw;
          pieces[day - 1] = {
            day,
            month: group.month,
            year: group.year,
            collectionName: group.collectionName,
            number: row.number,
            title: row.title,
            imageUrl: publicStorageUrl("artworks", row.image_path),
            registered: Boolean(reg),
            isAnonymous: Boolean(reg?.is_anonymous),
            collectorName: reg?.first_name ?? null,
          };
        }

        return {
          year: group.year,
          month: group.month,
          collectionName: group.collectionName,
          pieces,
        };
      });

    return NextResponse.json({
      configured: true,
      months,
      featured: selectFeaturedArtworks(flattenPieces(months)),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({
      configured: false,
      months: fallback,
      featured: selectFeaturedArtworks(flattenPieces(fallback)),
      error: message,
    });
  }
}
