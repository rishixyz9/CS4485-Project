"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

import Navbar from "@/app/components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-neutral-900"}>
        <NextUIProvider>
          <main className="dark text-foreground bg-background min-h-screen">
            <Navbar />
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
