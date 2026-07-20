"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";

type NavItem = { href: string; label: string };

type MobileNavProps = {
  locale: Locale;
  items: NavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({
  locale,
  items,
  navLabel,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? closeLabel : openLabel}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-stamp/30 text-ink transition-colors hover:border-stamp hover:text-stamp"
      >
        <span
          className={`block h-[1.5px] w-4 bg-current transition-transform duration-200 ${
            open ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[1.5px] w-4 bg-current transition-transform duration-200 ${
            open ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {open ? (
        <nav
          id="mobile-nav-menu"
          aria-label={navLabel}
          className="absolute inset-x-0 top-full z-20 border-b border-rule bg-paper px-6 py-4 shadow-sm"
        >
          <ul className="flex flex-col gap-1 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-soft">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 transition-colors hover:bg-paper-deep hover:text-stamp"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
