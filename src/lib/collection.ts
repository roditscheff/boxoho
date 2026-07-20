export type CollectionPiece = {
  day: number;
  month: number;
  year: number;
  collectionName: string | null;
  number: string | null;
  title: string | null;
  imageUrl: string | null;
  registered: boolean;
  isAnonymous: boolean;
  collectorName: string | null;
};

export type CollectionBlock = {
  year: number;
  month: number;
  collectionName: string;
  pieces: CollectionPiece[];
};

/** Fallback when no artworks are in the database yet. */
export const DEFAULT_COLLECTION_BLOCKS = [
  { year: 2026, month: 8, collectionName: "August", days: 31 },
] as const;

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Public label next to an artwork on the Collection page. */
export function collectorDisplayName(
  registered: boolean,
  isAnonymous: boolean,
  firstName: string | null,
  labels: { notRegistered: string; anonymousCollector: string },
): string {
  if (!registered) return labels.notRegistered;
  if (isAnonymous || !firstName?.trim()) return labels.anonymousCollector;
  return firstName.trim();
}

export function publicMapName(
  isAnonymous: boolean,
  firstName: string,
  anonymousLabel = "Anonymous",
): string {
  if (isAnonymous) return anonymousLabel;
  return firstName.trim() || anonymousLabel;
}

export function buildMonthPlaceholders(
  year: number,
  month: number,
  days: number,
  collectionName: string | null = null,
): CollectionPiece[] {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    month,
    year,
    collectionName,
    number: null,
    title: null,
    imageUrl: null,
    registered: false,
    isAnonymous: false,
    collectorName: null,
  }));
}

function pieceSortKey(piece: CollectionPiece): number {
  return piece.year * 10_000 + piece.month * 100 + piece.day;
}

function todayInZurich(now = new Date()): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return { year, month, day };
}

/**
 * Featured homepage arts: today's piece + the next 4 with images.
 * If today (or enough following days) are missing, take the next 5 available.
 */
export function selectFeaturedArtworks(
  pieces: CollectionPiece[],
  count = 5,
  now = new Date(),
): CollectionPiece[] {
  const withImages = pieces
    .filter((piece) => Boolean(piece.imageUrl))
    .sort((a, b) => pieceSortKey(a) - pieceSortKey(b));

  if (!withImages.length) return [];

  const today = todayInZurich(now);
  const todayKey = today.year * 10_000 + today.month * 100 + today.day;

  const fromToday = withImages.filter((piece) => pieceSortKey(piece) >= todayKey);
  if (fromToday.length >= count) return fromToday.slice(0, count);

  // Not enough upcoming — fill from the start of the catalog
  const picked = [...fromToday];
  for (const piece of withImages) {
    if (picked.length >= count) break;
    if (!picked.some((p) => p.number === piece.number && pieceSortKey(p) === pieceSortKey(piece))) {
      picked.push(piece);
    }
  }
  return picked.slice(0, count);
}
