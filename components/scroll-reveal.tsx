"use client";

import React from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const translateMap: Record<Direction, string> = {
  up: "translate-y-12",
  down: "-translate-y-12",
  left: "translate-x-12",
  right: "-translate-x-12",
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ once });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${translateMap[direction]}`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
