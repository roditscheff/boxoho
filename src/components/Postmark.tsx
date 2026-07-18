type PostmarkProps = {
  lines: readonly string[];
  className?: string;
};

export function Postmark({ lines, className = "" }: PostmarkProps) {
  return (
    <div
      className={`stamp-in flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-dashed border-stamp text-center text-stamp ${className}`}
      aria-hidden="true"
    >
      <p className="font-mono text-[0.68rem] leading-relaxed tracking-[0.12em] uppercase">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
