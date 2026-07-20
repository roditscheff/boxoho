"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import {
  collectorDisplayName,
  type CollectionPiece,
} from "@/lib/collection";

type CollectionFeaturedProps = {
  collection: Dictionary["collection"];
};

export function CollectionFeatured({ collection }: CollectionFeaturedProps) {
  const [featured, setFeatured] = useState<CollectionPiece[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setFeatured(data.featured ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="mt-8 text-sm text-muted">{collection.loading}</p>;
  }

  if (!featured.length) {
    return (
      <p className="mt-8 text-sm text-muted">{collection.featuredEmpty}</p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
      {featured.map((piece) => {
        const name = collectorDisplayName(
          piece.registered,
          piece.isAnonymous,
          piece.collectorName,
          {
            notRegistered: collection.notRegistered,
            anonymousCollector: collection.anonymousCollector,
          },
        );
        const statusLabel = piece.registered
          ? `${collection.collectorPrefix} ${name}`
          : collection.notRegistered;

        return (
          <article
            key={`${piece.year}-${piece.month}-${piece.day}-${piece.number || "x"}`}
            className="overflow-hidden rounded-2xl border border-stamp/30 bg-paper-deep"
          >
            <div className="relative aspect-square">
              {piece.imageUrl ? (
                <Image
                  src={piece.imageUrl}
                  alt={piece.title || piece.number || `${collection.dayLabel} ${piece.day}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-paper px-2 text-center text-sm text-muted">
                  {collection.placeholder}
                </div>
              )}
            </div>
            <div className="space-y-1 px-2.5 py-2.5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-stamp">
                {piece.number || `${collection.dayLabel} ${piece.day}`}
              </p>
              <p className="text-xs leading-snug text-ink">{statusLabel}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
