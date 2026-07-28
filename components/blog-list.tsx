"use client";

import useSWR from "swr";
import { Rss, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RssItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function formatDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return "";
  }
}

export function BlogList() {
  const { data, isLoading } = useSWR<{ items: RssItem[] }>(
    "/api/blog/rss",
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/40" />
      </div>
    );
  }

  const items = data?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="paper-card flex flex-col items-center justify-center gap-4 py-20">
        <Rss className="h-10 w-10 text-foreground/20" />
        <p className="text-foreground/40">{"暂时没有博客文章"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <a
          key={`${item.link}-${i}`}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "paper-card group flex items-start justify-between gap-4 px-5 py-4 transition-all duration-300 sm:px-6 sm:py-5",
            "hover:border-foreground/25 hover:shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_-12px_rgba(0,0,0,0.1)]",
          )}
        >
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground">
              <span className="truncate">{item.title}</span>
            </h3>
            {item.description && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-foreground/50">
                {item.description}
              </p>
            )}
          </div>
          <time className="shrink-0 pt-0.5 text-sm tabular-nums text-foreground/35">
            {formatDate(item.pubDate)}
          </time>
        </a>
      ))}
    </div>
  );
}
