import type { Metadata } from "next";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Database,
  Upload,
  Users,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin Dashboard" };

// Simulated submission queue
const PENDING_SUBMISSIONS = [
  {
    id: "sub-001",
    title: "Los Altos High School Robotics Camp",
    org: "Los Altos HS Engineering",
    submittedBy: "Student contributor",
    submittedAt: "2026-10-18",
    status: "pending",
    category: "Engineering & Technology",
    hasSourceUrl: true,
  },
  {
    id: "sub-002",
    title: "Bay Area Environmental Internship (City of Sunnyvale)",
    org: "City of Sunnyvale",
    submittedBy: "Community member",
    submittedAt: "2026-10-17",
    status: "pending",
    category: "Environment & Sustainability",
    hasSourceUrl: true,
  },
  {
    id: "sub-003",
    title: "Teen Medical Shadowing Program",
    org: "Valley Medical Center",
    submittedBy: "Student contributor",
    submittedAt: "2026-10-15",
    status: "needs_info",
    category: "Healthcare & Life Sciences",
    hasSourceUrl: false,
  },
];

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Auth notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex gap-3">
          <Shield className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Admin access required</p>
            <p className="text-sm text-red-700 mt-0.5">
              In production, this page requires server-side admin role verification. This is a UI preview only — no actual admin operations are performed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <Badge variant="warning">Preview mode</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total listings" value={20} icon={Database} color="text-blue-600 bg-blue-50" />
          <StatCard label="Pending review" value={3} icon={Clock} color="text-amber-600 bg-amber-50" />
          <StatCard label="Needs info" value={1} icon={AlertTriangle} color="text-orange-600 bg-orange-50" />
          <StatCard label="Reports to review" value={0} icon={AlertTriangle} color="text-red-600 bg-red-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission queue */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Submission queue ({PENDING_SUBMISSIONS.length})
                </h2>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </Button>
              </div>

              <div className="divide-y divide-slate-100">
                {PENDING_SUBMISSIONS.map((sub) => (
                  <div key={sub.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 text-sm leading-snug">{sub.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{sub.org} · {sub.submittedBy}</p>
                      </div>
                      <Badge variant={sub.status === "needs_info" ? "warning" : "info"} size="sm">
                        {sub.status === "pending" ? "Pending" : "Needs info"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{sub.category}</span>
                        <span className={sub.hasSourceUrl ? "text-green-600" : "text-red-500"}>
                          {sub.hasSourceUrl ? "✓ Has source URL" : "✗ No source URL"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700">
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </Button>
                        <Button size="sm" variant="success" className="gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools sidebar */}
          <div className="flex flex-col gap-4">
            {/* Data tools */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                Data tools
              </h2>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Upload className="w-4 h-4" />
                  Import CSV
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Check source freshness
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Database className="w-4 h-4" />
                  Export listings
                </Button>
              </div>
            </div>

            {/* Platform stats */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Platform health
              </h2>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: "Published listings", value: 20, total: 20, color: "bg-blue-600" },
                  { label: "With working source URL", value: 18, total: 20, color: "bg-green-600" },
                  { label: "Verified (official)", value: 12, total: 20, color: "bg-violet-600" },
                  { label: "Checked this month", value: 15, total: 20, color: "bg-amber-500" },
                ].map(({ label, value, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>{label}</span>
                      <span className="font-medium">{value}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full`}
                        style={{ width: `${(value / total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organization verification */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h2 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Organizations
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                8 organizations with verified listings.
                2 with unverified listings.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Manage organizations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
