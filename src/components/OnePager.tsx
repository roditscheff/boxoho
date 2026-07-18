import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import { site } from "@/lib/site";
import { CollectorsMap } from "./CollectorsMap";
import { RegisterForm } from "./RegisterForm";
import { SubscriptionCheckout } from "./SubscriptionCheckout";

type OnePagerProps = {
  locale: Locale;
  dict: Dictionary;
};

export function OnePager({ locale, dict }: OnePagerProps) {
  const { home, offers, story, impressions, creator, artworkDeep, postcard, map, register } =
    dict;
  const [heroShot, ...gallery] = impressions.images;

  return (
    <>
      {/* 1 · Hero */}
      <section
        id="top"
        className="relative flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center px-6 py-16 text-center md:px-10"
      >
        <p className="eyebrow fade-up mb-6">{home.eyebrow}</p>
        <h1 className="fade-up-delay text-6xl tracking-tight text-ink md:text-8xl">
          {home.title}
        </h1>
        <p className="fade-up-delay-2 mx-auto mt-6 max-w-xl text-xl leading-relaxed text-ink-soft md:text-2xl">
          {home.lead}
        </p>
        <div className="fade-up-delay-2 mt-12 flex flex-wrap items-center justify-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
          <a
            href="#offers"
            className="border border-ink px-5 py-3 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {home.ctaPrimary}
          </a>
          <a
            href="#register"
            className="border border-transparent px-5 py-3 text-stamp underline-offset-4 hover:underline"
          >
            {home.ctaSecondary}
          </a>
        </div>
      </section>

      {/* 2 · Both offers short */}
      <section id="offers" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{offers.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{offers.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{offers.intro}</p>

          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <article>
              <p className="eyebrow mb-3">{offers.art.eyebrow}</p>
              <h3 className="text-3xl text-ink">{offers.art.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{offers.art.summary}</p>
              <a
                href="#artwork"
                className="mt-6 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stamp underline-offset-4 hover:underline"
              >
                {offers.art.cta} →
              </a>
            </article>
            <article>
              <p className="eyebrow mb-3">{offers.postcard.eyebrow}</p>
              <h3 className="text-3xl text-ink">{offers.postcard.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{offers.postcard.summary}</p>
              <a
                href="#postcard"
                className="mt-6 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stamp underline-offset-4 hover:underline"
              >
                {offers.postcard.cta} →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 3 · Story */}
      <section id="story" className="scroll-mt-24 border-t border-rule bg-paper-deep/40 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{story.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{story.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{story.intro}</p>
          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-ink-soft">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Impressions */}
      <section id="impressions" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{impressions.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{impressions.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {impressions.intro}
          </p>
        </div>

        <figure className="relative mx-auto mt-12 aspect-[16/10] max-w-5xl overflow-hidden bg-paper-deep">
          <Image
            src={heroShot.src}
            alt={heroShot.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority={false}
          />
        </figure>

        <div className="mx-auto mt-3 grid max-w-5xl gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {gallery.map((image) => (
            <figure
              key={image.src}
              className="relative aspect-[3/4] overflow-hidden bg-paper-deep"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section id="creator" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
            <figure className="relative aspect-[3/4] overflow-hidden bg-paper-deep md:sticky md:top-24">
              <Image
                src="/sandrine.jpg"
                alt={creator.portraitAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={false}
              />
            </figure>
            <div>
              <p className="eyebrow mb-4">{creator.eyebrow}</p>
              <h2 className="text-4xl text-ink md:text-5xl">{creator.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{creator.intro}</p>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
                {creator.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-2 md:gap-4">
            <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image
                src="/artwork-open.png"
                alt={creator.altOpen}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
            <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image
                src="/artwork-box.png"
                alt={creator.altBox}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
          </div>
          <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
            {creator.photoNote}
          </p>
        </div>
      </section>

      {/* 4a · Artwork deep */}
      <section id="artwork" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{artworkDeep.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{artworkDeep.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {artworkDeep.intro}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{artworkDeep.body}</p>
          <ul className="mt-8 max-w-xl space-y-3 text-ink-soft">
            {artworkDeep.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#register"
            className="mt-10 inline-block border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {artworkDeep.cta}
          </a>
        </div>
      </section>

      {/* 4b · Postcard deep */}
      <section id="postcard" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{postcard.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{postcard.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{postcard.intro}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">{postcard.body}</p>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <article className="border-t border-rule pt-6">
              <p className="eyebrow mb-2">{postcard.subscription.eyebrow}</p>
              <h3 className="text-2xl text-ink md:text-3xl">{postcard.subscription.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{postcard.subscription.body}</p>
              <ul className="mt-6 space-y-2 text-ink-soft">
                {postcard.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <SubscriptionCheckout locale={locale} postcard={postcard} />
              </div>
            </article>

            <article className="border-t border-rule pt-6">
              <p className="eyebrow mb-2">{postcard.shop.eyebrow}</p>
              <h3 className="text-2xl text-ink md:text-3xl">{postcard.shop.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{postcard.shop.body}</p>
              {site.shopUrl ? (
                <a
                  href={site.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {postcard.shop.cta}
                </a>
              ) : (
                <p className="mt-8 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stamp">
                  {postcard.shop.ctaSoon}
                </p>
              )}
            </article>
          </div>

          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-muted">{postcard.onSiteNote}</p>

          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
            {postcard.note}{" "}
            <Link href={localePath(locale, "/terms")} className="text-stamp hover:underline">
              {postcard.termsLink}
            </Link>
          </p>
        </div>
      </section>

      {/* 5–6 · Map + Register */}
      <section id="map" className="scroll-mt-24 border-t border-rule bg-paper-deep/40 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{map.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{map.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{map.intro}</p>

          <div className="mt-10">
            <CollectorsMap map={map} />
          </div>

          <div id="register" className="scroll-mt-24 mt-16 max-w-xl border-t border-rule pt-12">
            <p className="eyebrow mb-4">{register.eyebrow}</p>
            <h3 className="text-3xl text-ink md:text-4xl">{register.title}</h3>
            <p className="mt-4 leading-relaxed text-ink-soft">{register.intro}</p>
            <div className="mt-8">
              <RegisterForm register={register} ctaLabel={map.ctaRegister} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
