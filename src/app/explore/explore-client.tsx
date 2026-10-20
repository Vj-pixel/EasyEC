"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OpportunityCard, OpportunityCardSkeleton } from "@/components/opportunities/opportunity-card";
import type { Opportunity, SearchFilters, OpportunityType, CostType } from "@/lib/types";
import { CATEGORIES } from "@/lib/data/categories";
import { searchOpportunities } from "@/lib/data/service";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "relevance", label: "Most relevant" },
  { value: "deadline", label: "Deadline (soonest)" },
  { value: "newest", label: "Newest first" },
];

const TYPE_OPTIONS: { value: OpportunityType; label: string }[] = [
  { value: "internship", label: "Internship" },
  { value: "research", label: "Research" },
  { value: "competition", label: "Competition" },
  { value: "summer_program", label: "Summer program" },
  { value: "volunteer", label: "Volunteer" },
  { value: "mentorship", label: "Mentorship" },
  { value: "hackathon", label: "Hackathon" },
  { value: "club", label: "Club / Team" },
  { value: "workshop", label: "Workshop" },
  { value: "scholarship", label: "Scholarship" },
  { value: "apprenticeship", label: "Apprenticeship" },
  { value: "remote_project", label: "Remote project" },
];

const COST_OPTIONS: { value: CostType; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "stipend", label: "Paid / Stipend" },
  { value: "scholarship_available", label: "Scholarship available" },
  { value: "paid", label: "Fee required" },
];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-slate-100 pb-4 mb-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function ExploreClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );
  const [selectedTypes, setSelectedTypes] = useState<OpportunityType[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<CostType[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [noExpRequired, setNoExpRequired] = useState(false);
  const [financialAid, setFinancialAid] = useState(false);
  const [sortBy, setSortBy] = useState<SearchFilters["sortBy"]>("relevance");
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const [results, setResults] = useState<{
    opportunities: Opportunity[];
    total: number;
    totalPages: number;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = useCallback(
    async (overrides: Partial<SearchFilters> = {}) => {
      setHasSearched(true);
      const filters: SearchFilters = {
        query: overrides.query ?? query,
        categories: overrides.categories ?? selectedCategories,
        types: overrides.types ?? (selectedTypes.length > 0 ? selectedTypes : undefined),
        format: overrides.format,
        remote: overrides.remote ?? (remoteOnly ? true : undefined),
        costType: overrides.costType ?? (selectedCosts.length > 0 ? selectedCosts : undefined),
        noExperienceRequired: overrides.noExperienceRequired ?? (noExpRequired ? true : undefined),
        hasFinancialAid: overrides.hasFinancialAid ?? (financialAid ? true : undefined),
        sortBy: overrides.sortBy ?? sortBy,
        page: overrides.page ?? page,
        limit: 12,
      };

      const res = await searchOpportunities(filters);
      setResults({
        opportunities: res.opportunities,
        total: res.total,
        totalPages: res.totalPages,
      });
    },
    [query, selectedCategories, selectedTypes, selectedCosts, remoteOnly, noExpRequired, financialAid, sortBy, page]
  );

  // Run initial search on mount
  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trigger search when any filter changes
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    startTransition(() => runSearch({ page: 1 }));
  };

  const toggleCategory = (id: string) => {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    setSelectedCategories(next);
    startTransition(() => runSearch({ categories: next, page: 1 }));
    setPage(1);
  };

  const toggleType = (t: OpportunityType) => {
    const next = selectedTypes.includes(t)
      ? selectedTypes.filter((x) => x !== t)
      : [...selectedTypes, t];
    setSelectedTypes(next);
    startTransition(() => runSearch({ types: next.length > 0 ? next : undefined, page: 1 }));
    setPage(1);
  };

  const toggleCost = (c: CostType) => {
    const next = selectedCosts.includes(c)
      ? selectedCosts.filter((x) => x !== c)
      : [...selectedCosts, c];
    setSelectedCosts(next);
    startTransition(() => runSearch({ costType: next.length > 0 ? next : undefined, page: 1 }));
    setPage(1);
  };

  const handleSort = (s: SearchFilters["sortBy"]) => {
    setSortBy(s);
    startTransition(() => runSearch({ sortBy: s, page: 1 }));
    setPage(1);
  };

  const handlePage = (p: number) => {
    setPage(p);
    startTransition(() => runSearch({ page: p }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedCosts([]);
    setRemoteOnly(false);
    setNoExpRequired(false);
    setFinancialAid(false);
    setPage(1);
    startTransition(() =>
      runSearch({
        categories: [],
        types: undefined,
        costType: undefined,
        remote: undefined,
        noExperienceRequired: undefined,
        hasFinancialAid: undefined,
        page: 1,
      })
    );
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedTypes.length +
    selectedCosts.length +
    (remoteOnly ? 1 : 0) +
    (noExpRequired ? 1 : 0) +
    (financialAid ? 1 : 0);

  const FilterPanel = () => (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-900 text-sm">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        {CATEGORIES.map((cat) => (
          <Checkbox
            key={cat.id}
            label={cat.name}
            checked={selectedCategories.includes(cat.id)}
            onCheckedChange={() => toggleCategory(cat.id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Type">
        {TYPE_OPTIONS.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={selectedTypes.includes(value)}
            onCheckedChange={() => toggleType(value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Cost">
        {COST_OPTIONS.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={selectedCosts.includes(value)}
            onCheckedChange={() => toggleCost(value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Format & Access">
        <Checkbox
          label="Remote only"
          checked={remoteOnly}
          onCheckedChange={(v) => {
            setRemoteOnly(!!v);
            startTransition(() => runSearch({ remote: v ? true : undefined, page: 1 }));
            setPage(1);
          }}
        />
        <Checkbox
          label="No experience required"
          checked={noExpRequired}
          onCheckedChange={(v) => {
            setNoExpRequired(!!v);
            startTransition(() =>
              runSearch({ noExperienceRequired: v ? true : undefined, page: 1 })
            );
            setPage(1);
          }}
        />
        <Checkbox
          label="Financial aid available"
          checked={financialAid}
          onCheckedChange={(v) => {
            setFinancialAid(!!v);
            startTransition(() =>
              runSearch({ hasFinancialAid: v ? true : undefined, page: 1 })
            );
            setPage(1);
          }}
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Explore page hero header */}
      <div className="bg-gradient-to-br from-[#0a0a0f] via-blue-950 to-[#0a0a0f] border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
            Explore <span className="gradient-text">opportunities</span>
          </h1>
          <p className="text-sm text-slate-400 mb-5">Search across {results?.total ?? "20"}+ programs, internships, and competitions</p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="flex-1 relative group">
              <div className="absolute -inset-[1.5px] bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-[1px]" />
              <div className="relative flex bg-white rounded-xl overflow-hidden shadow-lg">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Try "aerospace", "robotics", or "free summer programs"'
                  className="w-full pl-10 pr-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none h-11"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(""); runSearch({ query: "" }); }}
                    className="pr-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <Button type="submit" size="md" className="h-11 shrink-0">Search</Button>

            {/* Mobile filter toggle */}
            <Button
              type="button"
              variant="outline"
              size="md"
              className="md:hidden gap-1.5 h-11 shrink-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setFilterDrawerOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-60 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-32">
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {results ? (
                    <>
                      <span className="text-blue-600">{results.total}</span>{" "}
                      {results.total === 1 ? "opportunity" : "opportunities"} found
                    </>
                  ) : (
                    "Loading…"
                  )}
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-slate-500 hover:text-slate-700 mt-0.5 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Sort:</span>
                <div className="flex gap-1">
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleSort(value as SearchFilters["sortBy"])}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg transition-colors",
                        sortBy === value
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results grid */}
            {isPending ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <OpportunityCardSkeleton key={i} />
                ))}
              </div>
            ) : results && results.opportunities.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {results.opportunities.map((opp) => (
                    <OpportunityCard
                      key={opp.id}
                      opportunity={opp}
                      saved={savedIds.has(opp.id)}
                      onSave={handleSave}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {results.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePage(page - 1)}
                      disabled={page <= 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-slate-600 px-3">
                      Page {page} of {results.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePage(page + 1)}
                      disabled={page >= results.totalPages}
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : hasSearched ? (
              <div className="text-center py-20">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">No opportunities found</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
                  Try adjusting your search terms or removing some filters to see more results.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <OpportunityCardSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterDrawerOpen(false)} />
          <div className="relative ml-auto w-80 bg-white h-full overflow-y-auto p-5 animate-slide-in shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Filters</h2>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <FilterPanel />
            <div className="mt-4">
              <Button className="w-full" onClick={() => setFilterDrawerOpen(false)}>
                Apply filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
