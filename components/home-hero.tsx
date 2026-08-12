import Image from "next/image";

export function HomeHero() {
  return (
    <section className="flex min-h-[88vh] flex-col items-center justify-center px-6 pt-28 pb-16">
      <div className="mx-auto w-full max-w-5xl">
        {/* 标题区 */}
        <div className="animate-fade-in-up relative mb-16 text-center sm:mb-20">
          {/* 标题两侧的点阵装饰 */}
          <div
            className="dot-pattern pointer-events-none absolute top-1/2 left-0 hidden h-16 w-24 -translate-y-1/2 opacity-40 [mask-image:linear-gradient(to_right,black,transparent)] sm:block"
            aria-hidden="true"
          />
          <div
            className="dot-pattern pointer-events-none absolute top-1/2 right-0 hidden h-16 w-24 -translate-y-1/2 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)] sm:block"
            aria-hidden="true"
          />

          <h1 className="font-serif text-balance text-6xl font-black tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
            流月
          </h1>
          <p className="mt-5 font-serif text-pretty text-base tracking-[0.35em] text-muted-foreground sm:text-lg">
            静水映长天
          </p>
        </div>

        {/* 细线分隔 + 编号标签 */}
        <div className="animate-fade-in-up animation-delay-200 mb-10 flex items-center gap-4">
          <span className="section-label shrink-0">
            <span className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
              01
            </span>
            自述
          </span>
          <span className="dotted-leader h-0.5 flex-1" aria-hidden="true" />
        </div>

        {/* 自述区 */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-col-reverse items-center gap-10 sm:gap-12 md:flex-row md:items-start md:justify-between">
          {/* 文字 */}
          <div className="max-w-md space-y-5 text-center md:text-left">
            <p className="leading-relaxed text-foreground/85 sm:text-lg">
              正如标题，可以叫我流月，或是 Sitrmoo。
            </p>

            <p className="leading-relaxed text-foreground/85 sm:text-lg">
              作为一个 Blogger，我乐于将所见所闻记录下，欢迎阅读我的{" "}
              <a
                href="/blog"
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                博客
              </a>{" "}
              文章或我的{" "}
              <a
                href="https://x.com/sitrmoo"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                X
              </a>{" "}
              Post。
            </p>
          </div>

          {/* 头像：细线框 + 点阵衬底 */}
          <div className="relative shrink-0">
            {/* 右下角点阵衬底 */}
            <div
              className="dot-pattern absolute -right-6 -bottom-6 h-28 w-28 opacity-50"
              aria-hidden="true"
            />
            <div className="group relative">
              <Image
                src="/avatar.jpg"
                alt="流月的头像"
                width={200}
                height={200}
                className="relative h-40 w-40 rounded-2xl border border-border object-cover grayscale-[0.4] transition-all duration-500 group-hover:grayscale-0 sm:h-48 sm:w-48"
                priority
              />
              {/* 角落定位标记 */}
              <span
                className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t border-l border-foreground/40"
                aria-hidden="true"
              />
              <span
                className="absolute -right-1.5 -bottom-1.5 h-3 w-3 border-r border-b border-foreground/40"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
