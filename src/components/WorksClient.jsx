"use client";

import { useEffect, useState } from 'react';

export default function WorksClient({ initialWorks = [] }) {
  const [works, setWorks] = useState(initialWorks);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWorks(initialWorks);
  }, [initialWorks]);

  if (isLoading) {
    return (
      <div className="works-page">
        <div className="loading-state"><p>加载作品中...</p></div>
      </div>
    );
  }

  return (
    <>
      {works.length > 0 ? (
        <div className="works-grid">
          {works.map((work, index) => (
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
        <div className="no-works"><p>暂无作品数据</p></div>
      )}
    </>
  );
}
