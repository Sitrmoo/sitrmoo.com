import BackToWorks from '@/components/BackToWorks';

export const metadata = {
  title: 'LunaVerse',
  description: 'Typora 主题 “LunaVerse” 的展示页面。',
};

export default function LunaVersePage() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <header className="page-header">
          <h1>Luna<span>V</span>erse</h1>
          <p className="subtitle">Typora 主题展示</p>
          <BackToWorks />
        </header>

        <section className="preview-section">
        <div className="card">
          <h2>主题概览</h2>
          <p>淡蓝色主色调，清新简洁，让长时间阅读更舒适。</p>
          <p>支持中英文混排，落霞孤鹜文楷优化中文显示，Inter 优化英文排版。</p>
        </div>

        <div className="card">
          <h2>代码块效果</h2>
          <pre>
{`/* 示例 CSS */
body {
  font-family: 'Inter', 'LXGW WenKai', sans-serif;
  background-color: #E0EBFF;
  color: #1C1F26;
}

#sidebar {
  background-color: #C0D4F0;
}`}
          </pre>
        </div>

        <div className="card">
          <h2>特色功能</h2>
          <ul>
            <li>界面清新</li>
            <li>侧边栏和弹窗背景统一色调</li>
            <li>代码块深背景+JetBrains Mono字体</li>
          </ul>
        </div>
        </section>

      </div>

      <style>{`
        .page-container {
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'LXGW WenKai', 'Inter', sans-serif;
          color: #1C1F26;
        }

        .content-wrapper {
          max-width: 720px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-header h1 {
          font-size: 2.8rem;
          font-weight: 800;
          background: linear-gradient(90deg, #4A90FF, #7ABFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .page-header h1 span {
          text-transform: uppercase;
          color: #4A90FF;
          -webkit-text-fill-color: #4A90FF;
          background: none;
        }

        .subtitle {
          font-size: 1.05rem;
          color: #64748B;
          margin-top: 6px;
        }

        .preview-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .card {
          background-color: #F9FAFB;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .card h2 {
          margin-top: 0;
          color: #4A90FF;
          font-size: 1.25rem;
          margin-bottom: 12px;
        }

        .card p, .card ul {
          margin: 0 0 10px;
          line-height: 1.6;
        }

        .card pre {
          background-color: #e0ebff;
          color: #4f5650;
          padding: 16px;
          border-radius: 6px;
          overflow-x: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
        }

        ul {
          padding-left: 18px;
        }

        li {
          margin-bottom: 6px;
        }

        @media (max-width: 640px) {
          .page-container { padding: 40px 16px; }
          .page-header h1 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}
