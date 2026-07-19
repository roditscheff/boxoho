import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { isLocale, type Locale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";

type Props = { params: Promise<{ locale: string }> };

const INSTAGRAM_URL = "https://instagram.com/boxohoooo";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw).thanks;
  return { title: t.title };
}

export default async function ThanksPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale).thanks;
  const bodyParts = fill(t.body, { handle: "\0" }).split("\0");

  return (
    <PageShell title={t.title} intro={t.lead} centered>
      <div className="space-y-10 text-center">
        <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
          {bodyParts[0]}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stamp underline-offset-4 hover:underline"
          >
            {t.instagramHandle}
          </a>
          {bodyParts[1]}
        </p>
        <Link
          href={localePath(locale)}
          className="inline-block rounded-full bg-stamp px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft"
        >
          {t.homeCta}
        </Link>
      </div>
    </PageShell>
  );
}
