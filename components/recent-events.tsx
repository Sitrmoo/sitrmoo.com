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

const TIME_ZONE = "Asia/Shanghai";

function parseTime(value: string): Date {
  return new Date(
    value.includes("Z") || value.includes("+")
      ? value
      : `${value.replace(" ", "T")}Z`
  );
}

function formatTime(value: string): string {
  const date = parseTime(value);
  if (Number.isNaN(date.getTime())) return value;

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const now = new Date();
  const sameYear =
    Number(get("year")) ===
    Number(
      new Intl.DateTimeFormat("en", { timeZone: TIME_ZONE, year: "numeric" })
        .formatToParts(now)
        .find((p) => p.type === "year")?.value
    );
  const base = `${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
  return sameYear ? base : `${get("year")}-${base}`;
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
        new Date(parseTime(b.created_at)).getTime() -
        new Date(parseTime(a.created_at)).getTime()
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
                dateTime={parseTime(event.created_at).toISOString()}
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
