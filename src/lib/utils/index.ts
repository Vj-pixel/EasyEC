import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CostType, OpportunityType, VerificationStatus } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDeadline(deadline?: string, nowMs?: number): string {
  if (!deadline) return "Deadline unknown";
  const date = new Date(deadline);
  const now = nowMs ?? Date.now();
  const diff = date.getTime() - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return "Deadline passed";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= 7) return `${days} days left`;
  if (days <= 30) return `${Math.ceil(days / 7)} weeks left`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "Unknown";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function deadlineUrgency(
  deadline?: string,
  nowMs?: number
): "none" | "low" | "medium" | "high" | "critical" {
  if (!deadline) return "none";
  const date = new Date(deadline);
  const now = nowMs ?? Date.now();
  const diff = date.getTime() - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "none";
  if (days <= 3) return "critical";
  if (days <= 7) return "high";
  if (days <= 14) return "medium";
  if (days <= 30) return "low";
  return "none";
}

export function costLabel(costType: CostType, amount?: number, stipend?: number): string {
  switch (costType) {
    case "free":
      return "Free";
    case "paid":
      return amount ? `$${amount} fee` : "Fee required";
    case "stipend":
      return stipend ? `$${stipend} stipend` : "Paid stipend";
    case "scholarship_available":
      return "Scholarship available";
    default:
      return "Cost unknown";
  }
}

export function gradeLabel(min?: number, max?: number): string {
  if (!min && !max) return "All grades";
  if (min && !max) return `Grade ${min}+`;
  if (!min && max) return `Up to grade ${max}`;
  if (min === max) return `Grade ${min}`;
  return `Grades ${min}–${max}`;
}

export function verificationLabel(status: VerificationStatus): string {
  const labels: Record<VerificationStatus, string> = {
    official_source: "Official source",
    provider_confirmed: "Provider confirmed",
    community_submitted: "Community submitted",
    under_review: "Under review",
    may_be_outdated: "May be outdated",
  };
  return labels[status];
}

export function typeLabel(type: OpportunityType): string {
  const labels: Record<OpportunityType, string> = {
    internship: "Internship",
    research: "Research",
    competition: "Competition",
    volunteer: "Volunteer",
    summer_program: "Summer Program",
    mentorship: "Mentorship",
    scholarship: "Scholarship",
    hackathon: "Hackathon",
    club: "Club / Team",
    workshop: "Workshop",
    apprenticeship: "Apprenticeship",
    remote_project: "Remote Project",
    other: "Other",
  };
  return labels[type] ?? "Other";
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isExpired(deadline?: string, nowMs?: number): boolean {
  if (!deadline) return false;
  return new Date(deadline).getTime() < (nowMs ?? Date.now());
}

export function formatRelativeDate(dateStr: string, nowMs?: number): string {
  const date = new Date(dateStr);
  const now = nowMs ?? Date.now();
  const diff = now - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
