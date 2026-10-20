import { Suspense } from "react";
import type { Metadata } from "next";
import { ExploreClient } from "./explore-client";

export const metadata: Metadata = {
  title: "Explore Opportunities",
  description: "Search and filter thousands of extracurricular opportunities for high school students.",
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64 text-slate-500 text-sm">Loading...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
