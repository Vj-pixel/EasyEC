import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, AlertCircle, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Education News" };

const NEWS_ITEMS = [
  {
    id: "n1",
    title: "Common App Deadline Reminders for Class of 2027",
    summary:
      "The Common Application Regular Decision deadline for most schools is January 1, 2027. Many highly selective schools have Early Decision II deadlines of January 1–15, 2027. Check each school's individual requirements.",
    sourceName: "Common App",
    sourceUrl: "https://www.commonapp.org",
    publishedAt: "2026-10-15",
    category: "admissions",
    isOfficial: true,
    tags: ["college apps", "deadlines", "common app"],
  },
  {
    id: "n2",
    title: "SAT to Continue Digital Testing in 2027",
    summary:
      "The College Board has confirmed that the SAT will continue in its fully digital format through 2027. The Bluebook app is required for test day. Students should verify testing center availability and register early.",
    sourceName: "College Board",
    sourceUrl: "https://collegeboard.org",
    publishedAt: "2026-10-10",
    category: "testing",
    isOfficial: true,
    tags: ["SAT", "testing", "digital SAT"],
  },
  {
    id: "n3",
    title: "FAFSA 2027–2028 Opens December 2026",
    summary:
      "The 2027–2028 Free Application for Federal Student Aid (FAFSA) is expected to open in December 2026. Students and families are encouraged to gather financial documents ahead of time. Many states and schools have early priority deadlines.",
    sourceName: "Federal Student Aid",
    sourceUrl: "https://studentaid.gov",
    publishedAt: "2026-10-08",
    category: "financial_aid",
    isOfficial: true,
    tags: ["FAFSA", "financial aid", "college"],
  },
  {
    id: "n4",
    title: "UC System Application Opens for Fall 2027",
    summary:
      "The University of California application for Fall 2027 admission opens November 1, 2026, with the submission window running November 1–30. The 8 UCs participate in this shared application.",
    sourceName: "University of California",
    sourceUrl: "https://admission.universityofcalifornia.edu",
    publishedAt: "2026-10-01",
    category: "admissions",
    isOfficial: true,
    tags: ["UC", "California", "college apps"],
  },
  {
    id: "n5",
    title: "Cal Grant Application Deadlines Announced for 2027",
    summary:
      "California students seeking Cal Grant funding for the 2027–2028 academic year must submit their FAFSA or California Dream Act application by March 2, 2027. GPA verification must also be submitted by participating high schools.",
    sourceName: "California Student Aid Commission",
    sourceUrl: "https://www.csac.ca.gov",
    publishedAt: "2026-09-28",
    category: "scholarships",
    isOfficial: true,
    tags: ["Cal Grant", "scholarship", "California"],
  },
  {
    id: "n6",
    title: "National Merit Scholarship 2027 Semifinalists Announced",
    summary:
      "The National Merit Scholarship Corporation has announced approximately 16,000 semifinalists for the 2027 National Merit Scholarship Program. Semifinalists are the highest-scoring PSAT/NMSQT participants in each state.",
    sourceName: "National Merit Scholarship Corporation",
    sourceUrl: "https://www.nationalmerit.org",
    publishedAt: "2026-09-20",
    category: "scholarships",
    isOfficial: true,
    tags: ["National Merit", "PSAT", "scholarship"],
  },
  {
    id: "n7",
    title: "AP Exam Registration Open at Most Schools",
    summary:
      "AP exam registration for the 2027 testing window is currently open at most participating high schools. The fee-reduction program applies to qualifying students. Students should confirm deadlines with their AP coordinator.",
    sourceName: "College Board",
    sourceUrl: "https://apstudents.collegeboard.org",
    publishedAt: "2026-09-15",
    category: "testing",
    isOfficial: true,
    tags: ["AP exams", "College Board"],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  admissions: "Admissions",
  scholarships: "Scholarships",
  testing: "Testing",
  financial_aid: "Financial Aid",
  policy: "Policy",
  programs: "Programs",
};

const CATEGORY_COLORS: Record<string, string> = {
  admissions: "info",
  scholarships: "success",
  testing: "warning",
  financial_aid: "success",
  policy: "default",
  programs: "info",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Education & Admissions News</h1>
          <p className="text-slate-600 mt-1.5">
            Sourced updates about college admissions, scholarships, testing, and financial aid.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            All news items are sourced from official organizations and include source links. Always verify important deadlines and policy changes directly with the official source before acting on them.
          </p>
        </div>

        {/* News list */}
        <div className="space-y-4">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={CATEGORY_COLORS[item.category] as any ?? "default"}>
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </Badge>
                  {item.isOfficial && (
                    <Badge variant="success" size="sm">Official source</Badge>
                  )}
                </div>
                <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h2 className="font-semibold text-slate-900 mb-2 leading-snug">{item.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-0.5 text-xs text-slate-400">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                >
                  {item.sourceName}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            More updates will be added as new announcements are made by official sources.
          </p>
        </div>
      </div>
    </div>
  );
}
