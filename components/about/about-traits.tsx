"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { MapPin, GraduationCap, Code, Moon } from "lucide-react";

const traits = [
  {
    icon: MapPin,
    label: "所在地",
    value: "中国，重庆",
  },
  {
    icon: GraduationCap,
    label: "身份",
    value: "高中生",
  },
  {
    icon: Code,
    label: "热爱",
    value: "设计",
  },
  {
    icon: Moon,
    label: "性格",
    value: "云淡风轻",
  },
];

export function AboutTraits() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <ScrollReveal direction="up">
          <h2 className="font-serif text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"基本信息"}
          </h2>
          <p className="mt-3 text-foreground/50">{"关于我的一些基本信息。"}</p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((trait, i) => (
            <ScrollReveal key={trait.label} direction="up" delay={i * 100}>
              <div className="group rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/12">
                <trait.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="text-xs font-medium uppercase tracking-widest text-foreground/40">
                  {trait.label}
                </p>
                <p className="mt-1.5 text-lg font-semibold text-foreground">
                  {trait.value}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
