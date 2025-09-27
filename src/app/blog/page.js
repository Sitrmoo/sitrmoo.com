'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Parser from 'rss-parser';
import { format } from 'date-fns';

const parser = new Parser();

// 获取并解析RSS数据
async function fetchBlogPosts() {
  try {
    const rssUrl = 'https://blog.786692.xyz/rss.xml';
    const corsProxy = 'https://api.allorigins.win/get?url=';
    const proxyUrl = `${corsProxy}${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`请求失败: ${response.status}`);
    
    const data = await response.json();
    const feed = await parser.parseString(data.contents);
    return feed.items || [];
  } catch (error) {
    console.error('获取博客数据失败:', error);
    return [];
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const postsData = await fetchBlogPosts();
        setPosts(postsData);
        setError(null);
      } catch (err) {
        setError('加载博客失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '未知时间';
    return format(new Date(dateString), 'yyyy年MM月dd日 HH:mm');
  };

  // 处理描述内容（返回有效描述或"无描述"）
  const getDescription = (description) => {
    // 检查是否为false或无效值
    if (!description || description === 'false') {
      return '无描述';
    }
    // 检查是否为空字符串或仅含空白字符
    if (typeof description === 'string' && description.trim() === '') {
      return '无描述';
    }
    // 移除HTML标签，返回纯文本
    return description.replace(/<[^>]*>?/gm, '').trim();
  };

  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>博客文章</h1>
        <p>来自 blog.786692.xyz 的最新内容</p>
      </div>

      {/* 加载状态 */}
      {isLoading && (
        <div className="loading-state">
          <p>正在加载文章列表...</p>
        </div>
      )}

      {/* 错误状态 */}
      {error && !isLoading && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}

      {/* 文章卡片列表 */}
      {!isLoading && !error && (
        <div className="blog-cards-grid">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              // 获取处理后的描述
              const description = getDescription(post.contentSnippet || post.description || '');
              
              return (
                <article key={index} className="blog-card">
                  {/* 卡片头部：标题和日期 */}
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">
                      <Link 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <time className="blog-card-date" dateTime={post.pubDate}>
                      {formatDate(post.pubDate)}
                    </time>
                  </div>
                  
                  {/* 描述区域（始终显示，无效时显示"无描述"） */}
                  <div className="blog-card-description">
                    <p>{description}</p>
                  </div>
                  
                  {/* 卡片底部：阅读按钮 */}
                  <div className="blog-card-footer">
                    <Link 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      阅读全文
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="no-content">
              <p>暂无文章数据</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
    