import type { Metadata } from "next";
import { InquiryProvider } from "./components/InquiryProvider";
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
        <InquiryProvider>{children}</InquiryProvider>
      </body>
    </html>
  );
}
