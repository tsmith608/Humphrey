import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CheckoutProvider } from "@/context/CheckoutContext";
import CheckoutModal from "@/components/CheckoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Humphrey | Premium Digital Storefront",
  description: "Experience digital excellence with Humphrey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500 selection:text-white`}
      >
        <CheckoutProvider>
          <Header />
          {children}
          <CheckoutModal />
        </CheckoutProvider>
      </body>
    </html>
  );
}
