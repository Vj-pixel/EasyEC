"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeLeft, fadeRight, ease } from "@/lib/motion";

const VARIANTS = { up: fadeUp, left: fadeLeft, right: fadeRight };

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[direction]}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ ...ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
