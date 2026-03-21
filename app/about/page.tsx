import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutTraits } from "@/components/about/about-traits";
import { AboutFavorites } from "@/components/about/about-favorites";
import { AboutMotto } from "@/components/about/about-motto";

export const metadata: Metadata = {
  title: "关于",
  description: "你好，我是流月，来自重庆的高中生，喜欢安静的角落和缓慢流淌的时间。",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutTraits />
      <AboutFavorites />
      <AboutMotto />
    </>
  );
}
