"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import type { ArtworkLookup } from "@/lib/types";

type RegisterFormProps = {
  register: Dictionary["register"];
  ctaLabel: string;
};

type Status = "idle" | "loading" | "success" | "error";

export function RegisterForm({ register, ctaLabel }: RegisterFormProps) {
  const [number, setNumber] = useState("");
  const [artwork, setArtwork] = useState<ArtworkLookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function lookupArtwork(event: React.FormEvent) {
    event.preventDefault();
    setLookupError(null);
    setArtwork(null);
    setMessage(null);
    setStatus("loading");

    const res = await fetch(`/api/artworks/${encodeURIComponent(number.trim())}`);
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
      setLookupError(data.error || register.errors.notFound);
      return;
    }

    setArtwork(data as ArtworkLookup);
    setStatus("idle");
  }

  async function submitRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!artwork || artwork.alreadyRegistered) return;

    setStatus("loading");
    setMessage(null);
    const form = new FormData(event.currentTarget);
    form.set("number", artwork.number);

    const res = await fetch("/api/registrations", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
      setMessage(data.error || register.errors.generic);
      return;
    }

    setStatus("success");
    setMessage(register.success);
    setArtwork({ ...artwork, alreadyRegistered: true });
  }

  return (
    <div className="space-y-8">
      <form onSubmit={lookupArtwork} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="eyebrow mb-2">{register.step1}</legend>
          <label className="block">
            <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              {register.numberLabel}
            </span>
            <input
              type="text"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={register.numberPlaceholder}
              className="w-full border border-rule bg-transparent px-4 py-3 text-lg text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-stamp"
              required
            />
          </label>
          <p className="text-sm text-muted">{register.numberHint}</p>
          <button
            type="submit"
            className="border border-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {register.lookupCta}
          </button>
        </fieldset>
      </form>

      {lookupError ? <p className="text-sm text-stamp">{lookupError}</p> : null}

      {artwork ? (
        <div className="space-y-6 border-t border-rule pt-8">
          <div className="flex gap-5">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-paper-deep">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title || artwork.number}
                fill
                className="object-cover"
                sizes="112px"
                unoptimized
              />
            </div>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-stamp">
                {artwork.number}
              </p>
              {artwork.title ? (
                <p className="mt-2 text-xl text-ink">{artwork.title}</p>
              ) : null}
              {artwork.alreadyRegistered ? (
                <p className="mt-2 text-sm text-muted">{register.alreadyRegistered}</p>
              ) : null}
            </div>
          </div>

          {!artwork.alreadyRegistered ? (
            <form onSubmit={submitRegistration} className="space-y-4">
              <fieldset className="space-y-4">
                <legend className="eyebrow mb-2">{register.step2}</legend>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                    {register.firstName}
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                    {register.email}
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                    {register.place}
                  </span>
                  <input
                    type="text"
                    name="place"
                    placeholder={register.placePlaceholder}
                    required
                    className="w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                    {register.photo}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-full border border-rule bg-transparent px-4 py-3 font-mono text-sm outline-none"
                  />
                </label>
              </fieldset>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <input
                  type="checkbox"
                  name="mapConsent"
                  value="true"
                  className="mt-1 accent-[var(--stamp)]"
                />
                <span>{register.mapConsent}</span>
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-ink px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
              >
                {status === "loading" ? register.submitting : ctaLabel}
              </button>
            </form>
          ) : null}
        </div>
      ) : null}

      {message ? (
        <p className={`text-sm ${status === "success" ? "text-ink-soft" : "text-stamp"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
