import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import { GlassNavbar } from "@/components/glass-navbar";
import { GlassBackground } from "@/components/glass-background";
import { GlassFooter } from "@/components/glass-footer";

import "./globals.css";

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const _notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif-cn",
});

export const metadata: Metadata = {
  title: {
    default: "Cyrus Luo",
    template: "%s - Cyrus",
  },
  description: "流月 - 来自重庆的高中生，Vibe Cofing 爱好者。",
  keywords: ["流月", "Sitrmoo", "个人网站", "重庆"],
  authors: [{ name: "Cyrus Luo" }],
  openGraph: {
    title: "流月",
    description: "我是流月，来自重庆。一名喜欢宁静的高中生，喜欢阅读，不时写作。",
    url: "https://sitrmoo.com",
    siteName: "Cyrus Luo",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Cyrus's Profile",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sitrmoo',
    description: '流月的个人网站',
    images: ['/og.jpg'],
    creator: '@sitrmoo',
  },
  
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body
        className={`min-h-screen flex flex-col font-serif antialiased ${_geist.variable} ${_geistMono.variable} ${_notoSerifSC.variable}`}
      >
        <GlassBackground />
        <GlassNavbar />
        <main className="relative flex-1">{children}</main>
        <GlassFooter />
      </body>
    </html>
  );
}
