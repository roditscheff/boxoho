import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/CollectionGrid";
import { PageShell } from "@/components/PageShell";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw).collection;
  return { title: t.title, description: t.intro };
}

export default async function CollectionPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale).collection;

  return (
    <PageShell eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <CollectionGrid collection={t} />
    </PageShell>
  );
}
