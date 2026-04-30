"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutHero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-24">
      <div className="mx-auto w-full max-w-5xl text-center">
        <ScrollReveal direction="up" delay={0}>
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.4em] text-foreground/40">
            {"About Me"}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <h1 className="font-serif text-balance text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {"你好，我是流月"}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/60">
            {"来自重庆的高中生，喜欢待在安静的角落，感受缓慢流淌的时间。"}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={450}>
          <div className="mx-auto mt-12 h-px w-16 bg-foreground/20" />
        </ScrollReveal>
      </div>
    </section>
  );
}
