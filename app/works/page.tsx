import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { WorksGrid } from "@/components/works-grid";

export const metadata: Metadata = {
  title: "作品",
};

export default function WorksPage() {
  return (
    <PageShell title="作品" description="我的项目与创作。">
      <WorksGrid />
    </PageShell>
  );
}
