import type { Opportunity, SearchFilters, SearchResult, Category } from "@/lib/types";
import { DEMO_OPPORTUNITIES } from "./opportunities";
import { CATEGORIES } from "./categories";

// In-memory store — swap for Supabase queries when DB is configured
let opportunityStore: Opportunity[] = [...DEMO_OPPORTUNITIES];

function matchesFilters(opp: Opportunity, filters: SearchFilters): boolean {
  const {
    query,
    categories,
    types,
    format,
    minGrade,
    maxGrade,
    costType,
    remote,
    noExperienceRequired,
    hasFinancialAid,
    experienceLevel,
    verificationStatus,
  } = filters;

  if (query && query.trim()) {
    const q = query.toLowerCase();
    const searchText = [
      opp.title,
      opp.description,
      opp.whatYouWillDo,
      opp.organization.name,
      ...opp.categories.map((c) => c.name),
      opp.location.city ?? "",
      opp.location.state ?? "",
    ]
      .join(" ")
      .toLowerCase();
    if (!searchText.includes(q)) return false;
  }

  if (categories && categories.length > 0) {
    const oppCatIds = opp.categories.map((c) => c.id);
    if (!categories.some((id) => oppCatIds.includes(id))) return false;
  }

  if (types && types.length > 0) {
    if (!types.includes(opp.type)) return false;
  }

  if (format && format.length > 0) {
    if (!format.includes(opp.format)) return false;
  }

  if (remote === true) {
    if (!opp.location.isRemote && opp.format !== "remote") return false;
  }

  if (minGrade !== undefined && opp.maxGrade !== undefined) {
    if (opp.maxGrade < minGrade) return false;
  }

  if (maxGrade !== undefined && opp.minGrade !== undefined) {
    if (opp.minGrade > maxGrade) return false;
  }

  if (costType && costType.length > 0) {
    if (!costType.includes(opp.costType)) return false;
  }

  if (noExperienceRequired === true) {
    if (!opp.noExperienceRequired) return false;
  }

  if (hasFinancialAid === true) {
    if (!opp.financialAidAvailable) return false;
  }

  if (experienceLevel && experienceLevel.length > 0) {
    if (!experienceLevel.includes(opp.experienceLevel)) return false;
  }

  if (verificationStatus && verificationStatus.length > 0) {
    if (!verificationStatus.includes(opp.verificationStatus)) return false;
  }

  // Only show published opportunities
  if (opp.publicationStatus !== "published") return false;

  return true;
}

function scoreOpportunity(opp: Opportunity, filters: SearchFilters): number {
  let score = 0;

  // Deadline proximity (more urgent = slightly higher for deadline sort)
  if (opp.applicationDeadline) {
    const days = Math.ceil(
      (new Date(opp.applicationDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (days > 0 && days < 30) score += 10;
    if (days < 0) score -= 100; // deprioritize expired
  }

  // Verification quality
  if (opp.verificationStatus === "official_source") score += 5;
  if (opp.verificationStatus === "provider_confirmed") score += 4;
  if (opp.verificationStatus === "may_be_outdated") score -= 3;

  // Save count as mild popularity signal
  score += Math.min((opp.saveCount ?? 0) / 50, 5);

  return score;
}

function sortOpportunities(
  opportunities: Opportunity[],
  sortBy: SearchFilters["sortBy"],
  filters: SearchFilters
): Opportunity[] {
  return [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case "deadline": {
        const da = a.applicationDeadline ? new Date(a.applicationDeadline).getTime() : Infinity;
        const db = b.applicationDeadline ? new Date(b.applicationDeadline).getTime() : Infinity;
        return da - db;
      }
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "relevance":
      default:
        return scoreOpportunity(b, filters) - scoreOpportunity(a, filters);
    }
  });
}

export async function searchOpportunities(filters: SearchFilters): Promise<SearchResult> {
  const limit = filters.limit ?? 12;
  const page = filters.page ?? 1;

  const matched = opportunityStore.filter((opp) => matchesFilters(opp, filters));
  const sorted = sortOpportunities(matched, filters.sortBy ?? "relevance", filters);

  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  return {
    opportunities: paginated,
    total: matched.length,
    page,
    totalPages: Math.ceil(matched.length / limit),
    filters,
  };
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  return opportunityStore.find((o) => o.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getFeaturedOpportunities(limit = 6): Promise<Opportunity[]> {
  return opportunityStore
    .filter((o) => o.publicationStatus === "published")
    .sort((a, b) => (b.saveCount ?? 0) - (a.saveCount ?? 0))
    .slice(0, limit);
}

export async function getRelatedOpportunities(opp: Opportunity, limit = 3): Promise<Opportunity[]> {
  const catIds = opp.categories.map((c) => c.id);
  return opportunityStore
    .filter(
      (o) =>
        o.id !== opp.id &&
        o.publicationStatus === "published" &&
        o.categories.some((c) => catIds.includes(c.id))
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export async function getOpportunityStats() {
  const published = opportunityStore.filter((o) => o.publicationStatus === "published");
  const withDeadline = published.filter((o) => o.applicationDeadline);
  const free = published.filter((o) => o.costType === "free");
  const remote = published.filter((o) => o.location.isRemote || o.format === "remote");
  const noExp = published.filter((o) => o.noExperienceRequired);

  return {
    total: published.length,
    withDeadline: withDeadline.length,
    free: free.length,
    remote: remote.length,
    noExperienceRequired: noExp.length,
    categories: CATEGORIES.length,
  };
}
