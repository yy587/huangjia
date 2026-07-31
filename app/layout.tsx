import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
