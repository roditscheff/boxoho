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
): Promise<{ lat: number; lng: number; displayName: string } | null> {
  const query = place.trim();
  if (!query) return null;

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
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
  }>;
  if (!data[0]) return null;

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    displayName: data[0].display_name,
  };
}
