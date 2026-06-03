import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "CanvasModels - AI Content Generation Platform",
    template: "%s | CanvasModels",
  },
  description:
    "Generate stunning AI images and videos with our credit-based marketplace. Powered by Flux, Kling, and more.",
  openGraph: {
    title: "CanvasModels - AI Content Generation Platform",
    description:
      "Generate stunning AI images and videos with our credit-based marketplace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased" style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
