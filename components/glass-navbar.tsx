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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-5xl rounded-2xl border border-white/20 px-6 py-3 transition-all duration-500",
          "bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          scrolled && "bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 100 100"
                fill="none"
                className="text-foreground"
              >
                <path
                  d="M 30.697621,64.986117 a 9.9011709,9.8627651 0 0 1 -9.901173,9.86277 9.9011709,9.8627651 0 0 1 -9.901168,-9.86277 9.9011709,9.8627651 0 0 1 9.901168,-9.862763 9.9011709,9.8627651 0 0 1 9.901173,9.862763 z M 90.104628,40.329209 a 9.9011709,9.8627651 0 0 1 -9.901157,9.862764 9.9011709,9.8627651 0 0 1 -9.901169,-9.862764 9.9011709,9.8627651 0 0 1 9.901169,-9.862771 9.9011709,9.8627651 0 0 1 9.901157,9.862771 z M 80.203244,20.603496 A 19.802341,19.725532 0 0 0 60.401087,40.329349 v 9.862673 H 50.50001 v 9.862673 h 9.901077 v 39.451207 h 9.901079 V 60.054695 h 9.901078 A 19.802341,19.725532 0 0 0 100.00592,40.329349 19.802341,19.725532 0 0 0 80.203244,20.603496 Z M 20.796263,0.87814952 V 5.8097409 h 9.90159 V 47.909706 A 19.802341,19.725532 0 0 0 20.796263,45.260432 19.802341,19.725532 0 0 0 0.99410796,64.986287 19.802341,19.725532 0 0 0 20.796263,84.711631 19.802341,19.725532 0 0 0 40.598932,64.986287 V 5.8097409 H 50.50001 V 0.87814952 Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              流月
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-white/20 text-foreground"
                      : "text-foreground/70 hover:bg-white/15 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-white/15 hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "grid transition-all duration-300 md:hidden",
            mobileOpen
              ? "grid-rows-[1fr] opacity-100 pt-4"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1 pb-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-white/20 text-foreground"
                        : "text-foreground/70 hover:bg-white/15 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
