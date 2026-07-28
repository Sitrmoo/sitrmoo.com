import { Inbox } from "lucide-react";
import worksData from "@/data/works.json";
import { WorkCard, type Work } from "@/components/work-card";

export function WorksGrid() {
  const works: Work[] = worksData;

  if (works.length === 0) {
    return (
      <div className="paper-card flex flex-col items-center justify-center gap-4 py-24">
        <Inbox size={48} className="text-foreground/20" />
        <p className="text-lg text-foreground/40">还没有作品</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {works.map((work) => (
        <WorkCard key={work.title} work={work} />
      ))}
    </div>
  );
}
