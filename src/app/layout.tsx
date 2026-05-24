import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sotej Bazaar - Premium Organic Farm-to-Table E-Commerce",
  description: "Experience the pure, natural taste of handpicked premium organic fruits, vegetables, dairy, eggs, and groceries. Locally sourced and fresh.",
};

import MainContent from "@/components/MainContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
            <div className="app-layout">
              <Suspense fallback={<div className="site-header" />}>
                <Header />
              </Suspense>
              <MainContent>
                {children}
              </MainContent>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
