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
    default: "Sitrmoo",
    template: "%s - Sitrmoo",
  },
  description: "流月 - 来自重庆的高中生，喜欢宁静。在无人一隅，静候时间流淌。",
  keywords: ["流月", "Sitrmoo", "个人网站", "重庆"],
  authors: [{ name: "流月" }],
  openGraph: {
    title: "Sitrmoo - 流月",
    description: "我是流月，来自重庆。一名喜欢宁静的高中生，在无人一隅，静候时间流淌。",
    url: "https://sitrmoo.com",
    siteName: "Sitrmoo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sitrmoo",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sitrmoo',
    description: '流月是个人网站',
    images: ['/og.png'],
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
