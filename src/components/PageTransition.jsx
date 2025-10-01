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

    const el = wrapperRef.current;
    if (!el) {
      setDisplayChildren(children);
      setVisible(true);
      prevPathRef.current = pathname;
      return;
    }

    // add subtle wiping scale during blur for depth
    el.classList.add('wiping');

    // Blur-based sequence: blur current content -> swap while blurred -> unblur to reveal
    let finished = false;

    const onBlurEnd = (e) => {
      // only react to the wrapper's filter transition
      if (e.target !== el) return;
      if (e.propertyName && e.propertyName !== 'filter') return;
      el.removeEventListener('transitionend', onBlurEnd);
      // swap content while blurred
      setDisplayChildren(children);
      // next frame: remove blur to animate to clear, and remove wiping after reveal
      requestAnimationFrame(() => {
        el.classList.remove('blurred');
        setVisible(true);
        el.classList.remove('wiping');
      });
      finished = true;
      prevPathRef.current = pathname;
    };

    // start blur on wrapper
    el.classList.add('blurred');
    el.addEventListener('transitionend', onBlurEnd);

    // safety fallback in case transitionend doesn't fire
    const fallback = setTimeout(() => {
      if (finished) return;
      el.removeEventListener('transitionend', onBlurEnd);
      setDisplayChildren(children);
      requestAnimationFrame(() => {
        el.classList.remove('blurred');
        setVisible(true);
        el.classList.remove('wiping');
      });
      prevPathRef.current = pathname;
    }, 700);

    return () => {
      clearTimeout(fallback);
      el.removeEventListener('transitionend', onBlurEnd);
    };
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
