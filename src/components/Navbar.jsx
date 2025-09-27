'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // 状态管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 导航链接数据
  const navLinks = [
    { label: '首页', href: '/' },
    { label: '作品', href: '/works', prefetch: true },
    { label: '博客', href: '/blog', prefetch: true },
    { label: '联系', href: '/contact' }
  ];

  // 检查当前链接是否为活跃状态
  const isActive = (href) => pathname === href;

  return (
    <nav className="navbar">
      {/* 桌面端导航 */}
      <div className="desktop-nav">
        <div className="navbar-container">
          {/* 左侧Logo/名称 */}
          <Link href="/" className="logo">
            {/* 这里可以放置你的名字或Logo */}
            <span>Sitrmoo</span>
          </Link>
          
          {/* 右侧导航链接 */}
          <ul className="nav-links navbar-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={isActive(link.href) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 移动端导航 */}
      <div className="mobile-nav">
        {/* 移动端Logo */}
        <Link href="/" className="mobile-logo">
          <span>Sitrmoo</span>
        </Link>
        
        {/* 汉堡菜单按钮 */}
        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {/* 汉堡菜单图标将通过样式实现 */}
          <span className="menu-icon"></span>
        </button>
        
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <ul id="mobile-menu" className="mobile-menu" role="menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={isActive(link.href) ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}