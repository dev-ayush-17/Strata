import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strata | Premium NFT Marketplace",
  description:
    "Experience the next generation of digital asset trading on Strata. Curated high-fidelity NFTs with institutional-grade security and seamless liquidity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-background antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
