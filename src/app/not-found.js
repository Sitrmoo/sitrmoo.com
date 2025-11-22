import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>页面不存在</h1>
      <p className={styles.subtitle}>我们都在时间里迷路，恰好，您走到了一个未标注的刻度。</p>

      <div className={styles.illustration} aria-hidden>
        {/* Simple decorative SVG */}
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="144" height="88" rx="12" fill="var(--card-bg)" stroke="var(--border)" />
          <circle cx="48" cy="64" r="10" fill="var(--primary)" />
          <rect x="72" y="54" width="60" height="8" rx="4" fill="var(--text-secondary)" />
          <rect x="72" y="72" width="40" height="8" rx="4" fill="var(--text-secondary)" />
        </svg>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={`${styles.btn} ${styles.primary}`}>返回首页</Link>
      </div>
    </div>
  );
}
