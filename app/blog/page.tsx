import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "博客",
};

export default function BlogPage() {
  return (
    <PageShell title="博客" description="我的文章与想法。">
      <BlogList />
    </PageShell>
  );
}
