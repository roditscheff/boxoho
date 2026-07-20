"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary";
import type { ArtworkLookup } from "@/lib/types";

type RegisterFormProps = {
  register: Dictionary["register"];
  ctaLabel: string;
};

type Status = "idle" | "loading" | "success" | "error";

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export function RegisterForm({ register, ctaLabel }: RegisterFormProps) {
  const photoInputId = useId();
  const [number, setNumber] = useState("");
  const [artwork, setArtwork] = useState<ArtworkLookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [mapConsent, setMapConsent] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const previewCollector = isAnonymous
    ? register.anonymousCollector
    : firstName.trim() || register.previewNamePlaceholder;

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
    form.set("isAnonymous", isAnonymous ? "true" : "false");
    form.set("mapConsent", mapConsent ? "true" : "false");

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

  const fieldClass =
    "w-full border border-rule bg-transparent px-4 py-3 text-lg outline-none focus:border-stamp";
  const labelClass =
    "mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted";

  return (
    <div className="space-y-8">
      <form onSubmit={lookupArtwork} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="eyebrow mb-2">{register.step1}</legend>
          <label className="block">
            <span className={labelClass}>{register.numberLabel}</span>
            <input
              type="text"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={register.numberPlaceholder}
              className={`${fieldClass} text-ink transition-colors placeholder:text-muted/50`}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>{register.firstName}</span>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>{register.lastName}</span>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className={fieldClass}
                    />
                  </label>
                </div>
                <p className="text-sm text-muted">{register.firstNameHint}</p>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="mt-1 accent-[var(--stamp)]"
                  />
                  <span>{register.anonymousConsent}</span>
                </label>

                <label className="block">
                  <span className={labelClass}>{register.street}</span>
                  <input type="text" name="street" required className={fieldClass} />
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className={labelClass}>{register.postalCode}</span>
                    <input type="text" name="postalCode" required className={fieldClass} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className={labelClass}>{register.city}</span>
                    <input type="text" name="city" required className={fieldClass} />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>{register.country}</span>
                  <input type="text" name="country" required className={fieldClass} />
                </label>

                <label className="block">
                  <span className={labelClass}>{register.email}</span>
                  <input type="email" name="email" required className={fieldClass} />
                </label>

                <div>
                  <span className={labelClass}>{register.photo}</span>
                  <p className="mb-3 text-sm text-muted">{register.photoHint}</p>
                  <input
                    id={photoInputId}
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setPhotoName(file?.name ?? null);
                    }}
                  />
                  <label
                    htmlFor={photoInputId}
                    className="inline-flex cursor-pointer items-center gap-3 border border-rule px-4 py-3 font-mono text-[0.78rem] text-ink transition-colors hover:border-stamp hover:text-stamp"
                  >
                    <span>{photoName || register.chooseFile}</span>
                    <UploadIcon className="h-5 w-5 shrink-0" />
                  </label>
                </div>
              </fieldset>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <input
                  type="checkbox"
                  checked={mapConsent}
                  onChange={(e) => setMapConsent(e.target.checked)}
                  className="mt-1 accent-[var(--stamp)]"
                />
                <span>{register.mapConsent}</span>
              </label>

              <div className="rounded-2xl border border-stamp/30 bg-paper-deep/40 p-4 sm:p-5">
                <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  {register.previewLabel}
                </p>
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-paper-deep sm:h-28 sm:w-28">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title || artwork.number}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 self-end pb-1">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-stamp">
                      {artwork.number}
                    </p>
                    <p className="mt-2 text-sm text-ink sm:text-base">
                      {register.collectorPrefix} {previewCollector}
                    </p>
                    {mapConsent ? (
                      <p className="mt-1 text-xs text-muted">{register.previewMapNote}</p>
                    ) : null}
                  </div>
                </div>
              </div>

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
