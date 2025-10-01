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
        <p className="subtitle">流月  著</p>
      </div>

      <section className="project-body">

        <div className="camellia-paragraph">
          <p>当重逢把旧伤疤撕成新伤口</p>
          <p>山城的风里全是未说出口的恨</p>
          <p>他带着救赎的体温走向死亡</p>
          <p>而她握着染血的过去，站在真相的对岸</p>
        </div>
      </section>
      <BackToWorks />

      

      <style>{`
        .project-page { padding: 48px 20px; max-width: 920px; margin: 0 auto; color: var(--text-primary); }
        .project-page .page-header { margin-bottom: 18px; }
        .project-page .page-header h1 { font-size: 2rem; margin: 0 0 6px; font-weight: 700; letter-spacing: .02em; }
        .project-page .page-header .subtitle { color: var(--muted, #9CA3AF); margin: 0; font-size: .95rem; }

        .project-body { margin-top: 20px; }
        .camellia-paragraph { 
          padding: 20px 22px; 
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00));
          border-left: 3px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset;
        }
        .camellia-paragraph p { 
          margin: 0 0 12px; 
          font-size: 1.05rem; 
          line-height: 1.8; 
          color: var(--text-primary);
          font-family: ui-serif, Georgia, 'Songti SC', 'Hiragino Mincho ProN', 'Times New Roman', serif;
          text-indent: 28px;
        }
        .camellia-paragraph p:last-child { margin-bottom: 0; }

        .project-placeholder { margin-top: 18px; border: 1px dashed rgba(0,0,0,0.04); }

        /* Make sure the back button doesn't obscure content on small screens */
        @media (max-width: 640px) {
          .project-page { padding: 28px 16px; }
        }
      `}</style>
    </div>
  );
}
