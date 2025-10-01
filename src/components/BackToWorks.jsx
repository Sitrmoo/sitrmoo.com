import Link from 'next/link';

export default function BackToWorks({ className = '', position = 'side' }) {
  // position: 'side' (default) or 'bottom'
  const posClass = position === 'bottom' ? 'bottom' : '';
  return (
    <Link href="/works" className={`back-to-works ${posClass} ${className}`.trim()}>
      ← 返回作品列表
    </Link>
  );
}
