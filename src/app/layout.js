import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Particles from '@/components/Particles';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '流月',
  description: '静水映长天',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <script 
          src="https://kit.fontawesome.com/7bc800185a.js" 
          crossOrigin="anonymous" 
        />
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
            {children}
          </main>
          
          {/* 页脚 */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
