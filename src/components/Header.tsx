import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        <Link
          href={localePath(locale)}
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={720}
            height={359}
            className="h-11 w-auto md:h-12"
            priority
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav
            aria-label={dict.nav.main}
            className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft lg:flex"
          >
            {dict.nav.items.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="border-b border-transparent pb-0.5 transition-colors hover:border-stamp hover:text-stamp"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} labels={dict.lang} />
          <MobileNav
            locale={locale}
            items={dict.nav.items}
            navLabel={dict.nav.mobile}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
          />
        </div>
      </div>
      <hr className="rule mx-auto max-w-5xl" />
    </header>
  );
}
