import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-stem",
    name: "Engineering & Technology",
    slug: "engineering-technology",
    color: "#7c3aed",
    icon: "Cpu",
    description: "Software, hardware, robotics, and applied engineering",
  },
  {
    id: "cat-research",
    name: "Research & Science",
    slug: "research-science",
    color: "#059669",
    icon: "FlaskConical",
    description: "Academic and applied research across all sciences",
  },
  {
    id: "cat-competition",
    name: "Competitions",
    slug: "competitions",
    color: "#d97706",
    icon: "Trophy",
    description: "Academic, STEM, arts, and leadership competitions",
  },
  {
    id: "cat-volunteer",
    name: "Volunteering & Service",
    slug: "volunteering-service",
    color: "#16a34a",
    icon: "Heart",
    description: "Community service, nonprofits, and social impact",
  },
  {
    id: "cat-arts",
    name: "Arts & Creative",
    slug: "arts-creative",
    color: "#ec4899",
    icon: "Palette",
    description: "Visual arts, music, design, film, and creative writing",
  },
  {
    id: "cat-civic",
    name: "Civic & Leadership",
    slug: "civic-leadership",
    color: "#0891b2",
    icon: "Landmark",
    description: "Government, advocacy, policy, and community leadership",
  },
  {
    id: "cat-entrepreneurship",
    name: "Entrepreneurship",
    slug: "entrepreneurship",
    color: "#2563eb",
    icon: "Lightbulb",
    description: "Startups, innovation, business, and hackathons",
  },
  {
    id: "cat-health",
    name: "Healthcare & Life Sciences",
    slug: "healthcare-life-sciences",
    color: "#dc2626",
    icon: "Stethoscope",
    description: "Medicine, biology, public health, and biotech",
  },
  {
    id: "cat-environment",
    name: "Environment & Sustainability",
    slug: "environment-sustainability",
    color: "#15803d",
    icon: "Leaf",
    description: "Environmental science, conservation, and clean tech",
  },
  {
    id: "cat-journalism",
    name: "Journalism & Writing",
    slug: "journalism-writing",
    color: "#92400e",
    icon: "PenLine",
    description: "Reporting, publishing, blogging, and creative writing",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);
