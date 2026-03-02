"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

const favorites = [
  {
    title: "城市漫步",
    subtitle: "City Walk",
    description: "在街巷中漫步，感受山城的烟火气与层次感",
    image: "/about/city-walk.webp",
    imagePosition: "object-center" as const,
    span: "sm:col-span-2 sm:row-span-1" as const,
    height: "h-56 sm:h-64" as const,
  },
  {
    title: "哈利·波特",
    subtitle: "Harry Potter",
    description: "从小到大最喜欢的作品，魔法世界永远是心中的避风港",
    image: "/about/harry-potter.jpg",
    imagePosition: "object-center" as const,
    span: "sm:col-span-1 sm:row-span-1" as const,
    height: "h-56 sm:h-64 " as const,
  },
  {
    title: "机器人总动员",
    subtitle: "WALL-E",
    description: "一部关于孤独、希望与爱的故事",
    image: "/about/wall-e.jpg",
    imagePosition: "object-bottom" as const,
    span: "sm:col-span-1 sm:row-span-1" as const,
    height: "h-56 sm:h-96" as const,
  },
  {
    title: "听雨",
    subtitle: "Listen to Rain",
    description: "雨落窗檐，是最好的白噪音。适合发呆，适合思考",
    image: "/about/listen-rain.webp",
    imagePosition: "object-center" as const,
    span: "sm:col-span-1 sm:row-span-1" as const,
    height: "h-56 sm:h-96" as const,
  },
  
  {
    title: "三角洲行动",
    subtitle: "Delta Force",
    description: "娱乐与友谊",
    image: "/about/delta-force.webp",
    imagePosition: "object-center" as const,
    span: "sm:col-span-1 sm:row-span-1" as const,
    height: "h-56 sm:h-96" as const,
  },
];

export function AboutFavorites() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <ScrollReveal direction="up">
          <h2 className="font-serif text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"我喜欢的"}
          </h2>
          <p className="mt-3 text-foreground/50">
            {"这些是构成我日常的碎片。"}
          </p>
        </ScrollReveal>

        {/* Bento-style staggered grid */}
        <div className="mt-12 grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-3">
          {favorites.map((item, i) => (
            <ScrollReveal
              key={item.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 100}
              className={item.span}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md transition-all duration-500 hover:border-white/25 hover:bg-white/12">
                {/* Image */}
                <div className={cn("relative w-full overflow-hidden", item.height)}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700 group-hover:scale-105",
                      item.imagePosition
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-xs font-medium uppercase tracking-widest text-white/50">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
