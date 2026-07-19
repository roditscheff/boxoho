"use client";

import { useEffect, useState } from "react";

type HeroMediaProps = {
  gifSrc: string;
  fallbackSrc: string;
  alt: string;
  label: string;
};

export function HeroMedia({ gifSrc, fallbackSrc, alt, label }: HeroMediaProps) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    let cancelled = false;
    void fetch(gifSrc, { method: "HEAD" }).then((res) => {
      if (!cancelled && res.ok) setSrc(gifSrc);
    });
    return () => {
      cancelled = true;
    };
  }, [gifSrc]);

  return (
    <figure className="fade-up-delay relative aspect-[3/4] overflow-hidden rounded-2xl bg-paper-deep shadow-[0_1px_0_0_var(--stamp)] sm:rounded-3xl">
      {/* eslint-disable-next-line @next/next/no-img-element -- GIF + runtime fallback */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => {
          if (src !== fallbackSrc) setSrc(fallbackSrc);
        }}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/35 to-transparent px-4 pb-4 pt-12 text-left font-serif text-base leading-snug text-paper sm:px-5 sm:pb-5 sm:pt-16 sm:text-lg md:text-xl">
        {label}
      </figcaption>
    </figure>
  );
}
