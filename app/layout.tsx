import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

const font = JetBrains_Mono({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Cryptoize",
  description: "Track your cryptocurrencies easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
