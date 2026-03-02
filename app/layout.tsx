import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { GlassNavbar } from "@/components/glass-navbar";
import { GlassBackground } from "@/components/glass-background";
import { GlassFooter } from "@/components/glass-footer";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif-cn",
});

export const metadata: Metadata = {
  title: {
    default: "流月",
    template: "%s - 流月",
  },
  description: "静水映长天",
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`min-h-screen flex flex-col font-sans antialiased ${_notoSerifSC.variable}`}>
        <GlassBackground />
        <GlassNavbar />
        <main className="relative flex-1">{children}</main>
        <GlassFooter />
      </body>
    </html>
  );
}
