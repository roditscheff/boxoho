"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { switchLocalePath } from "@/i18n/paths";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: Dictionary["lang"];
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div
      className="flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]"
      role="navigation"
      aria-label={labels.label}
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 ? <span className="text-rule">/</span> : null}
          <Link
            href={switchLocalePath(pathname, code, hash)}
            hrefLang={code}
            className={
              code === locale
                ? "text-stamp"
                : "text-muted transition-colors hover:text-stamp"
            }
            aria-current={code === locale ? "true" : undefined}
          >
            {code === "en" ? labels.en : labels.de}
          </Link>
        </span>
      ))}
    </div>
  );
}
