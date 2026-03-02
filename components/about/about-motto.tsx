"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function AboutMotto() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto w-full max-w-5xl text-center">
        <ScrollReveal direction="up">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-foreground/40">
            {"就是这样"}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <blockquote className="mx-auto mt-8 max-w-2xl">
            <p className="font-serif text-balance text-3xl font-bold leading-snug tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {"无需多言，"}
              <br />
              {"不必多言"}
            </p>
          </blockquote>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="mx-auto mt-10 h-px w-16 bg-foreground/20" />
        </ScrollReveal>
      </div>
    </section>
  );
}
