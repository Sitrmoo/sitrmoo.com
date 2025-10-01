import WorksClient from '@/components/WorksClient';

export const metadata = { title: '作品', description: '展示流月的部分作品与项目示例，包含项目说明、分类与阅读链接。' };

// Server component: fetch works data on server and pass to client component
export default async function WorksPage() {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
    const res = await fetch(`${baseUrl}/works/data.json`, { next: { revalidate: 60 } });
    const data = res.ok ? await res.json() : [];

    return (
      <div className="works-page">
        <div className="page-header">
          <h1>我的作品</h1>
          <p>这里有一些我的作品，虽然数量不多，但每个项目都倾注了我的热情和努力。希望你能在这里找到灵感或乐趣！</p>
        </div>

        <WorksClient initialWorks={data} />
      </div>
    );
  } catch (err) {
    console.error('加载作品数据失败：', err);
    return (
      <div className="works-page">
        <div className="page-header">
          <h1>我的作品</h1>
        </div>
        <div className="no-works"><p>无法加载作品数据</p></div>
      </div>
    );
  }
}
    