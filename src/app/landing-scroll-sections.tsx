"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Opportunity } from "@/lib/types";

// ─── Design tokens (mirror landing-hero) ─────────────────────────────────────
const BG      = "#f5f0e8";
const INK     = "#1a1408";
const RED     = "#c8291a";
const MUTED   = "#7a6e5e";
const BG_DARK = "#1a1408";

const DISPLAY = "var(--font-fraunces), 'Georgia', serif";
const BODY    = "var(--font-newsreader), 'Georgia', serif";
const MONO    = "var(--font-jetbrains), 'Courier New', monospace";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDeadline(iso?: string): string {
  if (!iso) return "Rolling";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtCost(cost?: string): string {
  if (!cost || cost === "free") return "Free";
  if (cost === "paid") return "Paid";
  if (cost === "stipend") return "Stipend";
  if (cost === "scholarship") return "Scholarship";
  return cost;
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Directory listing row ────────────────────────────────────────────────────

function ListingRow({ opp, index }: { opp: Opportunity; index: number }) {
  return (
    <Reveal delay={index * 0.04}>
      <Link
        href={`/opportunity/${opp.id}`}
        style={{ borderBottom: `1px solid ${INK}`, display: "block" }}
        className="group py-4 block hover:bg-[#f0ead8] transition-colors duration-150"
      >
        <div className="px-5 sm:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: INK,
              }}
              className="group-hover:text-[#c8291a] transition-colors duration-150"
            >
              {opp.title}
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.08em", color: RED }}>
              {fmtDeadline(opp.applicationDeadline)}
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.06em", color: MUTED, marginTop: "0.2rem" }}>
            {opp.organization.name}
            {opp.minGrade && opp.maxGrade ? ` · Grades ${opp.minGrade}–${opp.maxGrade}` : ""}
            {opp.costType ? ` · ${fmtCost(opp.costType)}` : ""}
            {opp.location.isRemote ? " · Remote" : opp.location.city ? ` · ${opp.location.city}` : ""}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  featured: Opportunity[];
  stats: {
    total: number;
    free: number;
    remote: number;
    noExperienceRequired: number;
    categories: number;
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingScrollSections({ featured, stats }: Props) {
  return (
    <div style={{ background: BG, color: INK }}>

      {/* ── DECK INTRO ──────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${INK}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.16em", color: MUTED, marginBottom: "1rem" }}>
                ABOUT THIS ISSUE
              </div>
              <p style={{ fontFamily: BODY, fontSize: "clamp(1.15rem, 2.8vw, 1.5rem)", lineHeight: 1.55 }}>
                EasyEC is a directory of extracurricular opportunities for high school students —
                internships, research programs, competitions, and more. Every listing is verified
                by a human. All free to access.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── DIRECTORY ───────────────────────────────────────────── */}
      <section>
        <Reveal>
          <div
            className="max-w-7xl mx-auto px-5 sm:px-8 flex items-baseline justify-between py-3"
            style={{ borderBottom: `3px solid ${INK}` }}
          >
            <div style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.16em" }}>
              DIRECTORY — SELECTED PROGRAMS
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.1em", color: MUTED }}>
              DEADLINE
            </div>
          </div>
        </Reveal>

        {featured.map((opp, i) => (
          <ListingRow key={opp.id} opp={opp} index={i} />
        ))}

        <Reveal>
          <div
            className="max-w-7xl mx-auto px-5 sm:px-8 py-5"
            style={{ borderBottom: `1px solid ${INK}` }}
          >
            <Link
              href="/explore"
              style={{
                fontFamily: BODY,
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: RED,
              }}
              className="hover:underline underline-offset-2"
            >
              View all {stats.total}+ programs in the directory →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── PULL QUOTE ──────────────────────────────────────────── */}
      <Reveal>
        <div
          style={{
            borderBottom: `1px solid ${INK}`,
            padding: "5rem 1.25rem",
            textAlign: "center",
          }}
        >
          <blockquote
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.25,
              maxWidth: "780px",
              margin: "0 auto",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;Most students don&apos;t fail to get into programs.
            They fail to find out the programs exist.&rdquo;
          </blockquote>
          <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", color: MUTED, marginTop: "2rem" }}>
            — THE PROBLEM WE&apos;RE HERE TO FIX
          </div>
        </div>
      </Reveal>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${INK}` }}>
        <Reveal>
          <div
            className="max-w-7xl mx-auto px-5 sm:px-8 py-3"
            style={{ borderBottom: `3px solid ${INK}` }}
          >
            <div style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.16em" }}>
              HOW IT WORKS
            </div>
          </div>
        </Reveal>

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ borderColor: INK }}
          >
            {[
              {
                n: "1.",
                heading: "Browse the directory.",
                body: "Search by field, deadline, grade level, cost, or location. Every listing links directly to the source — no middleman, no account required.",
              },
              {
                n: "2.",
                heading: "Check the fine print.",
                body: "Each listing shows who runs it, when it was last verified, eligibility requirements, and whether it’s free. No surprises.",
              },
              {
                n: "3.",
                heading: "Apply directly.",
                body: "We point you to the program’s own application. We don’t touch the process, charge a fee, or promise anything. That part is up to you.",
              },
            ].map(({ n, heading, body }, i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div
                  className="py-10"
                  style={{
                    paddingLeft: i === 0 ? 0 : "2rem",
                    paddingRight: i === 2 ? 0 : "2rem",
                    borderLeft: i > 0 ? `1px solid ${INK}` : undefined,
                  }}
                >
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                      fontWeight: 900,
                      color: "#d4caba",
                      lineHeight: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {n}
                  </div>
                  <h3
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "0.6rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {heading}
                  </h3>
                  <p style={{ fontFamily: BODY, fontSize: "0.9rem", lineHeight: 1.65, color: MUTED }}>
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASSIFIED CTA ──────────────────────────────────────── */}
      <Reveal>
        <div
          style={{ borderBottom: `1px solid ${INK}`, background: BG_DARK, color: BG }}
          className="py-14 px-5 sm:px-8"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.16em", color: "#7a7060", marginBottom: "0.5rem" }}>
                KNOW A PROGRAM WE MISSED?
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.15 }}>
                Submit a listing.<br />
                <span style={{ color: "#d4caba", fontWeight: 400, fontStyle: "italic" }}>We review everything by hand.</span>
              </p>
            </div>
            <Link
              href="/submit"
              style={{
                fontFamily: BODY,
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: BG,
                border: `1px solid ${BG}`,
                padding: "0.6rem 1.4rem",
                display: "inline-block",
                flexShrink: 0,
              }}
              className="hover:bg-white hover:text-[#1a1408] transition-colors duration-150"
            >
              Submit a listing →
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ── COLOPHON ────────────────────────────────────────────── */}
      <Reveal>
        <footer className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ borderBottom: `1px solid #d4caba`, paddingBottom: "2rem", marginBottom: "1.5rem" }}
          >
            <div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.14em", color: MUTED, marginBottom: "0.5rem" }}>
                PUBLICATION
              </div>
              <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: MUTED, lineHeight: 1.6 }}>
                EasyEC is published online and updated weekly. All listings are verified
                by hand. Vol. 1, Issue 1, Fall 2025.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.14em", color: MUTED, marginBottom: "0.5rem" }}>
                QUICK LINKS
              </div>
              <div style={{ fontFamily: BODY, fontSize: "0.8rem" }} className="space-y-1">
                {[
                  ["Browse opportunities", "/explore"],
                  ["Submit a listing",     "/submit"],
                  ["Education news",       "/education"],
                  ["Admin portal",         "/admin"],
                ].map(([label, href]) => (
                  <div key={href}>
                    <Link href={href} style={{ color: MUTED }} className="hover:underline underline-offset-2">
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.14em", color: MUTED, marginBottom: "0.5rem" }}>
                MISSION
              </div>
              <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: MUTED, lineHeight: 1.6 }}>
                Built for the Congressional App Challenge. Every student deserves access
                to opportunities that match their interests — not just the ones who know
                the right people.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.1em", color: MUTED }}>
              © 2025 EASYEC · ALL LISTINGS VERIFIED BY HAND · PRINTED ON THE INTERNET
            </span>
            <Link
              href="/auth/register"
              style={{ fontFamily: BODY, fontSize: "0.8rem", fontStyle: "italic", color: RED }}
              className="hover:underline underline-offset-2"
            >
              Create an account →
            </Link>
          </div>
        </footer>
      </Reveal>

    </div>
  );
}
