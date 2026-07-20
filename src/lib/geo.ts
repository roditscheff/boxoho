import { iso1A2Code } from "@rapideditor/country-coder";

const EARTH_RADIUS_KM = 6371;

/** Blur exact coords into a public point ~40–100 km away. */
export function blurLocation(
  lat: number,
  lng: number,
  minKm = 40,
  maxKm = 100,
): { publicLat: number; publicLng: number } {
  const distanceKm = minKm + Math.random() * (maxKm - minKm);
  const bearing = Math.random() * Math.PI * 2;
  return destinationPoint(lat, lng, distanceKm, bearing);
}

/**
 * Blur exact coords like `blurLocation`, but keep the public point inside the
 * same country as the original address (checked locally, no extra network
 * calls). Falls back to progressively smaller radii for small countries, and
 * finally to the original point if no in-country candidate can be found.
 */
export function blurLocationWithinCountry(
  lat: number,
  lng: number,
  countryCode: string | null | undefined,
  minKm = 40,
  maxKm = 100,
): { publicLat: number; publicLng: number } {
  if (!countryCode) return blurLocation(lat, lng, minKm, maxKm);

  const targetCountry = countryCode.toUpperCase();
  const attemptsPerBand = 60;
  const bands: Array<[number, number]> = [
    [minKm, maxKm],
    [minKm / 2, maxKm / 2],
    [minKm / 4, maxKm / 4],
    [1, minKm / 4],
    [0.1, 1],
  ];

  for (const [bandMin, bandMax] of bands) {
    for (let i = 0; i < attemptsPerBand; i++) {
      const distanceKm = bandMin + Math.random() * (bandMax - bandMin);
      const bearing = Math.random() * Math.PI * 2;
      const candidate = destinationPoint(lat, lng, distanceKm, bearing);
      const candidateCountry = iso1A2Code([
        candidate.publicLng,
        candidate.publicLat,
      ]);
      if (candidateCountry && candidateCountry.toUpperCase() === targetCountry) {
        return candidate;
      }
    }
  }

  return { publicLat: lat, publicLng: lng };
}

function destinationPoint(
  lat: number,
  lng: number,
  distanceKm: number,
  bearingRad: number,
): { publicLat: number; publicLng: number } {
  const δ = distanceKm / EARTH_RADIUS_KM;
  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lng * Math.PI) / 180;

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(bearingRad),
  );
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(bearingRad) * Math.sin(δ) * Math.cos(φ1),
      Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2),
    );

  return {
    publicLat: (φ2 * 180) / Math.PI,
    publicLng: (((λ2 * 180) / Math.PI + 540) % 360) - 180,
  };
}

export async function geocodePlace(
  place: string,
): Promise<
  { lat: number; lng: number; displayName: string; countryCode: string | null }
  | null
> {
  const query = place.trim();
  if (!query) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "BoxohoWebsite/1.0 (collectors-map)",
      Accept: "application/json",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    address?: { country_code?: string };
  }>;
  if (!data[0]) return null;

  const lat = Number(data[0].lat);
  const lng = Number(data[0].lon);
  const countryCode = data[0].address?.country_code
    ? data[0].address.country_code.toUpperCase()
    : iso1A2Code([lng, lat]);

  return {
    lat,
    lng,
    displayName: data[0].display_name,
    countryCode,
  };
}
