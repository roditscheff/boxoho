"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import type { Plan } from "@/lib/stripe";
import { SubscriptionCheckout } from "./SubscriptionCheckout";

type PostcardShopProps = {
  locale: Locale;
  postcard: Dictionary["postcard"];
};

export function PostcardShop({ locale, postcard }: PostcardShopProps) {
  const [plan, setPlan] = useState<Plan>("monthly");

  const productMedia =
    plan === "newsletter"
      ? { src: "/newsletter-product.jpg", alt: postcard.newsletterImageAlt, key: "newsletter" }
      : plan === "yearly"
        ? { src: "/postcard-product-year.jpg", alt: postcard.yearImageAlt, key: "yearly" }
        : { src: "/postcard-product.jpg", alt: postcard.productImageAlt, key: "monthly" };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
      <figure className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-stamp/30 bg-paper-deep sm:max-w-md md:mx-0 md:sticky md:top-24 md:max-w-none">
        <Image
          key={productMedia.key}
          src={productMedia.src}
          alt={productMedia.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </figure>

      <div className="min-w-0">
        <p className="eyebrow mb-3 sm:mb-4">{postcard.eyebrow}</p>
        <h2 className="text-3xl text-ink sm:text-4xl md:text-5xl">{postcard.title}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
          {postcard.intro}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-4">
          {postcard.shippingNote}
        </p>

        <div className="mt-8 sm:mt-10">
          <SubscriptionCheckout
            locale={locale}
            postcard={postcard}
            plan={plan}
            onPlanChange={setPlan}
          />
        </div>
      </div>
    </div>
  );
}
