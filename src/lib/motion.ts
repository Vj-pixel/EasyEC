// Shared Framer Motion variants and transition presets

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0 },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1 },
};

export const staggerContainer = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const spring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

export const springFast = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
};

export const ease = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const easeSlow = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const inViewConfig = {
  once: true,
  amount: 0.15,
} as const;
