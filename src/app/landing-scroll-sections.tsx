"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import anime from "animejs";
import {
  ArrowRight,
  Cpu,
  FlaskConical,
  Trophy,
  Heart,
  Palette,
  Landmark,
  Lightbulb,
  Stethoscope,
  Leaf,
  PenLine,
  Globe,
  DollarSign,
  Users,
  Shield,
  CheckCircle,
  Network,
} from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Marquee } from "@/components/ui/marquee";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import type { Opportunity } from "@/lib/types";
import {
  fadeUp,
  fadeLeft,
  scaleIn,
  staggerContainer,
  spring,
  springFast,
  ease,
  easeSlow,
} from "@/lib/motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Engineering & Tech", icon: Cpu,         color: "from-blue-600 to-indigo-800",   slug: "engineering" },
  { name: "Research & Science", icon: FlaskConical, color: "from-emerald-500 to-teal-700",   slug: "research"    },
  { name: "Competitions",       icon: Trophy,       color: "from-amber-500 to-orange-600",   slug: "competition" },
  { name: "Volunteering",       icon: Heart,        color: "from-green-500 to-emerald-700",  slug: "volunteer"   },
  { name: "Arts & Creative",    icon: Palette,      color: "from-pink-500 to-rose-700",      slug: "arts"        },
  { name: "Civic & Leadership", icon: Landmark,     color: "from-cyan-500 to-sky-700",       slug: "civic"       },
  { name: "Entrepreneurship",   icon: Lightbulb,    color: "from-blue-500 to-indigo-700",    slug: "entrepreneur"},
  { name: "Healthcare",         icon: Stethoscope,  color: "from-red-500 to-rose-700",       slug: "health"      },
  { name: "Environment",        icon: Leaf,         color: "from-teal-500 to-green-700",     slug: "environment" },
  { name: "Journalism",         icon: PenLine,      color: "from-orange-500 to-amber-700",   slug: "journalism"  },
];

const FEATURES = [
  { icon: Globe,        title: "One feed for everything",   accent: "bg-blue-600",   body: "NASA, nonprofits, universities, and community orgs — all in one place. No more checking 20 different websites." },
  { icon: DollarSign,  title: "Cost is always visible",    accent: "bg-green-600",  body: "Free, stipend, or scholarship-eligible — we show it upfront. Filter for funded programs so cost is never a barrier." },
  { icon: Users,       title: "Built for beginners",       accent: "bg-violet-600", body: "Find programs that welcome zero experience. Not just prestigious internships with 10 prerequisites." },
  { icon: Shield,      title: "Verified & transparent",    accent: "bg-amber-600",  body: "Every listing shows verification status, source, and when it was last checked. Know what you're applying to." },
  { icon: CheckCircle, title: "Track your applications",   accent: "bg-cyan-600",   body: "Save opportunities, mark your status, and see deadlines in one dashboard. We never touch your actual application." },
  { icon: Network,     title: "Community-powered",         accent: "bg-pink-600",   body: "Students, educators, and orgs all contribute. When one person discovers something, everyone benefits." },
];

const PROBLEM_LINES = [
  { stat: "Scattered",  description: "Opportunities are spread across hundreds of school websites, nonprofit pages, company portals, and newsletters. Most students never find them." },
  { stat: "Unequal",    description: "Students with well-connected parents or counselors learn about programs others never hear of. We think that's fixable." },
  { stat: "Invisible",  description: "Niche fields like semiconductor engineering, computational biology, or aerospace? Nearly impossible to find the right entry points alone." },
];

// ─── Section label component ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3"
    >
      {children}
    </motion.p>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  featured: Opportunity[];
  stats: { total: number; free: number; remote: number; noExperienceRequired: number; categories: number };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LandingScrollSections({ featured, stats }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const categoryGridRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);

  // Parallax: hero section drifts as you scroll past
  const { scrollY } = useScroll();
  const statsY = useTransform(scrollY, [0, 400], [0, -30]);

  // anime.js: category card stagger on scroll
  useEffect(() => {
    const grid = categoryGridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(".cat-card");
    if (!cards.length) return;

    // Start hidden
    anime.set(cards, { opacity: 0, translateY: 24, scale: 0.94 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        anime({
          targets: cards,
          opacity: [0, 1],
          translateY: [24, 0],
          scale: [0.94, 1],
          duration: 600,
          delay: anime.stagger(55),
          easing: "easeOutExpo",
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // anime.js: features grid stagger
  useEffect(() => {
    const grid = featuresGridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(".feat-card");
    if (!cards.length) return;

    anime.set(cards, { opacity: 0, translateY: 32 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        anime({
          targets: cards,
          opacity: [0, 1],
          translateY: [32, 0],
          duration: 650,
          delay: anime.stagger(70),
          easing: "easeOutExpo",
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── STATS ──────────────────────────────────────────────── */}
      <motion.section
        style={{ y: statsY }}
        className="bg-white border-b border-slate-100 py-16 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={ease}
            className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-10"
          >
            By the numbers
          </motion.p>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { value: stats.total,                suffix: "+", label: "Opportunities",     sub: "and growing"          },
              { value: stats.free,                 suffix: "+", label: "Free programs",     sub: "no cost to apply"     },
              { value: stats.remote,               suffix: "+", label: "Remote options",    sub: "apply from anywhere"  },
              { value: stats.noExperienceRequired, suffix: "+", label: "Beginner-friendly", sub: "no experience needed" },
            ].map(({ value, suffix, label, sub }) => (
              <motion.div key={label} variants={fadeUp} transition={ease} className="text-center">
                <div className="text-5xl sm:text-6xl font-black text-slate-900 tabular-nums mb-1">
                  <AnimatedCounter end={value} suffix={suffix} duration={1.5} />
                </div>
                <div className="text-base font-semibold text-slate-700">{label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── CATEGORIES ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer(0.06, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <SectionLabel>Browse by interest</SectionLabel>
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                What are you
                <br />
                <span className="gradient-text">curious about?</span>
              </h2>
              <Link href="/explore" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                All categories <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div
            ref={categoryGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {CATEGORIES.map(({ name, icon: Icon, color, slug }) => (
              <motion.div
                key={name}
                className="cat-card"
                whileHover={{ scale: 1.04, transition: springFast }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={`/explore?q=${encodeURIComponent(slug)}`}
                  className="group relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 bg-white border border-slate-200 h-full"
                >
                  {/* Gradient fill on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${color}`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className={`relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="relative z-10 text-sm font-semibold text-slate-800 group-hover:text-white transition-colors leading-tight">
                    {name}
                  </span>
                  <motion.div
                    className="relative z-10"
                    initial={{ x: -4, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED OPPORTUNITIES (drag carousel) ─────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <SectionLabel>Featured this week</SectionLabel>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Opportunities
                <br />
                <span className="gradient-text">worth knowing about</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-sm text-slate-400 hidden sm:block">
              ← drag to explore →
            </motion.p>
          </motion.div>
        </div>

        {/* Draggable carousel */}
        <motion.div
          ref={carouselRef}
          className="flex gap-4 px-4 sm:px-6 cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ right: 0, left: -(340 * (featured.length - 2)) }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 35 }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {/* Left spacer */}
          <div className="shrink-0 w-[max(0px,calc((100vw-1152px)/2-16px))]" />
          {featured.map((opp, i) => (
            <motion.div
              key={opp.id}
              className="shrink-0 w-[300px] sm:w-[340px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ ...ease, delay: i * 0.06 }}
              whileHover={{ y: -4, transition: springFast }}
            >
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
          <div className="shrink-0 w-[max(0px,calc((100vw-1152px)/2-16px))]" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={ease}
          >
            <Link href="/explore">
              <Button variant="outline" size="lg" className="gap-2">
                Browse all {stats.total}+ opportunities
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ────────────────────────────────────── */}
      <div className="bg-blue-600 py-4 overflow-hidden">
        <Marquee
          items={["Internships", "Research", "Competitions", "Scholarships", "Hackathons", "Volunteering", "Mentorship", "Summer Programs", "Apprenticeships", "Remote Projects", "Science Fairs", "Clubs"]}
          speed={25}
          itemClassName="text-blue-100 font-medium text-sm"
          reverse
        />
      </div>

      {/* ─── WHY EASYEC ─────────────────────────────────────────── */}
      <section className="bg-[#0a0a0f] py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-14 max-w-xl"
          >
            <SectionLabel>Why EasyEC</SectionLabel>
            <motion.h2 variants={fadeUp} transition={easeSlow} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Built for the student who{" "}
              <span className="gradient-text">doesn&apos;t know anyone</span>{" "}
              in the room.
            </motion.h2>
          </motion.div>

          <div
            ref={featuresGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map(({ icon: Icon, title, body, accent }) => (
              <motion.div
                key={title}
                className="feat-card p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] cursor-default"
                whileHover={{ scale: 1.03, y: -4, transition: springFast }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="font-bold text-white mb-2 text-base">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE ACCESS PROBLEM ─────────────────────────────────── */}
      <section className="bg-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8"
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-0 text-center">
              The problem we solve
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {PROBLEM_LINES.map(({ stat, description }, i) => (
              <motion.div
                key={stat}
                variants={fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...ease, delay: i * 0.1 }}
                whileHover={{ x: 4, transition: springFast }}
                className="flex items-start gap-6 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors duration-300 cursor-default"
              >
                <div className="shrink-0 text-2xl sm:text-3xl font-black text-slate-200 w-28 leading-none pt-1">
                  {stat}
                </div>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...ease, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-xl sm:text-2xl font-bold text-slate-900">
              EasyEC puts everything in one place —
              <br />
              <span className="gradient-text">searchable, verified, and free.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="relative bg-blue-600 overflow-hidden py-28 px-4 sm:px-6">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/30 rounded-full blur-[80px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-64 bg-violet-600/30 rounded-full blur-[80px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={fadeUp} transition={easeSlow} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              Your next big
              <br />opportunity is
              <br />
              <span className="text-blue-200">already out there.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-blue-100 text-lg mb-10">
              Start exploring now — no account needed.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springFast}
                >
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-base font-bold px-8 gap-2 shadow-lg w-full sm:w-auto">
                    Start exploring <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/submit">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springFast}
                >
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/30 text-base font-semibold px-8 w-full sm:w-auto">
                    Submit an opportunity
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
