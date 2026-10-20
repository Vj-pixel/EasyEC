import { getFeaturedOpportunities, getOpportunityStats } from "@/lib/data/service";
import { LandingHero } from "./landing-hero";
import { LandingScrollSections } from "./landing-scroll-sections";

export default async function HomePage() {
  const [featured, stats] = await Promise.all([getFeaturedOpportunities(8), getOpportunityStats()]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <LandingHero stats={stats} />
      <LandingScrollSections featured={featured} stats={stats} />
    </div>
  );
}
