import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { content, type Locale } from "@/lib/content";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pachamamaceremonias.com"),
  icons: { icon: "/favicon.svg" },
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") notFound();

  return (
    <html lang={locale}>
      <body data-site-language={content[locale as Locale].langName}>{children}</body>
    </html>
  );
}
