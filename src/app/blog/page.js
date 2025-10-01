import BlogClient from '@/components/BlogClient';

export const metadata = {
  title: '博客',
  description: '来自外部博客的最新文章聚合，展示流月的写作与想法。'
};

export default function BlogPage() {
  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>博客文章</h1>
        <p>来自 blog.786692.xyz 的最新内容</p>
      </div>

      <BlogClient />
    </div>
  );
}
    