import React from "react"
interface PageShellProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="flex min-h-screen flex-col items-center px-6 pt-36 pb-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-16">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-foreground/60 sm:text-lg">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
