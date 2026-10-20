"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Shield,
  Users,
  Wifi,
  Beaker,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDeadline, costLabel, deadlineUrgency, gradeLabel, verificationLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/lib/types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  saved?: boolean;
  onSave?: (id: string) => void;
  compact?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  "cat-stem": "bg-violet-100 text-violet-700",
  "cat-research": "bg-emerald-100 text-emerald-700",
  "cat-competition": "bg-amber-100 text-amber-700",
  "cat-volunteer": "bg-green-100 text-green-700",
  "cat-arts": "bg-pink-100 text-pink-700",
  "cat-civic": "bg-cyan-100 text-cyan-700",
  "cat-entrepreneurship": "bg-blue-100 text-blue-700",
  "cat-health": "bg-red-100 text-red-700",
  "cat-environment": "bg-green-100 text-green-800",
  "cat-journalism": "bg-orange-100 text-orange-700",
};

function DeadlineDisplay({ deadline, urgency }: { deadline: string; urgency: string }) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    setLabel(formatDeadline(deadline));
  }, [deadline]);

  if (!label) return (
    <span className="flex items-center gap-1 text-xs text-slate-400">
      <Calendar className="w-3.5 h-3.5" />
      <span className="skeleton h-3 w-16 rounded" />
    </span>
  );

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs font-medium",
        urgency === "critical" && "text-red-600",
        urgency === "high" && "text-orange-600",
        urgency === "medium" && "text-amber-600",
        urgency === "low" && "text-slate-500",
        urgency === "none" && "text-slate-400"
      )}
    >
      <Calendar className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function VerificationDot({ status }: { status: Opportunity["verificationStatus"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs",
        status === "official_source" && "text-green-700",
        status === "provider_confirmed" && "text-blue-700",
        status === "community_submitted" && "text-slate-500",
        status === "under_review" && "text-amber-600",
        status === "may_be_outdated" && "text-red-500",
      )}
      title={verificationLabel(status)}
    >
      <Shield className="w-3 h-3" />
      {verificationLabel(status)}
    </span>
  );
}

export function OpportunityCard({ opportunity: opp, saved = false, onSave, compact = false }: OpportunityCardProps) {
  const [urgency, setUrgency] = useState<"none" | "low" | "medium" | "high" | "critical">("none");
  useEffect(() => {
    setUrgency(deadlineUrgency(opp.applicationDeadline));
  }, [opp.applicationDeadline]);
  const isRemote = opp.location.isRemote || opp.format === "remote";

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col group">
      {/* Demo tag */}
      {opp.isDemo && (
        <div className="px-5 pt-3 pb-0">
          <Badge variant="demo" size="sm">Demo record</Badge>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Top row: categories + save */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {opp.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  CATEGORY_COLORS[cat.id] ?? "bg-slate-100 text-slate-600"
                )}
              >
                {cat.name}
              </span>
            ))}
          </div>
          {onSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(opp.id);
              }}
              aria-label={saved ? "Unsave opportunity" : "Save opportunity"}
              className={cn(
                "shrink-0 p-1.5 rounded-lg transition-colors duration-150",
                saved
                  ? "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              )}
            >
              {saved ? <BookmarkCheck className="w-4.5 h-4.5" /> : <Bookmark className="w-4.5 h-4.5" />}
            </button>
          )}
        </div>

        {/* Title + org */}
        <div>
          <Link href={`/opportunity/${opp.id}`}>
            <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
              {opp.title}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 mt-0.5 truncate">{opp.organization.name}</p>
        </div>

        {!compact && (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {opp.description}
          </p>
        )}

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {/* Location */}
          <span className="flex items-center gap-1">
            {isRemote ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                Remote
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5" />
                {opp.location.city ? `${opp.location.city}, ${opp.location.state}` : opp.location.state ?? "Location TBD"}
              </>
            )}
          </span>

          {/* Cost */}
          <span
            className={cn(
              "flex items-center gap-1",
              opp.costType === "free" ? "text-green-700 font-medium" : "",
              opp.costType === "stipend" ? "text-emerald-700 font-medium" : ""
            )}
          >
            <DollarSign className="w-3.5 h-3.5" />
            {costLabel(opp.costType, opp.costAmount, opp.stipendAmount)}
          </span>

          {/* Grade */}
          {(opp.minGrade || opp.maxGrade) && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {gradeLabel(opp.minGrade, opp.maxGrade)}
            </span>
          )}

          {/* Time commitment */}
          {opp.weeklyTimeCommitment && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {opp.weeklyTimeCommitment}
            </span>
          )}
        </div>

        {/* No experience badge */}
        {opp.noExperienceRequired && (
          <div>
            <Badge variant="success" size="sm">
              <Beaker className="w-3 h-3" />
              No experience required
            </Badge>
          </div>
        )}
      </div>

      {/* Footer: deadline + actions */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          {opp.applicationDeadline ? (
            <DeadlineDisplay deadline={opp.applicationDeadline} urgency={urgency} />
          ) : (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Deadline unknown
            </span>
          )}
          <VerificationDot status={opp.verificationStatus} />
        </div>

        <Link href={`/opportunity/${opp.id}`}>
          <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
            View
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}

export function OpportunityCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div>
        <div className="skeleton h-5 w-3/4 rounded mb-1.5" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
      <div className="skeleton h-10 w-full rounded" />
      <div className="flex gap-2 mt-1">
        <div className="skeleton h-4 w-16 rounded" />
        <div className="skeleton h-4 w-12 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
      <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-8 w-16 rounded-lg" />
      </div>
    </div>
  );
}
