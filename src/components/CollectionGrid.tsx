"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import { collectorDisplayName, type CollectionPiece } from "@/lib/collection";

type MonthBlock = {
  year: number;
  month: number;
  collectionName?: string;
  pieces: CollectionPiece[];
};

type CollectionGridProps = {
  collection: Dictionary["collection"];
};

const MONTH_NAMES_EN = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAMES_DE = [
  "",
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export function CollectionGrid({ collection }: CollectionGridProps) {
  const [months, setMonths] = useState<MonthBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const monthNames = collection.monthNames === "de" ? MONTH_NAMES_DE : MONTH_NAMES_EN;

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setMonths(data.months ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-muted">{collection.loading}</p>;
  }

  return (
    <div className="space-y-14">
      {months.map((block) => (
        <section key={`${block.year}-${block.month}-${block.collectionName || "all"}`}>
          <h2 className="text-2xl text-ink sm:text-3xl">
            {block.collectionName
              ? `${block.collectionName} · ${monthNames[block.month]} ${block.year}`
              : `${monthNames[block.month]} ${block.year}`}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {collection.daysCount.replace("{count}", String(block.pieces.length))}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {block.pieces.map((piece) => {
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
                  key={`${block.year}-${block.month}-${piece.day}`}
                  className="overflow-hidden rounded-2xl border border-stamp/30 bg-paper-deep"
                >
                  <div className="relative aspect-square">
                    {piece.imageUrl ? (
                      <Image
                        src={piece.imageUrl}
                        alt={piece.title || piece.number || `Day ${piece.day}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 20vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-paper to-paper-deep px-3 text-center">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                          {collection.dayLabel} {piece.day}
                        </span>
                        <span className="mt-2 text-sm text-ink-soft">{collection.placeholder}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 px-3 py-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-stamp">
                      {piece.number || `${collection.dayLabel} ${piece.day}`}
                    </p>
                    <p className="text-sm leading-snug text-ink">{statusLabel}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
