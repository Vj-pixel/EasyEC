import type { Metadata } from "next";
import Link from "next/link";
import {
  Bookmark,
  Calendar,
  TrendingUp,
  Clock,
  PlusCircle,
  Search,
  ArrowRight,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholder data — will connect to auth + DB
const SAVED_DEMO = [
  {
    id: "opp-001",
    title: "NASA Internship Program – Ames Research Center",
    org: "NASA Ames Research Center",
    deadline: "2027-02-15",
    status: "saved",
    category: "Research",
  },
  {
    id: "opp-009",
    title: "Congressional App Challenge",
    org: "US House of Representatives",
    deadline: "2026-11-01",
    status: "applying",
    category: "Competition",
  },
  {
    id: "opp-006",
    title: "Google Computer Science Summer Institute",
    org: "Google",
    deadline: "2027-02-28",
    status: "planning",
    category: "Summer Program",
  },
];

const STATUS_COLORS: Record<string, string> = {
  saved: "default",
  planning: "info",
  applying: "warning",
  submitted: "success",
  accepted: "success",
  rejected: "error",
  completed: "default",
};

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    saved: "Saved",
    planning: "Planning to apply",
    applying: "Applying",
    submitted: "Submitted",
    accepted: "Accepted",
    rejected: "Not accepted",
    completed: "Completed",
  };
  return (
    <Badge variant={STATUS_COLORS[status] as any ?? "default"}>
      {labels[status] ?? status}
    </Badge>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Auth notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Compass className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Sign in to save your progress</p>
            <p className="text-sm text-blue-600 mt-0.5">
              Create a free account to save opportunities, track applications, and get deadline reminders.
            </p>
            <div className="flex gap-2 mt-3">
              <Link href="/auth/register">
                <Button size="sm">Create account</Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm" variant="outline">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Preview — sign in to see your real saved opportunities</p>
          </div>
          <Link href="/explore">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Find more
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Bookmark, label: "Saved", value: SAVED_DEMO.length, color: "text-blue-600 bg-blue-50" },
            { icon: TrendingUp, label: "Applying", value: 1, color: "text-amber-600 bg-amber-50" },
            { icon: Calendar, label: "Upcoming deadlines", value: 2, color: "text-red-600 bg-red-50" },
            { icon: Clock, label: "This month", value: 0, color: "text-green-600 bg-green-50" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-2`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming deadlines */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-5">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              Upcoming deadlines
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">Congressional App Challenge</p>
                <p className="text-xs text-slate-500">US House of Representatives</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-red-600">Nov 1, 2026</p>
                <p className="text-xs text-slate-400">~13 days</p>
              </div>
            </div>
            <div className="px-5 py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">NASA Internship Program</p>
                <p className="text-xs text-slate-500">NASA Ames Research Center</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-slate-600">Feb 15, 2027</p>
                <p className="text-xs text-slate-400">~119 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Saved list */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              Saved opportunities
            </h2>
            <Link href="/saved" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {SAVED_DEMO.map((item) => (
              <div key={item.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/opportunity/${item.id}`} className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                    {item.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">{item.org}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={item.status} />
                  <Link href={`/opportunity/${item.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
            <Link href="/explore">
              <Button variant="outline" size="sm" className="gap-1.5 w-full justify-center">
                <PlusCircle className="w-4 h-4" />
                Discover more opportunities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
