"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Marquee } from "@/components/ui/marquee";
import { spring, springFast, ease } from "@/lib/motion";

const TICKER_ITEMS = [
  "🚀 Aerospace internships",
  "🔬 Research programs",
  "💡 Hackathons",
  "🌱 Environmental science",
  "🤖 Robotics teams",
  "🧬 Biotech research",
  "📰 Journalism programs",
  "🏛️ Civic leadership",
  "🎨 Arts & design",
  "💻 Software engineering",
  "🌏 Remote opportunities",
  "🎓 Scholarships",
  "⚡ Summer programs",
  "🏆 Competitions",
];

const SEARCH_EXAMPLES = [
  "aerospace internship near San Jose",
  "remote research for beginners",
  "free summer coding programs",
  "robotics competition Bay Area",
  "biology lab internship high school",
];

const QUICK_LINKS = ["Aerospace", "Robotics", "Free programs", "Remote research", "Competitions"];

// Headline definition — each line, character-split for anime.js stagger
const HEADLINE_LINES: { words: string; accent: boolean }[] = [
  { words: "Find what", accent: false },
  { words: "you were",  accent: true  },
  { words: "made for.", accent: false },
];

// Splits a line into char spans suitable for anime.js translateY clip reveal.
// Each char is wrapped: outer span (overflow:hidden clip) → inner .hero-char span
function HeadlineLine({ words, accent }: { words: string; accent: boolean }) {
  const inner = words.split("").map((ch, i) => {
    const char = ch === " " ? " " : ch;
    return (
      // outer: clips translateY overshoot; inline-block so it sits in text flow
      <span
        key={i}
        style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1 }}
      >
        {/* inner: anime.js moves this from translateY(1em) → 0 */}
        <span
          className={`hero-char${accent ? " hero-char-accent" : ""}`}
          style={{
            display: "inline-block",
            willChange: "transform",
            // Individual gradient per char isn't ideal, but anime.js targets need display:inline-block
            // Solution: inherit background clip from parent line span
          }}
        >
          {char}
        </span>
      </span>
    );
  });

  if (accent) {
    // gradient-text wrapper — clips the gradient background to all child text
    return <span className="gradient-text" style={{ display: "block" }}>{inner}</span>;
  }
  return <span style={{ display: "block" }}>{inner}</span>;
}

export function LandingHero({
  stats,
}: {
  stats: { total: number; free: number; remote: number; noExperienceRequired: number };
}) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(SEARCH_EXAMPLES[0]);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Typewriter placeholder
  useEffect(() => {
    const example = SEARCH_EXAMPLES[exampleIdx];
    if (!deleting) {
      if (charIdx <= example.length) {
        timerRef.current = setTimeout(() => {
          setPlaceholder(example.slice(0, charIdx));
          setCharIdx((c) => c + 1);
        }, 38);
      } else {
        timerRef.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timerRef.current = setTimeout(() => {
          setPlaceholder(example.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 22);
      } else {
        setDeleting(false);
        setExampleIdx((i) => (i + 1) % SEARCH_EXAMPLES.length);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [charIdx, deleting, exampleIdx]);

  // anime.js: per-character headline stagger — the signature effect
  useEffect(() => {
    anime({
      targets: ".hero-char",
      translateY: ["1.1em", "0em"],
      duration: 750,
      delay: anime.stagger(18, { start: 180 }),
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col bg-[#0a0a0f] overflow-hidden">

      {/* Glow blobs — blue only, no purple mesh */}
      <motion.div
        className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/18 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.26, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] left-[8%] w-[360px] h-[360px] bg-blue-900/20 rounded-full blur-[90px] pointer-events-none"
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] right-[5%] w-[280px] h-[280px] bg-sky-500/8 rounded-full blur-[70px] pointer-events-none"
        animate={{ x: [0, -12, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-10 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springFast, delay: 0.06 }}
          className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] text-blue-300 text-xs sm:text-sm px-4 py-2 rounded-full mb-8"
        >
          <motion.span
            className="w-1.5 h-1.5 bg-green-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Bay Area pilot — {stats.total}+ opportunities live
          <Zap className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline — anime.js per-char stagger fires in useEffect above */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-6 max-w-5xl">
          {HEADLINE_LINES.map((line, i) => (
            <HeadlineLine key={i} words={line.words} accent={line.accent} />
          ))}
        </h1>

        {/* Subline — Framer Motion fade (no per-char needed here) */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ease, delay: 0.62 }}
          className="text-slate-400 text-base sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Every student deserves access to opportunities that match their interests — not just the ones who know the right people.
        </motion.p>

        {/* Search bar */}
        <motion.form
          action="/explore"
          method="get"
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.72 }}
        >
          <div className="relative group">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <div className="relative flex bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  name="q"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder || "Try something…"}
                  className="w-full pl-12 pr-4 py-4 sm:py-5 text-slate-900 text-base sm:text-lg bg-transparent focus:outline-none placeholder:text-slate-400"
                />
              </div>
              <motion.button
                type="submit"
                className="shrink-0 bg-blue-600 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 flex items-center gap-2"
                whileHover={{ backgroundColor: "#1d4ed8" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                Search
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Quick links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-5"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="text-xs text-slate-600"
          >
            Try:
          </motion.span>
          {QUICK_LINKS.map((term) => (
            <motion.div
              key={term}
              variants={{ hidden: { opacity: 0, scale: 0.85, y: 8 }, show: { opacity: 1, scale: 1, y: 0 } }}
              transition={springFast}
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255,255,255,0.13)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/explore?q=${encodeURIComponent(term.toLowerCase())}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white/[0.07] text-slate-300 border border-white/[0.1] hover:text-white transition-colors block"
              >
                {term}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <motion.div
        className="relative border-t border-white/[0.05] py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Marquee
          items={TICKER_ITEMS}
          speed={40}
          itemClassName="bg-white/[0.06] text-slate-300 border border-white/[0.07] hover:bg-white/[0.1] transition-colors cursor-default"
        />
      </motion.div>
    </section>
  );
}
