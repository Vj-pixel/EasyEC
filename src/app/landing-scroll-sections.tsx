"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Opportunity } from "@/lib/types";

// ─── Scroll reveal ────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.6rem", letterSpacing: "0.16em" }}
       className="text-[#525252] uppercase mb-8">
      {children}
    </p>
  );
}

// ─── Opportunity row ──────────────────────────────────────────────────────────

function fmtDeadline(iso?: string) {
  if (!iso) return "Rolling";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function OppRow({ opp, delay }: { opp: Opportunity; delay: number }) {
  const isRemote = opp.location.isRemote || opp.format === "remote";
  const isFree   = opp.costType === "free";

  return (
    <Reveal delay={delay}>
      <Link
        href={`/opportunity/${opp.id}`}
        className="group flex items-center justify-between gap-4 py-4 border-b border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors duration-150"
      >
        <div className="flex-1 min-w-0">
          <div className="text-[#e5e5e5] text-sm font-semibold group-hover:text-white transition-colors truncate">
            {opp.title}
          </div>
          <div
            className="text-[#525252] truncate mt-0.5"
            style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.6rem", letterSpacing: "0.06em" }}
          >
            {opp.organization.name}
            {isFree   ? " · Free"   : ""}
            {isRemote ? " · Remote" : opp.location.city ? ` · ${opp.location.city}` : ""}
          </div>
        </div>
        <div
          className="shrink-0 text-[#525252] group-hover:text-[#737373] transition-colors"
          style={{ fontFamily: "var(--font-jetbrains, monospace)", fontSize: "0.6rem", letterSpacing: "0.08em" }}
        >
          {fmtDeadline(opp.applicationDeadline)}
        </div>
      </Link>
    </Reveal>
  );
}

// ─── Cursor-spotlight problem row ────────────────────────────────────────────

function SpotlightRow({ title, body, last }: { title: string; body: string; last?: boolean }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef  = useRef<HTMLParagraphElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Direct DOM mutation — zero React re-render on every frame
    glowRef.current.style.background =
      `radial-gradient(circle 550px at ${x}px ${y}px, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)`;
  }, []);

  const onEnter = useCallback(() => {
    setHovered(true);
    if (glowRef.current)  glowRef.current.style.opacity  = "1";
    if (titleRef.current) titleRef.current.style.color   = "#2e2e2e";
    if (bodyRef.current)  bodyRef.current.style.color    = "#737373";
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    if (glowRef.current)  glowRef.current.style.opacity  = "0";
    if (titleRef.current) titleRef.current.style.color   = "#1e1e1e";
    if (bodyRef.current)  bodyRef.current.style.color    = "#3a3a3a";
  }, []);

  void hovered; // used only to satisfy lint — all visual state is imperative

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative overflow-hidden cursor-default py-8"
      style={{ borderBottom: !last ? "1px solid #1a1a1a" : undefined }}
    >
      {/* Spotlight layer — mutated directly */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Ghost headline — mutated directly on hover */}
      <div
        ref={titleRef}
        className="relative font-black leading-none select-none mb-2"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.025em",
          color: "#1e1e1e",
          transition: "color 0.2s ease",
        }}
      >
        {title}
      </div>

      <p
        ref={bodyRef}
        className="relative text-sm max-w-xl leading-relaxed"
        style={{ color: "#3a3a3a", transition: "color 0.2s ease" }}
      >
        {body}
      </p>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  featured: Opportunity[];
  stats: { total: number; free: number; remote: number; noExperienceRequired: number; categories: number };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingScrollSections({ featured, stats }: Props) {
  const DARK = "#0c0c0c";
  const BORDER = "1px solid #1a1a1a";

  return (
    <div className="bg-[#0c0c0c]">

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section style={{ borderTop: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <Label>Browse by interest</Label>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {[
                ["Engineering & Tech",  "/explore?q=engineering"],
                ["Research & Science",  "/explore?q=research"],
                ["Competitions",        "/explore?q=competition"],
                ["Volunteering",        "/explore?q=volunteer"],
                ["Arts & Creative",     "/explore?q=arts"],
                ["Civic & Leadership",  "/explore?q=civic"],
                ["Entrepreneurship",    "/explore?q=entrepreneur"],
                ["Healthcare",          "/explore?q=health"],
                ["Environment",         "/explore?q=environment"],
                ["Journalism",          "/explore?q=journalism"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="px-4 py-2 border border-[#262626] rounded text-sm text-[#737373] hover:border-[#3b82f6] hover:text-white transition-colors duration-150"
                >
                  {name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS ───────────────────────────────────── */}
      <section style={{ borderTop: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal className="flex items-baseline justify-between mb-2">
            <Label>Featured programs</Label>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
            {/* Left column */}
            <div>
              {featured.slice(0, Math.ceil(featured.length / 2)).map((opp, i) => (
                <OppRow key={opp.id} opp={opp} delay={i * 0.04} />
              ))}
            </div>
            {/* Right column */}
            <div>
              {featured.slice(Math.ceil(featured.length / 2)).map((opp, i) => (
                <OppRow key={opp.id} opp={opp} delay={(i + Math.ceil(featured.length / 2)) * 0.04} />
              ))}
            </div>
          </div>

          <Reveal className="mt-8">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm text-[#525252] hover:text-white transition-colors duration-150"
            >
              View all {stats.total}+ programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── THE ACCESS PROBLEM ──────────────────────────────────── */}
      <section style={{ borderTop: BORDER, background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <Label>The problem we solve</Label>
          </Reveal>

          <div>
            {[
              {
                title: "Scattered.",
                body: "Opportunities live on hundreds of different websites — school portals, nonprofit pages, company career sites. Most students never find them.",
              },
              {
                title: "Unequal.",
                body: "Students with well-connected parents or counselors learn about programs others never hear of. Proximity to the right people shouldn't determine access.",
              },
              {
                title: "Invisible.",
                body: "Niche programs in semiconductor engineering, computational biology, or aerospace? Nearly impossible to find the right entry point on your own.",
              },
            ].map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <SpotlightRow title={title} body={body} last={i === 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="text-white font-bold text-xl sm:text-2xl">
              EasyEC puts everything in one place —
              <span className="text-[#3b82f6]"> searchable, verified, free.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHY IT WORKS ────────────────────────────────────────── */}
      <section style={{ borderTop: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <Label>Why EasyEC</Label>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {[
              { title: "One feed for everything",   body: "NASA, nonprofits, universities, and community orgs — all in one place. No more checking 20 different websites."                              },
              { title: "Cost is always visible",    body: "Free, stipend, or scholarship-eligible — shown upfront. Filter for funded programs so cost is never a barrier."                             },
              { title: "Built for beginners",       body: `Find programs that welcome zero experience. ${stats.noExperienceRequired}+ programs on EasyEC require none.`                               },
              { title: "Verified and transparent",  body: "Every listing shows verification status, source, and when it was last checked."                                                             },
              { title: "Track your applications",   body: "Save opportunities, mark your status, and see deadlines in one dashboard."                                                                 },
              { title: "Community-powered",         body: "Students, educators, and orgs all contribute. When one person finds something, everyone benefits."                                         },
            ].map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[#e5e5e5] text-sm font-semibold mb-1">{title}</div>
                    <div className="text-[#525252] text-sm leading-relaxed">{body}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ borderTop: BORDER, background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <Reveal>
            <h2
              className="font-black text-white tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
            >
              Your next big<br />opportunity is<br />
              <span className="text-[#3b82f6]">already out there.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[#525252] text-base mb-8 max-w-sm">
              Start exploring now. No account needed.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-semibold rounded transition-colors duration-150"
            >
              Browse programs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#262626] hover:border-[#404040] text-[#737373] hover:text-white text-sm font-medium rounded transition-colors duration-150"
            >
              Submit a listing
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
