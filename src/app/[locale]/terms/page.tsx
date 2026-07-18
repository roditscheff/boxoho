import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { isLocale } from "@/i18n/config";
import { fill, getDictionary } from "@/i18n/dictionary";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return { title: getDictionary(raw).terms.title.replace(/\.$/, "") };
}

export default async function TermsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const t = getDictionary(raw).terms;
  const values = { address: site.address, uid: site.uid, email: site.email };

  return (
    <PageShell eyebrow={t.eyebrow} title={t.title}>
      <div className="max-w-2xl space-y-10 text-[1.05rem] leading-relaxed text-ink-soft">
        <p>{fill(t.provider, values)}</p>
        {t.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-2xl text-ink">{section.title}</h2>
            <p>{fill(section.body, values)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
