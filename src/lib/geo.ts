import { iso1A2Code } from "@rapideditor/country-coder";
import * as isoCountries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import de from "i18n-iso-countries/langs/de.json";
import fr from "i18n-iso-countries/langs/fr.json";
import it from "i18n-iso-countries/langs/it.json";

isoCountries.registerLocale(en);
isoCountries.registerLocale(de);
isoCountries.registerLocale(fr);
isoCountries.registerLocale(it);

const EARTH_RADIUS_KM = 6371;

/**
 * Resolve a free-text country field (e.g. "Schweiz", "Switzerland", "CH")
 * typed by a user into an ISO 3166-1 alpha-2 code, so geocoding can be
 * restricted to that exact country. Returns null if it can't be resolved.
 */
export function resolveCountryCode(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[a-zA-Z]{2}$/.test(trimmed) && isoCountries.isValid(trimmed.toUpperCase())) {
    return trimmed.toUpperCase();
  }

  for (const lang of ["en", "de", "fr", "it"]) {
    const code = isoCountries.getAlpha2Code(trimmed, lang);
    if (code) return code;
  }

  return null;
}

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
 * calls). Falls back to progressively smaller radii for small countries.
 * The exact point is never returned unblurred: if no in-country candidate can
 * be found at all (e.g. an unrecognized country code, or a micro-state where
 * even a ~100 m radius crosses the border every time), it falls back to a
 * plain, un-constrained blur rather than exposing the real location.
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
    [0.01, 0.1],
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

  // No in-country candidate at any radius (e.g. a micro-state): still blur,
  // just without the country constraint, so we never publish the exact spot.
  return blurLocation(lat, lng, minKm, maxKm);
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

type GeocodeResult = {
  lat: number;
  lng: number;
  displayName: string;
  countryCode: string | null;
};

async function queryNominatim(
  params: Record<string, string>,
): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
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

export async function geocodePlace(
  place: string,
  opts?: { countryCode?: string | null },
): Promise<GeocodeResult | null> {
  const query = place.trim();
  if (!query) return null;

  const params: Record<string, string> = { q: query };
  if (opts?.countryCode) params.countrycodes = opts.countryCode.toLowerCase();
  return queryNominatim(params);
}

/**
 * Geocode a structured postal address. Resolves the free-text country field
 * to an ISO code and restricts the search to that country, which avoids
 * cross-border mismatches (e.g. a Swiss postal code resolving to a
 * similarly-named place just across the German border).
 */
export async function geocodeAddress(address: {
  street?: string;
  postalCode: string;
  city: string;
  country: string;
}): Promise<GeocodeResult | null> {
  const countryCode = resolveCountryCode(address.country);

  const structuredParams: Record<string, string> = {
    postalcode: address.postalCode,
    city: address.city,
    country: address.country,
  };
  if (address.street) structuredParams.street = address.street;
  if (countryCode) structuredParams.countrycodes = countryCode.toLowerCase();

  const structured = await queryNominatim(structuredParams);
  if (structured) return structured;

  // Fall back to a free-text query, still restricted to the resolved country.
  const fallbackQuery = [address.street, address.postalCode, address.city, address.country]
    .filter(Boolean)
    .join(", ");
  return geocodePlace(fallbackQuery, { countryCode });
}
