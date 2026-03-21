import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { GitHubContributions } from "@/components/github-contributions";


export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="px-6 pb-20">
        <div className="mx-auto w-full max-w-5xl">
          <GitHubContributions />
        </div>
      </section>
    </>
  );
}