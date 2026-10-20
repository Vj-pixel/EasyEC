"use client";

import { useEffect } from "react";
import Link from "next/link";
import anime from "animejs";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG    = "#f5f0e8";
const INK   = "#1a1408";
const RED   = "#c8291a";
const MUTED = "#7a6e5e";

const DISPLAY  = "var(--font-fraunces), 'Georgia', serif";
const BODY     = "var(--font-newsreader), 'Georgia', serif";
const MONO     = "var(--font-jetbrains), 'Courier New', monospace";

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  stats: { total: number; free: number; remote: number; noExperienceRequired: number };
}

export function LandingHero({ stats }: Props) {
  // Staggered entrance — one pass, nothing else animated
  useEffect(() => {
    anime({
      targets: ".ed-reveal",
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 480,
      delay: anime.stagger(65, { start: 80 }),
      easing: "easeOutCubic",
    });
  }, []);

  return (
    <div style={{ background: BG, color: INK, fontFamily: BODY, minHeight: "100vh" }}>

      {/* ── MASTHEAD ──────────────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${INK}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Top bar: issue info */}
          <div
            className="ed-reveal flex items-center justify-between py-2"
            style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.08em", color: MUTED }}
          >
            <span>VOL. 1, ISSUE 1 · FALL 2025</span>
            <span>BAY AREA PILOT</span>
          </div>

          {/* Brand */}
          <div className="ed-reveal py-4 text-center border-t" style={{ borderColor: INK }}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(2.8rem, 8vw, 6rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              EasyEC
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                color: MUTED,
                marginTop: "0.35rem",
                textTransform: "uppercase",
              }}
            >
              The Extracurricular Intelligence Briefing
            </div>
          </div>
        </div>
      </div>

      {/* ── TOC NAV ───────────────────────────────────────────── */}
      <div style={{ borderBottom: `3px solid ${INK}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="ed-reveal flex flex-wrap items-center gap-x-6 gap-y-1 py-2.5">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 flex-1">
              {[
                ["Opportunities", "/explore"],
                ["Research",      "/explore?q=research"],
                ["Competitions",  "/explore?q=competition"],
                ["Free programs", "/explore?q=free"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{ fontFamily: BODY, fontSize: "0.8rem", color: INK }}
                  className="hover:underline underline-offset-2"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4 ml-auto">
              <Link
                href="/submit"
                style={{ fontFamily: BODY, fontSize: "0.8rem", color: RED, fontStyle: "italic" }}
                className="hover:underline underline-offset-2"
              >
                Submit a listing →
              </Link>
              <Link
                href="/auth/signin"
                style={{ fontFamily: MONO, fontSize: "0.7rem", letterSpacing: "0.06em", color: MUTED }}
                className="hover:underline underline-offset-2"
              >
                SIGN IN
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO GRID ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Deck / overline */}
        <div
          className="ed-reveal pt-8 pb-5"
          style={{
            fontFamily: BODY,
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            fontStyle: "italic",
            color: MUTED,
            borderBottom: `1px solid ${INK}`,
          }}
        >
          For the student who doesn&apos;t know the right people.
        </div>

        {/* Two-column: headline left, sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1px_1fr] gap-0 py-10">

          {/* Left: headline + CTA */}
          <div className="pr-0 lg:pr-10">
            <h1
              className="ed-reveal"
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                marginBottom: "2rem",
              }}
            >
              The Guide<br />
              to Getting In<br />
              Before You<br />
              Know Anyone.
            </h1>

            <div
              className="ed-reveal flex flex-wrap items-center gap-5"
              style={{ borderTop: `1px solid ${INK}`, paddingTop: "1.5rem" }}
            >
              <Link
                href="/explore"
                style={{
                  fontFamily: BODY,
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: RED,
                  textDecoration: "none",
                }}
                className="hover:underline underline-offset-2 flex items-center gap-1.5"
              >
                Browse the directory →
              </Link>
              <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: MUTED, letterSpacing: "0.06em" }}>
                {stats.total}+ programs · free to use
              </span>
            </div>
          </div>

          {/* Vertical rule */}
          <div
            className="hidden lg:block"
            style={{ background: INK, width: "1px" }}
          />

          {/* Right: sidebar rundown */}
          <div className="ed-reveal hidden lg:block pl-10 pt-0">
            {[
              {
                label: "THIS ISSUE",
                body: "Aerospace, research, competitions, and remote-friendly programs across every field.",
              },
              {
                label: "VERIFIED",
                body: "Every listing reviewed by hand. Source and last-checked date visible on each program.",
              },
              {
                label: "OPEN TO",
                body: `All grades. ${stats.noExperienceRequired}+ programs require no prior experience.`,
              },
              {
                label: "COST",
                body: `${stats.free}+ free programs. Cost is always shown upfront.`,
              },
            ].map(({ label, body }, i) => (
              <div
                key={label}
                style={{ borderBottom: i < 3 ? `1px solid ${INK}` : undefined, paddingBottom: "1rem", marginBottom: "1rem" }}
              >
                <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.14em", color: MUTED, marginBottom: "0.3rem" }}>
                  {label}
                </div>
                <div style={{ fontFamily: BODY, fontSize: "0.85rem", lineHeight: 1.5 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOLIO ─────────────────────────────────────────────── */}
        <div
          className="ed-reveal flex flex-wrap items-center justify-between gap-2 py-3"
          style={{
            borderTop: `1px solid ${INK}`,
            fontFamily: MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: MUTED,
          }}
        >
          <span>EASYEC · easyec.com</span>
          <span>FALL 2025</span>
          <span>{stats.total}+ PROGRAMS</span>
        </div>
      </div>
    </div>
  );
}
