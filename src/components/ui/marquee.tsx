"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one cycle
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
}

export function Marquee({
  items,
  speed = 30,
  className,
  itemClassName,
  reverse = false,
}: MarqueeProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn(
          "inline-flex gap-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shrink-0",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
