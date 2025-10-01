"use client";

import { useEffect, useState } from 'react';

export default function WorksClient({ initialWorks = [] }) {
  const [works, setWorks] = useState(initialWorks);
  const [filteredWorks, setFilteredWorks] = useState(initialWorks);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWorks(initialWorks);
    setFilteredWorks(initialWorks);
    const allTags = ['全部'];
    initialWorks.forEach(work => {
      (work.tags || []).forEach(tag => {
        if (!allTags.includes(tag)) allTags.push(tag);
      });
    });
    setCategories(allTags);
  }, [initialWorks]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === '全部') setFilteredWorks(works);
    else setFilteredWorks(works.filter(w => (w.tags || []).includes(category)));
  };

  if (isLoading) {
    return (
      <div className="works-page">
        <div className="loading-state"><p>加载作品中...</p></div>
      </div>
    );
  }

  return (
    <>
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

      {filteredWorks.length > 0 ? (
        <div className="works-grid">
          {filteredWorks.map((work, index) => (
            <div key={index} className="work-card">
              <div className="work-info">
                <h3 className="work-title">{work.title}</h3>
                <p className="work-description">{work.description}</p>

                <div className="work-tags">
                  {(work.tags || []).map((tag, tagIndex) => (
                    <span key={tagIndex} className="work-category">{tag}</span>
                  ))}
                </div>

                <div className="work-buttons">
                  {(work.buttons || []).map((button, btnIndex) => (
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
        <div className="no-works"><p>暂无该分类的作品数据</p></div>
      )}
    </>
  );
}
