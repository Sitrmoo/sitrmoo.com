"use client";

import useSWR from "swr";
import { cn } from "@/lib/utils";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function getLevelClass(count: number): string {
  if (count === 0) return "bg-foreground/[0.06]";
  if (count <= 2) return "bg-primary/25";
  if (count <= 5) return "bg-primary/50";
  if (count <= 8) return "bg-primary/75";
  return "bg-primary";
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function GitHubContributions() {
  const { data, isLoading } = useSWR<ContributionData>(
    "/api/github/contributions",
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            width="18"
            height="18"
            className="text-foreground/70"
            fill="currentColor"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          <span className="text-sm font-medium text-foreground/70">
            <a href="https://github.com/gbhf0020" target="_blank" rel="noopener noreferrer">
              @gbhf0020
            </a>
          </span>
        </div>
        {data && (
          <span className="text-sm text-foreground/50">
            贡献了 {data.totalContributions} 次
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex h-[120px] items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-primary" />
        </div>
      ) : data?.weeks ? (
        <div className="overflow-x-auto">
          {/* Month labels */}
          <div className="mb-1.5 flex">
            <div className="w-[30px] shrink-0" />
            <div className="flex flex-1">
              {(() => {
                const labels: { label: string; col: number }[] = [];
                let lastMonth = -1;
                data.weeks.forEach((week, i) => {
                  if (week.contributionDays.length > 0) {
                    const month = new Date(
                      week.contributionDays[0].date
                    ).getMonth();
                    if (month !== lastMonth) {
                      labels.push({ label: MONTH_LABELS[month], col: i });
                      lastMonth = month;
                    }
                  }
                });
                return labels.map((l, i) => {
                  const nextCol = labels[i + 1]?.col ?? data.weeks.length;
                  const span = nextCol - l.col;
                  return (
                    <span
                      key={`${l.label}-${l.col}`}
                      className="text-xs text-foreground/40"
                      style={{
                        width: `${(span / data.weeks.length) * 100}%`,
                      }}
                    >
                      {l.label}
                    </span>
                  );
                });
              })()}
            </div>
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex w-[30px] shrink-0 flex-col gap-[3px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                <div
                  key={`day-${label}-${i}`}
                  className="flex h-[13px] items-center"
                >
                  <span className="text-[10px] leading-none text-foreground/40">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            <div className="flex flex-1 gap-[3px]">
              {data.weeks.map((week, wi) => (
                <div key={`week-${wi}`} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, di) => (
                    <div
                      key={`day-${wi}-${di}`}
                      className={cn(
                        "h-[13px] w-[13px] rounded-[3px] transition-colors",
                        getLevelClass(day.contributionCount)
                      )}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-end gap-1.5">
            <span className="text-[10px] text-foreground/40">Less</span>
            {[0, 1, 3, 6, 9].map((count) => (
              <div
                key={`legend-${count}`}
                className={cn(
                  "h-[11px] w-[11px] rounded-[2px]",
                  getLevelClass(count)
                )}
              />
            ))}
            <span className="text-[10px] text-foreground/40">More</span>
          </div>
        </div>
      ) : (
        <div className="flex h-[120px] items-center justify-center text-sm text-foreground/40">
          Failed to load contributions
        </div>
      )}
    </div>
  );
}
