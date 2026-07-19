import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { site } from "@/lib/site";
import { CollectorsMap } from "./CollectorsMap";
import { HeroMedia } from "./HeroMedia";
import { RegisterForm } from "./RegisterForm";
import { SubscriptionCheckout } from "./SubscriptionCheckout";

type OnePagerProps = {
  locale: Locale;
  dict: Dictionary;
};

export function OnePager({ locale, dict }: OnePagerProps) {
  const { home, about, impressions, postcard, map, register } = dict;
  const [heroShot, ...gallery] = impressions.images;

  return (
    <>
      {/* 1 · Hero */}
      <section
        id="top"
        className="relative flex min-h-[calc(100vh-9rem)] flex-col items-center px-6 pb-20 pt-14 text-center md:px-10 md:pt-20"
      >
        <p className="eyebrow fade-up mb-5">{home.eyebrow}</p>
        <h1 className="fade-up-delay max-w-3xl text-5xl tracking-tight text-ink md:text-7xl">
          {home.title}
        </h1>
        <p className="fade-up-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
          {home.lead}
        </p>

        <div className="mx-auto mt-12 flex w-full max-w-md flex-col gap-8 md:mt-14">
          <div className="flex flex-col gap-4">
            <HeroMedia
              gifSrc="/hero/postcard.gif"
              fallbackSrc="/hero/postcard.png"
              alt={home.mediaPostcardAlt}
              label={home.mediaPostcardLabel}
            />
            <a
              href="#postcard"
              className="rounded-full bg-stamp px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft"
            >
              {home.ctaPrimary}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <HeroMedia
              gifSrc="/hero/automat.gif"
              fallbackSrc="/hero/automat.png"
              alt={home.mediaAutomatAlt}
              label={home.mediaAutomatLabel}
            />
            <a
              href="#register"
              className="rounded-full bg-stamp px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft"
            >
              {home.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* 2 · Map */}
      <section id="map" className="scroll-mt-24 border-t border-rule bg-paper-deep/40 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{map.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{map.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{map.intro}</p>

          <div className="mt-10">
            <CollectorsMap map={map} />
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#register"
              className="rounded-full bg-stamp px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft"
            >
              {map.ctaRegister}
            </a>
            <a
              href="#postcard"
              className="rounded-full bg-stamp px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-stamp-soft"
            >
              {map.ctaPostcard}
            </a>
          </div>
        </div>
      </section>

      {/* 3 · About BOXOHO + Sandrine */}
      <section id="about" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{about.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{about.title}</h2>

          <div className="mt-12 grid items-start gap-10 md:grid-cols-2 md:gap-14">
            <p className="text-lg leading-relaxed text-ink-soft">{about.body}</p>

            <div className="flex gap-5">
              <figure className="relative h-28 w-28 shrink-0 overflow-hidden bg-paper-deep sm:h-32 sm:w-32">
                <Image
                  src="/sandrine.jpg"
                  alt={about.portraitAlt}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </figure>
              <div>
                <p className="eyebrow mb-2">{about.creatorEyebrow}</p>
                <h3 className="text-2xl text-ink">{about.creatorName}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{about.creatorBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Postcard product */}
      <section id="postcard" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <figure className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-stamp/30 bg-paper-deep md:mx-0 md:sticky md:top-24 md:max-w-none">
            <Image
              src="/postcard-product.png"
              alt={postcard.productImageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </figure>

          <div className="min-w-0">
            <p className="eyebrow mb-4">{postcard.eyebrow}</p>
            <h2 className="text-4xl text-ink md:text-5xl">{postcard.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {postcard.intro}
            </p>

            <div className="mt-10">
              <SubscriptionCheckout locale={locale} postcard={postcard} />
            </div>
          </div>
        </div>
      </section>

      {/* 4b · On site in Mürren */}
      <section id="onsite" className="scroll-mt-24 border-t border-rule px-6 py-7 md:px-10">
        <p className="mx-auto max-w-lg text-center text-sm leading-snug text-muted">
          {postcard.onSite.title} {postcard.onSite.body}
        </p>
      </section>

      {/* 5 · Art registration */}
      <section id="register" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow mb-4">{register.eyebrow}</p>
          <h2 className="text-4xl text-ink md:text-5xl">{register.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{register.intro}</p>
          <div className="mt-8">
            <RegisterForm register={register} ctaLabel={map.ctaRegister} />
          </div>
        </div>
      </section>

      {/* 6 · Impressions + Instagram */}
      <section id="impressions" className="scroll-mt-24 border-t border-rule px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-4">{impressions.eyebrow}</p>
          <h2 className="max-w-2xl text-4xl text-ink md:text-5xl">{impressions.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {impressions.intro}
          </p>
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
