"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import anime from "animejs";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 1400,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.4 });
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current || !ref.current) return;
    animated.current = true;
    const el = ref.current;
    const proxy = { value: 0 };

    anime({
      targets: proxy,
      value: end,
      duration,
      easing: "easeOutExpo",
      round: 1,
      update() {
        el.textContent = `${prefix}${Math.round(proxy.value).toLocaleString()}${suffix}`;
      },
    });
  }, [inView, end, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
