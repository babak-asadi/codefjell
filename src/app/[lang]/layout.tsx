import type { Metadata } from "next";
import "../globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";

export const metadata: Metadata = {
  title: "Codefjell",
  description: "Expert IT consulting for the modern world.",
  icons: { icon: "/apple-touch-icon.png" },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "no" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
