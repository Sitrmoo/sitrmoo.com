import BackToWorks from '@/components/BackToWorks';

export const metadata = {
  title: '二十二年后的山茶',
  description: '作品页面：《二十二年后的山茶》介绍与展示。',
};

export default function ShanchaPage() {
  return (
    <div className="works-page project-page">
      <div className="page-header">
        <h1>二十二年后的山茶</h1>
        <p className="subtitle">流月&emsp;著</p>
      </div>

      <section className="project-body">

        <div className="camellia-poem">
          <div className="poem-line">当重逢把旧伤疤撕成新伤口</div>
          <div className="poem-line">山城的风里全是未说出口的恨</div>
          <div className="poem-line">他带着救赎的体温走向死亡</div>
          <div className="poem-line">而她握着染血的过去，站在真相的对岸</div>
        </div>
        
        <div className="read-button-container">
          <a href="https://camellia.786692.xyz" target="_blank" rel="noopener noreferrer" className="read-button">
            <span className="button-text">前往阅读</span>
            <span className="button-icon">→</span>
          </a>
        </div>
        
      </section>
      <BackToWorks />

      

      <style>{`
        .project-page { 
          padding: 60px 20px; 
          max-width: 800px; 
          margin: 0 auto; 
          color: var(--text-primary);
          min-height: calc(100vh - 200px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .project-page .page-header { 
          margin-bottom: 40px; 
          text-align: center;
          position: relative;
        }
        
        .project-page .page-header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }
        
        .project-page .page-header h1 { 
          font-size: 2.5rem; 
          margin: 0 0 12px; 
          font-weight: 300; 
          letter-spacing: 0.05em;
          color: var(--primary);
          font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          text-align: center;
        }
        
        .project-page .page-header .subtitle { 
          color: var(--text-secondary); 
          margin: 0; 
          font-size: 1rem;
          font-weight: 400;
          opacity: 0.8;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5em;
          width: 100%;
        }
        
        .author-spacing {
          width: 0.5em;
        }

        .project-body { 
          margin-top: 40px;
          position: relative;
        }
        
        .camellia-poem { 
          padding: 50px 0; 
          margin-bottom: 50px;
          position: relative;
        }
        
        .camellia-poem::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.6;
        }
        
        .camellia-poem::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.6;
        }
        
        .poem-line { 
          margin: 0 0 28px; 
          font-size: 1.25rem; 
          line-height: 2.5; 
          color: var(--text-primary);
          font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Songti SC', serif;
          text-align: center;
          font-weight: 300;
          letter-spacing: 0.05em;
          position: relative;
          transition: all 0.4s ease;
          opacity: 0.9;
        }
        
        .poem-line:last-child { 
          margin-bottom: 0; 
        }
        
        .poem-line:hover {
          color: var(--primary);
          transform: translateY(-2px);
          opacity: 1;
          text-shadow: 0 2px 8px rgba(43,175,144,0.2);
        }
        
        .poem-line:nth-child(1) {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        .poem-line:nth-child(2) {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        .poem-line:nth-child(3) {
          animation: fadeInUp 0.8s ease-out 0.6s both;
        }
        
        .poem-line:nth-child(4) {
          animation: fadeInUp 0.8s ease-out 0.8s both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .read-button-container {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }
        
        .read-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(43,175,144,0.3);
          position: relative;
          overflow: hidden;
        }
        
        .read-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .read-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(43,175,144,0.4);
          background: linear-gradient(135deg, #1a8b73 0%, #2BAF90 100%);
          color: #ffffff;
        }
        
        .read-button:hover::before {
          left: 100%;
        }
        
        .read-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(43,175,144,0.3);
        }
        
        .button-text {
          position: relative;
          z-index: 1;
        }
        
        .button-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        
        .read-button:hover .button-icon {
          transform: translateX(4px);
        }

        .project-placeholder { 
          margin-top: 30px; 
          border: 1px dashed rgba(43,175,144,0.2);
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .project-page { 
            padding: 40px 16px; 
            min-height: calc(100vh - 150px);
          }
          
          .project-page .page-header h1 { 
            font-size: 2rem; 
          }
          
          .camellia-poem { 
            padding: 40px 0; 
            margin-bottom: 40px;
          }
          
          .poem-line { 
            font-size: 1.15rem; 
            line-height: 2.3;
            margin-bottom: 24px;
          }
          
          .read-button {
            padding: 14px 28px;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .project-page { 
            padding: 30px 12px; 
          }
          
          .camellia-poem { 
            padding: 35px 0; 
            margin-bottom: 35px;
          }
          
          .poem-line { 
            font-size: 1.1rem; 
            line-height: 2.2;
            margin-bottom: 22px;
          }
          
          .read-button {
            padding: 12px 24px;
            font-size: 0.95rem;
          }
          
          .project-page .page-header h1 { 
            font-size: 1.8rem; 
          }
        }
        
        /* 添加淡入动画 */
        .project-page {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* 悬停效果 */
        .camellia-poem:hover {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
