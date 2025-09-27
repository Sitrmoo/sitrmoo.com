'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 关闭菜单当路由变化时
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 阻止背景滚动当菜单打开时
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const navLinks = [
    { label: '首页', href: '/' },
    { label: '作品', href: '/works', prefetch: true },
    { label: '博客', href: '/blog', prefetch: true },
    { label: '联系', href: '/contact' }
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="navbar">
      {/* 桌面端导航 */}
      <div className="desktop-nav">
        <div className="navbar-container">
          <Link href="/" className="logo">
            <span>Sitrmoo</span>
          </Link>
          
          <ul className="nav-links">
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
        <Link href="/" className="mobile-logo">
          <span>Sitrmoo</span>
        </Link>
        
        {!isMenuOpen && (
          <button 
            className="menu-button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="打开菜单"
          >
            <span className="menu-icon">☰</span>
          </button>
        )}
        
        {/* 覆盖式菜单背景 */}
        {isMenuOpen && (
          <div 
            className="mobile-menu-overlay overlay-open"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        
        {/* 侧边菜单 */}
        <div className={`mobile-menu-sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-logo">Sitrmoo</span>
            <button 
              className="close-button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="关闭菜单"
            >
              <span className="close-icon">×</span>
            </button>
          </div>
          
          <ul className="mobile-menu-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className={`mobile-menu-link ${isActive(link.href) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}