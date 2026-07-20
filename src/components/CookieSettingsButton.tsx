"use client";

import { openConsentSettings } from "@/lib/consent";

type CookieSettingsButtonProps = {
  label: string;
  className?: string;
};

export function CookieSettingsButton({ label, className }: CookieSettingsButtonProps) {
  return (
    <button type="button" className={className} onClick={() => openConsentSettings()}>
      {label}
    </button>
  );
}
