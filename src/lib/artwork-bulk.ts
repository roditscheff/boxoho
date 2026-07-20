import * as XLSX from "xlsx";

export type BulkMode = "append" | "replace" | "delete";

export type ArtworkBulkRow = {
  year: number;
  month: number;
  day: number;
  collectionName: string;
  number: string;
  title: string | null;
  notes: string | null;
  imageKey: string;
};

function normHeader(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u");
}

function cell(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const hit = Object.entries(row).find(([k]) => normHeader(k) === key);
    if (hit && hit[1] != null && String(hit[1]).trim() !== "") {
      return String(hit[1]).trim();
    }
  }
  return "";
}

function toInt(value: string): number | null {
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

/** Normalize image stem: 2026-08-01-August (pads month/day). */
export function normalizeImageKey(raw: string): string {
  const stem = raw
    .trim()
    .replace(/\.(jpe?g|png|webp|gif)$/i, "")
    .replace(/\\/g, "/")
    .split("/")
    .pop()!
    .replace(/\s+/g, "-");
  const match = stem.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-(.+)$/);
  if (!match) return stem;
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}-${match[4]}`;
}

export function buildImageKey(
  year: number,
  month: number,
  day: number,
  collectionName: string,
): string {
  const col = collectionName.trim().replace(/\s+/g, "-");
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}-${col}`;
}

export function parseImageKey(raw: string): {
  year: number;
  month: number;
  day: number;
  collectionName: string;
} | null {
  const key = normalizeImageKey(raw);
  const match = key.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-(.+)$/);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    collectionName: match[4].replace(/-/g, " ").trim(),
  };
}

export function parseArtworkExcel(buffer: ArrayBuffer): ArtworkBulkRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });

  const out: ArtworkBulkRow[] = [];
  for (const row of rows) {
    const imageRaw = cell(row, [
      "bild",
      "image",
      "filename",
      "dateiname",
      "image_key",
      "bildname",
    ]);
    const yearStr = cell(row, ["jahr", "year", "release_year"]);
    const monthStr = cell(row, ["monat", "month", "release_month"]);
    const dayStr = cell(row, ["tag", "day", "release_day"]);
    const collection = cell(row, [
      "kollektion",
      "collection",
      "collection_name",
      "kollektionsname",
    ]);
    const numberRaw = cell(row, ["nummer", "number", "nr"]);
    const title = cell(row, ["titel", "title", "name"]) || null;
    const notes = cell(row, ["notizen", "notes", "note"]) || null;

    let year = toInt(yearStr);
    let month = toInt(monthStr);
    let day = toInt(dayStr);
    let collectionName = collection;

    if (imageRaw) {
      const parsed = parseImageKey(imageRaw);
      if (parsed) {
        year ??= parsed.year;
        month ??= parsed.month;
        day ??= parsed.day;
        if (!collectionName) collectionName = parsed.collectionName;
      }
    }

    if (!year || !month || !day || !collectionName) {
      // Try to recover entirely from image key / number
      const fromNumber = parseImageKey(numberRaw || imageRaw);
      if (fromNumber) {
        year = fromNumber.year;
        month = fromNumber.month;
        day = fromNumber.day;
        collectionName = collectionName || fromNumber.collectionName;
      }
    }

    if (!year || !month || !day || !collectionName) continue;

    const imageKey = imageRaw
      ? normalizeImageKey(imageRaw)
      : buildImageKey(year, month, day, collectionName);
    const number = (numberRaw || imageKey).toUpperCase().replace(/\s+/g, "-");

    out.push({
      year,
      month,
      day,
      collectionName: collectionName.trim(),
      number,
      title,
      notes,
      imageKey,
    });
  }

  return out;
}

export function buildTemplateWorkbook(): ArrayBuffer {
  const rows = [
    {
      jahr: 2026,
      monat: 8,
      tag: 1,
      kollektion: "August",
      bild: "2026-08-01-August",
      nummer: "2026-08-01-AUGUST",
      titel: "",
      notizen: "",
    },
    {
      jahr: 2026,
      monat: 8,
      tag: 2,
      kollektion: "August",
      bild: "2026-08-02-August",
      nummer: "2026-08-02-AUGUST",
      titel: "",
      notizen: "",
    },
  ];
  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "artworks");
  return XLSX.write(book, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
}
