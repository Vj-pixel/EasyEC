import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const instant = false;
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Wifi,
  BookOpen,
  Building2,
  Tag,
  Info,
} from "lucide-react";
import { getOpportunityById, getRelatedOpportunities } from "@/lib/data/service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OpportunityCard } from "@/components/opportunities/opportunity-card";
import {
  formatDate,
  formatDeadline,
  costLabel,
  gradeLabel,
  verificationLabel,
  typeLabel,
  deadlineUrgency,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const opp = await getOpportunityById(id);
  if (!opp) return { title: "Opportunity not found" };
  return {
    title: opp.title,
    description: opp.description.slice(0, 160),
  };
}

function VerificationBanner({ status }: { status: string }) {
  if (status === "official_source") {
    return (
      <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-sm">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-green-800">Official source verified</p>
          <p className="text-green-700 mt-0.5">This listing links directly to the official organization website or application portal.</p>
        </div>
      </div>
    );
  }
  if (status === "community_submitted") {
    return (
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800">Community submitted</p>
          <p className="text-amber-700 mt-0.5">This listing was contributed by a community member and has not yet been verified directly with the organization. Verify details on the official website before applying.</p>
        </div>
      </div>
    );
  }
  if (status === "may_be_outdated") {
    return (
      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm">
        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-red-800">Information may be outdated</p>
          <p className="text-red-700 mt-0.5">This listing has not been recently verified. Check the official source before applying.</p>
        </div>
      </div>
    );
  }
  return null;
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <div className="text-sm text-slate-900 mt-0.5">{value}</div>
      </div>
    </div>
  );
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const [opp, related] = await Promise.all([
    getOpportunityById(id),
    getOpportunityById(id).then((o) => (o ? getRelatedOpportunities(o, 3) : [])),
  ]);

  if (!opp) notFound();

  const now = Date.now();
  const urgency = deadlineUrgency(opp.applicationDeadline, now);
  const isRemote = opp.location.isRemote || opp.format === "remote";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/explore" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to explore
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Header card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              {opp.isDemo && (
                <Badge variant="demo" size="sm" className="mb-3">
                  Demo record — not a real listing
                </Badge>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {opp.categories.map((cat) => (
                  <Badge key={cat.id} variant="info" size="md">{cat.name}</Badge>
                ))}
                <Badge variant="outline" size="md">{typeLabel(opp.type)}</Badge>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                {opp.title}
              </h1>
              <p className="text-lg text-slate-600 font-medium mb-4">{opp.organization.name}</p>

              {/* Key facts row */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5">
                  {isRemote ? <Wifi className="w-4 h-4 text-violet-500" /> : <MapPin className="w-4 h-4 text-slate-400" />}
                  {isRemote
                    ? "Remote"
                    : opp.location.city
                    ? `${opp.location.city}, ${opp.location.state}`
                    : opp.location.state ?? "Location TBD"}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 font-medium",
                    opp.costType === "free" && "text-green-700",
                    opp.costType === "stipend" && "text-emerald-700",
                  )}
                >
                  <DollarSign className="w-4 h-4" />
                  {costLabel(opp.costType, opp.costAmount, opp.stipendAmount)}
                </span>
                {(opp.minGrade || opp.maxGrade) && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    {gradeLabel(opp.minGrade, opp.maxGrade)}
                  </span>
                )}
                {opp.weeklyTimeCommitment && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {opp.weeklyTimeCommitment}
                  </span>
                )}
              </div>

              {opp.noExperienceRequired && (
                <div className="mt-4">
                  <Badge variant="success" size="md">No prior experience required</Badge>
                </div>
              )}
            </div>

            {/* Verification banner */}
            <VerificationBanner status={opp.verificationStatus} />

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                About this opportunity
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">{opp.description}</p>

              <h3 className="text-sm font-semibold text-slate-900 mb-2">What you&apos;ll do</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{opp.whatYouWillDo}</p>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Eligibility
              </h2>
              <div className="space-y-0">
                {(opp.minGrade || opp.maxGrade) && (
                  <InfoRow label="Grade level" value={gradeLabel(opp.minGrade, opp.maxGrade)} icon={Users} />
                )}
                {(opp.minAge || opp.maxAge) && (
                  <InfoRow
                    label="Age"
                    value={opp.minAge && opp.maxAge ? `${opp.minAge}–${opp.maxAge} years old` : opp.minAge ? `${opp.minAge}+ years old` : `Up to ${opp.maxAge} years old`}
                    icon={Users}
                  />
                )}
                <InfoRow label="Experience level" value={opp.noExperienceRequired ? "No prior experience required" : `${opp.experienceLevel.charAt(0).toUpperCase() + opp.experienceLevel.slice(1)} experience preferred`} icon={BookOpen} />
                {opp.gpaRequirement && (
                  <InfoRow label="GPA requirement" value={`${opp.gpaRequirement}+ GPA required`} icon={Info} />
                )}
                {opp.prerequisites && (
                  <InfoRow label="Prerequisites" value={opp.prerequisites} icon={Tag} />
                )}
              </div>
            </div>

            {/* Financial info */}
            {(opp.financialAidAvailable || opp.costType !== "free") && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Cost & financial assistance
                </h2>
                <div className="space-y-0">
                  <InfoRow
                    label="Cost"
                    value={costLabel(opp.costType, opp.costAmount, opp.stipendAmount)}
                    icon={DollarSign}
                  />
                  {opp.financialAidAvailable && opp.financialAidNote && (
                    <InfoRow label="Financial aid" value={opp.financialAidNote} icon={CheckCircle} />
                  )}
                </div>
              </div>
            )}

            {/* Application */}
            {opp.requiredMaterials && opp.requiredMaterials.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Required materials
                </h2>
                <ul className="space-y-1.5">
                  {opp.requiredMaterials.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-slate-900 mb-3">Related opportunities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.slice(0, 2).map((r) => (
                    <OpportunityCard key={r.id} opportunity={r} compact />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Apply CTA */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-24">
              {opp.applicationDeadline && (
                <div
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg mb-4",
                    urgency === "critical" && "bg-red-50 text-red-700 border border-red-200",
                    urgency === "high" && "bg-orange-50 text-orange-700 border border-orange-200",
                    urgency === "medium" && "bg-amber-50 text-amber-700 border border-amber-200",
                    urgency === "low" && "bg-slate-50 text-slate-600 border border-slate-200",
                    urgency === "none" && "bg-slate-50 text-slate-600 border border-slate-200",
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  {formatDeadline(opp.applicationDeadline, now)}
                </div>
              )}

              <a
                href={opp.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full gap-2" size="lg">
                  Apply on official website
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>

              <p className="text-xs text-slate-500 mt-3 text-center leading-relaxed">
                This link goes to the organization&apos;s official website. EasyEC does not process applications.
              </p>
            </div>

            {/* Key dates */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Key dates
              </h3>
              <div className="space-y-0">
                {opp.applicationOpenDate && (
                  <InfoRow label="Applications open" value={formatDate(opp.applicationOpenDate)} />
                )}
                {opp.applicationDeadline && (
                  <InfoRow label="Application deadline" value={formatDate(opp.applicationDeadline)} />
                )}
                {opp.programStartDate && (
                  <InfoRow label="Program starts" value={formatDate(opp.programStartDate)} />
                )}
                {opp.programEndDate && (
                  <InfoRow label="Program ends" value={formatDate(opp.programEndDate)} />
                )}
                {opp.duration && (
                  <InfoRow label="Duration" value={opp.duration} icon={Clock} />
                )}
              </div>
            </div>

            {/* Organization */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Organization
              </h3>
              <p className="font-medium text-slate-900 text-sm mb-1">{opp.organization.name}</p>
              {opp.organization.description && (
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{opp.organization.description}</p>
              )}
              {opp.organization.website && (
                <a
                  href={opp.organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Visit website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Data provenance */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Data provenance
              </h3>
              <div className="space-y-1.5 text-xs text-slate-500">
                <p>Status: <span className="text-slate-700 font-medium">{verificationLabel(opp.verificationStatus)}</span></p>
                {opp.lastChecked && (
                  <p>Last checked: <span className="text-slate-700">{formatDate(opp.lastChecked)}</span></p>
                )}
                <p>Added: <span className="text-slate-700">{formatDate(opp.createdAt)}</span></p>
                <a
                  href={opp.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                >
                  Original source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
