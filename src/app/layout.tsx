import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="paper-grain flex min-h-full flex-col font-serif text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
