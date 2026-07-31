import type { Metadata } from "next";
import { InquiryProvider } from "./components/InquiryProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import "./globals.css";
import "./catalog.css";

export const metadata: Metadata = {
  title: "SHIE Surfaces | Ceramic Tile & Building Materials",
  description:
    "Curated ceramic tile, slabs, mosaics, wall panels and bathroom systems for distributors and projects worldwide."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <InquiryProvider>{children}</InquiryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
