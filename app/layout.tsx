import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const font = JetBrains_Mono({ subsets: ["latin"], weight: ["100", "200", "300"] });

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
      <body className={font.className}>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
