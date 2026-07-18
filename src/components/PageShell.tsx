import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  centered?: boolean;
};

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
  centered = false,
}: PageShellProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
      <header className={`mb-12 max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
        {eyebrow ? <p className="eyebrow mb-4 fade-up">{eyebrow}</p> : null}
        <h1 className="fade-up-delay text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
        {intro ? (
          <p className="fade-up-delay-2 mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">
            {intro}
          </p>
        ) : null}
      </header>
      <div className={centered ? "mx-auto max-w-2xl" : ""}>{children}</div>
    </div>
  );
}
