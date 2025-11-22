'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // 自动更新年份，无需手动修改

  // 社交链接数据：可根据需要添加/删除
  const socialLinks = [
    { icon: 'github', url: 'https://github.com/gbhf0020', alt: 'GitHub' },
    { icon: 'instagram', url: 'https://www.instagram.com/sitrmoo0020', alt: 'Instagram' },
    { icon: 'twitter', url: 'https://x.com/gbhf0020', alt: 'X' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 版权栏：居左（桌面端） */}
        <div className="footer-copyright">
          <p>Copyright © {currentYear} Sitrmoo.</p>
        </div>

        {/* 社交链接：居右（桌面端） */}
        <ul className="footer-social">
          {socialLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label={link.alt}
                className="footer-social-link"
              >
                {/* 这里用 react-icons 图标（之前推荐的本地方案），无远程加载延迟 */}
                {/* 若用 SVG 图标，直接替换 <i> 标签为 SVG 代码即可 */}
                <i className={`fa fa-${link.icon}`}></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}