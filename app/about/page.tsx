import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutTraits } from "@/components/about/about-traits";
import { AboutFavorites } from "@/components/about/about-favorites";
import { AboutMotto } from "@/components/about/about-motto";

export const metadata: Metadata = {
  title: "关于",
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
