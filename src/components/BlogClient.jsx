"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

// 解析逻辑已移到服务器端，现在直接从 /api/rss 获取已解析的 JSON 列表。
function parseRSS(xmlText) {
  // 保留空函数以防回退使用；目前不被调用。
  return [];
}

export default function BlogClient() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/rss');
        if (!res.ok) throw new Error('RSS 请求失败');
        const data = await res.json();
        const parsed = data.items || [];
        if (mounted) setPosts(parsed);
      } catch (err) {
        console.error(err);
        if (mounted) setError('加载博客失败');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchFeed();
    return () => { mounted = false; };
  }, []);

  const formatDate = (dateString) => {
    try {
      if (!dateString) return '未知时间';
      const d = new Date(dateString);
      return new Intl.DateTimeFormat('zh-CN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }).format(d);
    } catch {
      return dateString;
    }
  };

  const cleanDesc = (s) => {
    if (!s) return '无描述';
    const tmp = s.replace(/<[^>]*>?/gm, '').trim();
    return tmp === '' ? '无描述' : tmp;
  };

  if (isLoading) return <div className="blog-page"><div className="loading-state"><p>正在加载文章列表...</p></div></div>;
  if (error) return <div className="blog-page"><div className="error-state"><p>{error}</p></div></div>;

  return (
    <div className="blog-page">
      <div className="blog-cards-grid">
        {posts.length > 0 ? posts.map((post, idx) => (
          <article key={idx} className="blog-card">
            <div className="blog-card-header">
              <h2 className="blog-card-title">
                <Link href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</Link>
              </h2>
              <time className="blog-card-date">{formatDate(post.pubDate)}</time>
            </div>
            <div className="blog-card-description"><p>{cleanDesc(post.description)}</p></div>
            <div className="blog-card-footer">
              <Link href={post.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">阅读全文</Link>
            </div>
          </article>
        )) : (
          <div className="no-content"><p>暂无文章数据</p></div>
        )}
      </div>
    </div>
  );
}
