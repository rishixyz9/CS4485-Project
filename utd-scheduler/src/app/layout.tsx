"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

import AuthProvider, { useAuth } from "@hooks/AuthProvider";

import Navbar from "@components/NavBar";
import SideMenu from "@components/SideMenu";
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
            <AuthProvider>
              {children}
            </AuthProvider>
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
