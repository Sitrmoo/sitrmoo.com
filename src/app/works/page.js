import WorksClient from '@/components/WorksClient';

export const metadata = { 
  title: '作品', 
  description: '展示流月的部分作品与项目示例，包含项目说明、分类与阅读链接。' 
};

export default async function WorksPage() {
  try {
    // 在服务端组件中需要完整的 URL
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : `https://${process.env.VERCEL_URL}`;
    
    const res = await fetch(`${baseUrl}/works/data.json`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();

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
          <p>这里有一些我的作品，虽然数量不多，但每个项目都倾注了我的热情和努力。希望你能在这里找到灵感或乐趣！</p>
        </div>
        <div className="no-works">
          <p>暂时无法加载作品数据，请稍后重试</p>
        </div>
      </div>
    );
  }
}