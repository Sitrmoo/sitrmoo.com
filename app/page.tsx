import { HomeHero } from "@/components/home-hero";
import { GitHubContributions } from "@/components/github-contributions";
import { RecentEvents } from "@/components/recent-events";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <ScrollReveal direction="up" duration={700}>
            <div className="mb-6 flex items-center gap-4">
              <span className="section-label shrink-0">
                <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                  02
                </span>
                轨迹
              </span>
              <span className="dotted-leader h-0.5 flex-1" aria-hidden="true" />
            </div>
            <GitHubContributions />
          </ScrollReveal>
          <ScrollReveal direction="up" duration={700} delay={100}>
            <div className="mb-6 mt-12 flex items-center gap-4">
              <span className="section-label shrink-0">
                <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                  03
                </span>
                近日
              </span>
              <span className="dotted-leader h-0.5 flex-1" aria-hidden="true" />
            </div>
            <RecentEvents />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
