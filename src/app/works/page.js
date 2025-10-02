import WorksClient from '@/components/WorksClient';
import worksData from '../../../public/works/data.json';

export const metadata = { 
  title: '作品', 
  description: '展示流月的部分作品与项目示例，包含项目说明、分类与阅读链接。' 
};

export default async function WorksPage() {
  // 直接使用导入的数据
  const data = worksData || [];

  return (
    <div className="works-page">
      <div className="page-header">
        <h1>我的作品</h1>
        <p>这里有一些我的作品，虽然数量不多，但每个项目都倾注了我的热情和努力。希望你能在这里找到灵感或乐趣！</p>
      </div>
      <WorksClient initialWorks={data} />
    </div>
  );
}