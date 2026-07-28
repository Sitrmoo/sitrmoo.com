import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Work {
  title: string;
  description: string;
  tag: string;
  button: {
    text: string;
    url: string;
  };
  status?: string;
}

export function WorkCard({ work }: { work: Work }) {
  const isDimmed = !!work.status;

  return (
    <div
      className={cn(
        "paper-card group relative flex flex-col justify-between overflow-hidden p-6 transition-all duration-300",
        isDimmed
          ? "opacity-50 grayscale hover:opacity-70 hover:grayscale-[50%]"
          : "hover:border-foreground/25 hover:shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.1)]"
      )}
    >
      {/* Status badge */}
      {work.status && (
        <span className="absolute top-4 right-4 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-0.5 text-xs font-medium text-foreground/50">
          {work.status}
        </span>
      )}

      <div>
        {/* Tag */}
        <span className="mb-3 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {work.tag}
        </span>

        {/* Title & description */}
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {work.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
          {work.description}
        </p>
      </div>

      {/* Button */}
      <a
        href={isDimmed ? undefined : work.button.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
          isDimmed
            ? "cursor-not-allowed bg-foreground/5 text-foreground/30"
            : "bg-foreground/10 text-foreground hover:bg-foreground/15"
        )}
        aria-disabled={isDimmed}
      >
        {work.button.text}
        {!isDimmed && <ExternalLink size={14} />}
      </a>
    </div>
  );
}
