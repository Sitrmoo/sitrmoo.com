"use client";

import useSWR from "swr";

interface EventItem {
  id: number;
  content: string;
  created_at: string;
}

interface EventsData {
  ok: boolean;
  events: EventItem[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function formatTime(value: string): string {
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  const now = new Date();
  const sameYear = date.getFullYear() === now.getFullYear();
  const pad = (n: number) => String(n).padStart(2, "0");
  const base = `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return sameYear ? base : `${date.getFullYear()}-${base}`;
}

export function RecentEvents() {
  const { data, isLoading } = useSWR<EventsData>(
    "https://events.sitrmoo.com/api/events",
    fetcher,
    { revalidateOnFocus: false }
  );

  const events = [...(data?.events ?? [])]
    .sort(
      (a, b) =>
        new Date(b.created_at.replace(" ", "T")).getTime() -
        new Date(a.created_at.replace(" ", "T")).getTime()
    )
    .slice(0, 5);

  return (
    <div className="paper-card w-full p-5 sm:p-6">
      {isLoading ? (
        <div className="flex h-[120px] items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-primary" />
        </div>
      ) : events.length > 0 ? (
        <ul className="flex flex-col">
          {events.map((event, i) => (
            <li
              key={event.id}
              className={
                "flex items-start gap-4 py-3" +
                (i > 0 ? " border-t border-border/60" : "")
              }
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <p className="min-w-0 flex-1 text-sm leading-relaxed text-foreground/80">
                {event.content}
              </p>
              <time
                dateTime={event.created_at}
                className="shrink-0 font-mono text-xs text-foreground/40"
              >
                {formatTime(event.created_at)}
              </time>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-[120px] items-center justify-center text-sm text-foreground/40">
          暂无动态
        </div>
      )}
    </div>
  );
}
