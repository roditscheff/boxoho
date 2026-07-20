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
