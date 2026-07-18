import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { fill } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import { site } from "@/lib/site";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <hr className="rule mb-10" />
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-3">{dict.footer.eyebrow}</p>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              {dict.footer.blurb}
            </p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted md:items-end">
            {dict.nav.legal.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="hover:text-stamp"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stamp"
            >
              {dict.footer.instagram}
            </a>
          </div>
        </div>
        <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
          {fill(dict.footer.rights, { year: new Date().getFullYear() })}
        </p>
      </div>
      <div className="airmail-stripe" aria-hidden="true" />
    </footer>
  );
}
