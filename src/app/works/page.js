'use client';

import { useState, useEffect } from 'react';

// 服务器端获取作品数据
async function getWorksData() {
  try {
    // 添加完整基础URL（开发环境）
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : ''; // 生产环境通常不需要
    
    const response = await fetch(`${baseUrl}/works/data.json`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error('数据加载失败');
    }
    
    return await response.json();
  } catch (error) {
    console.error('加载作品数据出错：', error);
    return [];
  }
}

// 其余代码保持不变...
export default function WorksPage() {
  // 状态管理
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [isLoading, setIsLoading] = useState(true);

  // 初始化加载数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getWorksData();
      setWorks(data);
      setFilteredWorks(data);
      
      // 提取所有标签作为分类
      const allTags = ['全部'];
      data.forEach(work => {
        work.tags.forEach(tag => {
          if (!allTags.includes(tag)) {
            allTags.push(tag);
          }
        });
      });
      setCategories(allTags);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // 筛选作品
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === '全部') {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(works.filter(work => work.tags.includes(category)));
    }
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="works-page">
        <div className="loading-state">
          <p>加载作品中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="works-page">
      <div className="page-header">
        <h1>我的作品</h1>
        <p>展示我在不同领域的项目经验和技术实践</p>
      </div>

      {/* 分类筛选 */}
      <div className="categories-filter">
        <ul>
          {categories.map((category) => (
            <li 
              key={category}
              className={`category-item ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* 作品网格 */}
      {filteredWorks.length > 0 ? (
        <div className="works-grid">
          {filteredWorks.map((work, index) => (
            <div key={index} className="work-card">
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
                <p className="work-description">{work.description}</p>
                
                {/* 标签 */}
                <div className="work-tags">
                  {work.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="work-category">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* 按钮 */}
                <div className="work-buttons">
                  {work.buttons.map((button, btnIndex) => (
                    <a 
                      key={btnIndex}
                      href={button.url}
                      target={button.url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {button.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-works">
          <p>暂无该分类的作品数据</p>
        </div>
      )}
    </div>
  );
}
    