"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import anime from "animejs";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const EXAMPLES = [
  "aerospace internship near San Jose",
  "remote research for beginners",
  "free summer coding programs",
  "robotics competition Bay Area",
  "biology lab internship high school",
];

const QUICK = ["Aerospace", "Research", "Free programs", "Remote", "Competitions"];

interface Props {
  stats: { total: number; free: number; remote: number; noExperienceRequired: number };
}

export function LandingHero({ stats }: Props) {
  const [query, setQuery]           = useState("");
  const [placeholder, setPlaceholder] = useState(EXAMPLES[0]);
  const [exIdx, setExIdx]           = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [deleting, setDeleting]     = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Typewriter placeholder
  useEffect(() => {
    const ex = EXAMPLES[exIdx];
    if (!deleting) {
      if (charIdx <= ex.length) {
        timer.current = setTimeout(() => { setPlaceholder(ex.slice(0, charIdx)); setCharIdx(c => c + 1); }, 40);
      } else {
        timer.current = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (charIdx > 0) {
        timer.current = setTimeout(() => { setPlaceholder(ex.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 24);
      } else {
        setDeleting(false);
        setExIdx(i => (i + 1) % EXAMPLES.length);
      }
    }
    return () => clearTimeout(timer.current);
  }, [charIdx, deleting, exIdx]);

  // Single-pass entrance stagger — nothing loops
  useEffect(() => {
    anime({
      targets: ".h-reveal",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 520,
      delay: anime.stagger(70, { start: 60 }),
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="bg-[#0c0c0c] text-white min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-20">

        {/* Status pill */}
        <div className="h-reveal mb-8 flex items-center gap-2 opacity-0">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span
            style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.65rem", letterSpacing: "0.12em" }}
            className="text-[#525252] uppercase"
          >
            Bay Area pilot · {stats.total}+ programs live
          </span>
        </div>

        {/* Headline */}
        <h1
          className="h-reveal font-black tracking-tight leading-[0.92] text-white mb-8 opacity-0"
          style={{ fontSize: "clamp(3.4rem, 9vw, 7.5rem)" }}
        >
          Find what<br />you&apos;re made<br />for.
        </h1>

        {/* Subline */}
        <p className="h-reveal text-[#737373] text-lg max-w-lg mb-10 leading-relaxed opacity-0">
          Every internship, research program, and competition — in one place,
          verified, free to access.
        </p>

        {/* Search bar */}
        <div className="h-reveal max-w-2xl opacity-0">
          <form
            action="/explore"
            method="get"
            className="flex items-stretch border border-[#262626] bg-[#141414] rounded-lg overflow-hidden focus-within:border-[#3b82f6] transition-colors duration-150"
          >
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252] pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                name="q"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={placeholder || "Search programs…"}
                className="w-full pl-11 pr-4 py-4 bg-transparent text-white text-sm focus:outline-none placeholder:text-[#404040]"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-4 bg-[#1e1e1e] border-l border-[#262626] text-[#a3a3a3] hover:text-white hover:bg-[#242424] transition-colors duration-150 text-sm font-medium shrink-0"
            >
              Search <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-[#404040] text-xs">Try:</span>
            {QUICK.map(term => (
              <Link
                key={term}
                href={`/explore?q=${encodeURIComponent(term.toLowerCase())}`}
                className="text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors duration-150 underline-offset-2 hover:underline"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="h-reveal mt-14 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-6 opacity-0"
          style={{ borderTop: "1px solid #1f1f1f" }}
        >
          {[
            { value: stats.free,                 label: "free programs"        },
            { value: stats.remote,               label: "remote options"       },
            { value: stats.total,                label: "total programs"       },
            { value: stats.noExperienceRequired, label: "no experience needed" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums mb-1">
                <AnimatedCounter end={value} suffix="+" duration={1200} />
              </div>
              <div
                className="text-[#525252]"
                style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.65rem", letterSpacing: "0.08em" }}
              >
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
