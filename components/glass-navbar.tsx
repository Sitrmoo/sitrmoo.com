"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "首页", href: "/" },
  { label: "作品", href: "/works" },
  { label: "博客", href: "/blog" },
  { label: "关于", href: "/about" },
  { label: "联系", href: "/contact" },
];

export function GlassNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // 移动端菜单打开时锁定页面滚动
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-500 sm:px-6",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-5xl border px-4 py-2 sm:px-5",
          "border-border/80 backdrop-blur-xl",
          // 背景色、内边距走 500ms；圆角单独给更短的过渡，避免和高度展开动画打架
          "transition-[background-color,box-shadow,padding] duration-500",
          mobileOpen
            ? "rounded-2xl bg-background/95 overflow-hidden duration-150"
            : "rounded-full bg-background/70 duration-150",
          scrolled
            ? "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
            : "shadow-none"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full py-1 pr-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card transition-colors duration-300 group-hover:border-foreground/30">
              <svg
                width="16"
                height="16"
                viewBox="0 0 100 100"
                className="text-foreground"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M 30.697621,64.986117 a 9.9011709,9.8627651 0 0 1 -9.901173,9.86277 9.9011709,9.8627651 0 0 1 -9.901168,-9.86277 9.9011709,9.8627651 0 0 1 9.901168,-9.862763 9.9011709,9.8627651 0 0 1 9.901173,9.862763 z M 90.104628,40.329209 a 9.9011709,9.8627651 0 0 1 -9.901157,9.862764 9.9011709,9.8627651 0 0 1 -9.901169,-9.862764 9.9011709,9.8627651 0 0 1 9.901169,-9.862771 9.9011709,9.8627651 0 0 1 9.901157,9.862771 z M 80.203244,20.603496 A 19.802341,19.725532 0 0 0 60.401087,40.329349 v 9.862673 H 50.50001 v 9.862673 h 9.901077 v 39.451207 h 9.901079 V 60.054695 h 9.901078 A 19.802341,19.725532 0 0 0 100.00592,40.329349 19.802341,19.725532 0 0 0 80.203244,20.603496 Z M 20.796263,0.87814952 V 5.8097409 h 9.90159 V 47.909706 A 19.802341,19.725532 0 0 0 20.796263,45.260432 19.802341,19.725532 0 0 0 0.99410796,64.986287 19.802341,19.725532 0 0 0 20.796263,84.711631 19.802341,19.725532 0 0 0 40.598932,64.986287 V 5.8097409 H 50.50001 V 0.87814952 Z"
                />
              </svg>
            </span>
            <span className="font-serif text-base font-bold tracking-tight text-foreground">
              流月
            </span>
          </Link>

          {/* 桌面端导航 */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <li key={link.label} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                    isActive(link.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {/* 当前页小圆点指示 */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground transition-all duration-300",
                      isActive(link.href)
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <Menu
                size={19}
                className={cn(
                  "absolute transition-all duration-300",
                  mobileOpen
                    ? "rotate-90 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                size={19}
                className={cn(
                  "absolute transition-all duration-300",
                  mobileOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-50 opacity-0"
                )}
              />
            </span>
          </button>
        </div>

        {/* 移动端下拉菜单 */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-out md:hidden",
            mobileOpen
              ? "grid-rows-[1fr] pt-3 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="mx-1 mb-1 border-t border-border/70 pt-2">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <li
                    key={link.label}
                    className={cn(
                      "transition-all duration-300",
                      mobileOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    )}
                    style={{
                      transitionDelay: mobileOpen ? `${i * 40 + 50}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 text-[15px] transition-colors duration-200",
                        isActive(link.href)
                          ? "font-medium text-foreground"
                          : "text-muted-foreground active:bg-secondary"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="h-1 w-1 rounded-full bg-foreground" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
