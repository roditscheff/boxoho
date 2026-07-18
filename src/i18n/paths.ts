import type { Locale } from "./config";

export function localePath(locale: Locale, path = "/"): string {
  if (path.startsWith("#")) {
    return `/${locale}${path}`;
  }
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function switchLocalePath(
  pathname: string,
  nextLocale: Locale,
  hash = "",
): string {
  const segments = pathname.split("/");
  if (segments.length > 1) {
    segments[1] = nextLocale;
    const base = segments.join("/") || `/${nextLocale}`;
    return `${base}${hash}`;
  }
  return `/${nextLocale}${hash}`;
}
