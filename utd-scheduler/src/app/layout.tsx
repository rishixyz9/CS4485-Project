"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,300,400&display=swap" rel="stylesheet"></link> */}
      <body className={inter.className + " bg-neutral-900"}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <main className="dark text-foreground bg-background">
              {children}
            </main>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
