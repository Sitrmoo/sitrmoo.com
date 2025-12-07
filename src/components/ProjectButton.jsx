import React from 'react';

/**
 * Reusable project button.
 * Props:
 * - label: text shown on the button (preferred)
 * - children: alternative slot for custom content
 * - className: extra classes
 * - onClick: click handler
 */
export default function ProjectButton({ label, children, className = '', onClick }) {
  const content = children ?? label ?? '查看';

  return (
    <button
      type="button"
      className={`project-button ${className}`.trim()}
      onClick={onClick}
    >
      <span className="project-button__label">{content}</span>
      <span className="project-button__icon" aria-hidden>
        {/* simple arrow icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
}
