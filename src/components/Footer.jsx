'use client';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // 自动更新年份，无需手动修改

  // 社交链接数据：使用 Font Awesome Kit（通过 <Script> 加载）提供品牌图标类名
  const socialLinks = [
    { iconClass: 'fa-brands fa-github', url: 'https://github.com/gbhf0020', alt: 'GitHub' },
    { iconClass: 'fa-brands fa-x-twitter', url: 'https://x.com/gbhf0020', alt: 'X' },
    { iconClass: 'fa-brands fa-instagram', url: 'https://www.instagram.com/sitrmoo0020', alt: 'Instagram' },
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
                {/* 使用 Font Awesome Kit 的类名（例如：'fa-brands fa-github'）。如需替换为 SVG，请直接用 SVG 代码 */}
                <i className={link.iconClass} aria-hidden="true"></i>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}