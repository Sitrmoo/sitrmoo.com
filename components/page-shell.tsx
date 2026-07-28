import React from "react";

interface PageShellProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="flex min-h-screen flex-col items-center px-6 pt-32 pb-20 sm:pt-36">
      <div className="mx-auto w-full max-w-5xl">
        <div className="animate-fade-in-up mb-12 sm:mb-16">
          <h1 className="font-serif text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          {/* 标题下的虚线分隔 */}
          <div className="dotted-leader mt-8 h-0.5 w-full" aria-hidden="true" />
        </div>
        <div className="animate-fade-in-up animation-delay-200">{children}</div>
      </div>
    </section>
  );
}
