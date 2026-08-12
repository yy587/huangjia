import type { Metadata } from "next";
import { InquiryProvider } from "./components/InquiryProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import "./globals.css";
import "./catalog.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yy587.github.io/huangjia/"),
  title: "SHIE Surfaces | Ceramic Tile & Building Materials",
  description:
    "Curated ceramic tile, slabs, mosaics, wall panels and bathroom systems for distributors and projects worldwide.",
  openGraph: {
    type: "website",
    siteName: "SHIE Surfaces",
    title: "SHIE Surfaces | Ceramic Tile & Building Materials",
    description: "Building materials for international distributors, project buyers and wholesale enquiries."
  }
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
