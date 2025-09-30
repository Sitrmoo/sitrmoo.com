"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children, className = "" }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const wrapperRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  // start invisible so we can animate the first mount -> enter
  const [visible, setVisible] = useState(false);

  // On mount, set initial children and trigger enter animation
  useEffect(() => {
    setDisplayChildren(children);
    requestAnimationFrame(() => setVisible(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!prevPathRef.current) {
      prevPathRef.current = pathname;
      return;
    }

    if (pathname === prevPathRef.current) return;

    // on navigation: animate out, then swap content on transition end
    const el = wrapperRef.current;
    if (!el) {
      setDisplayChildren(children);
      setVisible(true);
      prevPathRef.current = pathname;
      return;
    }

    const handleTransitionEnd = (e) => {
      if (e.target !== el) return;
      el.removeEventListener('transitionend', handleTransitionEnd);
      // swap content and perform enter (fade-in)
      setDisplayChildren(children);
      // next frame to ensure DOM updated, then trigger enter
      requestAnimationFrame(() => setVisible(true));
      prevPathRef.current = pathname;
    };

    // start exit (fade out)
    setVisible(false);
    el.addEventListener('transitionend', handleTransitionEnd);

    // safety fallback in case transitionend doesn't fire
    const fallback = setTimeout(() => {
      el.removeEventListener('transitionend', handleTransitionEnd);
      setDisplayChildren(children);
      requestAnimationFrame(() => setVisible(true));
      prevPathRef.current = pathname;
    }, 700);

    return () => clearTimeout(fallback);
  }, [pathname, children]);

  return (
    <div
      ref={wrapperRef}
      className={`page-transition-wrapper ${className} ${visible ? "enter" : "exit"}`}
      aria-live="polite"
    >
      {displayChildren}
    </div>
  );
}
