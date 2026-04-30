import Image from "next/image";

export function HomeHero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center px-6">
      <div className="mx-auto w-full max-w-5xl">
        {/* Title area */}
        <div className="mb-20 text-center">
          <h1 className="font-serif text-balance text-7xl font-black tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
            流月
          </h1>
          <p className="mt-4 font-serif text-pretty text-lg tracking-[0.3em] text-foreground/50 sm:text-xl">
            静水映长天
          </p>
        </div>

        {/* Intro section */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* Text */}
          <div className="max-w-md space-y-6">
            <p className="text-lg leading-relaxed text-foreground/80">
              {"我是流月，来自重庆。"}
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              {"一名喜欢宁静的高中生，在无人一隅，静候时间流淌。"}
            </p>
          </div>

          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="absolute -inset-2 rounded-full bg-primary/20 blur-xl" />
              <Image
                src="/avatar.jpg"
                alt="流月的头像"
                width={200}
                height={200}
                className="relative h-48 w-48 rounded-full border-2 border-white/30 object-cover shadow-2xl sm:h-56 sm:w-56"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
