import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Particles from '@/components/Particles';
import PageTransition from '@/components/PageTransition';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: '流月 - 静水映长天',
    template: '%s | 流月'
  },
  description: '静水映长天',
  icons: {
    icon: '/icon.svg'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <Script
          src="https://kit.fontawesome.com/7bc800185a.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <noscript>
          <style>{`.page-transition-wrapper{opacity:1;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className={`${inter.className} global-background`}>
        {/* 粒子效果背景 */}
        <Particles />
        
        {/* 页面容器，用于控制整体布局 */}
        <div className="page-container">
          {/* 导航栏 */}
          <Navbar />
          
          {/* 页面主体内容 */}
          <main className="main-content">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          
          {/* 页脚 */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
