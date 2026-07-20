import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { localePath } from "@/i18n/paths";
import { site } from "@/lib/site";
import { CollectorsMap } from "./CollectorsMap";
import { HeroMedia } from "./HeroMedia";
import { RegisterForm } from "./RegisterForm";
import { PostcardShop } from "./PostcardShop";

type OnePagerProps = {
  locale: Locale;
  dict: Dictionary;
};

export function OnePager({ locale, dict }: OnePagerProps) {
  const { home, about, impressions, postcard, map, register, collection } = dict;
  const [heroShot, ...gallery] = impressions.images;

  return (
    <>
      {/* 1 · Hero */}
      <section
        id="top"
        className="relative flex flex-col items-center px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-12 md:min-h-[calc(100vh-9rem)] md:px-10 md:pb-20 md:pt-16"
      >
        <p className="eyebrow fade-up mb-4">{home.eyebrow}</p>
        <h1 className="fade-up-delay max-w-3xl text-4xl tracking-tight text-ink sm:text-5xl md:text-7xl">
          {home.title}
        </h1>
        <p className="fade-up-delay-2 mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:mt-5 sm:max-w-xl sm:text-lg md:text-xl">
          {home.lead}
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-sm grid-cols-1 gap-8 sm:mt-10 md:mt-12 md:max-w-4xl md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-3">
            <HeroMedia
              fallbackSrc="/hero/postcard-hero.jpg"
              alt={home.mediaPostcardAlt}
            />
            <a
              href="#postcard"
              className="w-full rounded-full bg-stamp px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft sm:px-6 sm:py-4 sm:text-[0.78rem]"
            >
              {home.ctaPrimary}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <HeroMedia
              fallbackSrc="/hero/tiny-art-surprise.jpg"
              alt={home.mediaAutomatAlt}
            />
            <a
              href="#register"
              className="w-full rounded-full bg-stamp px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft sm:px-6 sm:py-4 sm:text-[0.78rem]"
            >
              {home.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* 2 · Map */}
      <section id="map" className="scroll-mt-24 border-t border-rule bg-paper-deep/40 px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-3 sm:mb-4">{map.eyebrow}</p>
          <h2 className="max-w-2xl text-3xl text-ink sm:text-4xl md:text-5xl">{map.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
            {map.intro}
          </p>

          <div className="mt-8 sm:mt-10">
            <CollectorsMap map={map} />
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#register"
              className="w-full rounded-full bg-stamp px-5 py-3.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft sm:w-auto sm:px-6"
            >
              {map.ctaRegister}
            </a>
            <a
              href="#postcard"
              className="w-full rounded-full bg-stamp px-5 py-3.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft sm:w-auto sm:px-6"
            >
              {map.ctaPostcard}
            </a>
          </div>
        </div>
      </section>

      {/* 3 · About BOXOHO + Sandrine */}
      <section id="about" className="scroll-mt-24 border-t border-rule px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-3 sm:mb-4">{about.eyebrow}</p>
          <h2 className="max-w-2xl text-3xl text-ink sm:text-4xl md:text-5xl">{about.title}</h2>

          <div className="mt-8 grid grid-cols-1 items-start gap-10 sm:mt-10 md:mt-12 md:grid-cols-2 md:gap-14">
            <div>
              <figure className="relative aspect-[3/4] w-full overflow-hidden bg-paper-deep">
                <Image
                  src="/sandrine.jpg"
                  alt={about.portraitAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </figure>
              <p className="eyebrow mt-5 mb-2">{about.creatorEyebrow}</p>
              <h3 className="text-xl text-ink sm:text-2xl">{about.creatorName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:mt-3 sm:text-base">
                {about.creatorBody}
              </p>
            </div>

            <div className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg md:pt-1">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Postcard product */}
      <section id="postcard" className="scroll-mt-24 border-t border-rule px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <PostcardShop locale={locale} postcard={postcard} />
      </section>

      {/* 4b · On site in Mürren */}
      <section id="onsite" className="scroll-mt-24 border-t border-rule px-6 py-7 md:px-10">
        <p className="mx-auto max-w-lg text-center text-sm leading-snug text-muted">
          {postcard.onSite.title} {postcard.onSite.body}
        </p>
      </section>

      {/* 5 · Art registration */}
      <section id="register" className="scroll-mt-24 border-t border-rule px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
          <figure className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-stamp/30 bg-paper-deep sm:max-w-md md:mx-0 md:sticky md:top-24 md:max-w-none">
            <Image
              src="/register.jpg"
              alt={register.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </figure>

          <div className="min-w-0">
            <p className="eyebrow mb-3 sm:mb-4">{register.eyebrow}</p>
            <h2 className="text-3xl text-ink sm:text-4xl md:text-5xl">{register.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft sm:mt-4 sm:text-lg">
              {register.intro}
            </p>
            <div className="mt-6 border-l-2 border-dashed border-stamp/40 pl-4 sm:mt-8">
              <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {register.benefitsLabel}
              </p>
              <ul className="space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
                {register.benefits.map((benefit) => (
                  <li key={benefit.title} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stamp/70" aria-hidden />
                    <span>
                      <span className="font-medium text-ink">{benefit.title}: </span>
                      {benefit.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 sm:mt-8">
              <RegisterForm register={register} ctaLabel={map.ctaRegister} />
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Collection teaser */}
      <section id="collection" className="scroll-mt-24 border-t border-rule px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-3 sm:mb-4">{collection.eyebrow}</p>
          <h2 className="max-w-2xl text-3xl text-ink sm:text-4xl md:text-5xl">{collection.teaserTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
            {collection.teaserBody}
          </p>
          <Link
            href={localePath(locale, "/collection")}
            className="mt-6 inline-block rounded-full bg-stamp px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft sm:mt-8 sm:px-8 sm:text-[0.78rem]"
          >
            {collection.teaserCta}
          </Link>
        </div>
      </section>

      {/* 7 · Impressions + Instagram */}
      <section id="impressions" className="scroll-mt-24 border-t border-rule px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-3 sm:mb-4">{impressions.eyebrow}</p>
          <h2 className="max-w-2xl text-3xl text-ink sm:text-4xl md:text-5xl">{impressions.title}</h2>
          <p className="mt-6 max-w-2xl font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted">
            {impressions.placeLabel}
          </p>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
            {impressions.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-[0.72rem] uppercase tracking-[0.14em] text-stamp underline-offset-4 hover:underline"
          >
            {impressions.instagramCta}
          </a>
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
    </>
  );
}
