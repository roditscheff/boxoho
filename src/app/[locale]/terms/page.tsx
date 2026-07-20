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
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
          {t.stand}
        </p>
        <p>{fill(t.provider, values)}</p>
        {t.sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl text-ink">{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={`${section.title}-p-${i}`}>{fill(paragraph, values)}</p>
            ))}
            {"list" in section && section.list ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.list.map((item, i) => (
                  <li key={`${section.title}-li-${i}`}>{fill(item, values)}</li>
                ))}
              </ul>
            ) : null}
            {"after" in section && section.after
              ? section.after.map((paragraph, i) => (
                  <p key={`${section.title}-a-${i}`}>{fill(paragraph, values)}</p>
                ))
              : null}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
