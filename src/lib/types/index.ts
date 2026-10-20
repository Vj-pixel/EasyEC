export type VerificationStatus =
  | "official_source"
  | "provider_confirmed"
  | "community_submitted"
  | "under_review"
  | "may_be_outdated";

export type OpportunityFormat = "in_person" | "remote" | "hybrid";

export type OpportunityType =
  | "internship"
  | "research"
  | "competition"
  | "volunteer"
  | "summer_program"
  | "mentorship"
  | "scholarship"
  | "hackathon"
  | "club"
  | "workshop"
  | "apprenticeship"
  | "remote_project"
  | "other";

export type CostType = "free" | "paid" | "stipend" | "scholarship_available";

export type PublicationStatus =
  | "draft"
  | "pending_review"
  | "needs_info"
  | "approved"
  | "published"
  | "rejected"
  | "expired"
  | "archived";

export type ApplicationTrackingStatus =
  | "saved"
  | "planning"
  | "applying"
  | "submitted"
  | "accepted"
  | "rejected"
  | "completed";

export interface Organization {
  id: string;
  name: string;
  description?: string;
  website?: string;
  verified: boolean;
  logoUrl?: string;
  type: "nonprofit" | "university" | "company" | "government" | "school" | "community" | "other";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
}

export interface Location {
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  isRemote: boolean;
  isHybrid: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: Organization;
  description: string;
  whatYouWillDo: string;
  categories: Category[];
  type: OpportunityType;
  format: OpportunityFormat;
  location: Location;
  costType: CostType;
  costAmount?: number;
  stipendAmount?: number;
  financialAidAvailable: boolean;
  financialAidNote?: string;

  // Eligibility
  minGrade?: number;
  maxGrade?: number;
  minAge?: number;
  maxAge?: number;
  prerequisites?: string;
  experienceLevel: "beginner" | "intermediate" | "advanced" | "any";
  noExperienceRequired: boolean;
  gpaRequirement?: number;

  // Dates
  applicationOpenDate?: string;
  applicationDeadline?: string;
  programStartDate?: string;
  programEndDate?: string;
  weeklyTimeCommitment?: string;
  duration?: string;

  // Application
  applicationUrl: string;
  requiredMaterials?: string[];
  applicationInstructions?: string;

  // Metadata
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  sourceUrl: string;
  lastChecked?: string;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;

  // Stats
  saveCount?: number;
  viewCount?: number;
  reportCount?: number;
}

export interface SavedOpportunity {
  id: string;
  opportunityId: string;
  userId: string;
  trackingStatus: ApplicationTrackingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunitySubmission {
  id: string;
  opportunityData: Partial<Opportunity>;
  submittedBy: string;
  submitterRelationship: "student" | "provider" | "educator" | "other";
  additionalContext?: string;
  status: "pending_review" | "needs_info" | "approved" | "rejected";
  reviewNotes?: string;
  reviewedBy?: string;
  createdAt: string;
}

export interface EducationNewsItem {
  id: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  category: "admissions" | "scholarships" | "testing" | "financial_aid" | "policy" | "programs";
  isOfficial: boolean;
  tags: string[];
}

export interface SearchFilters {
  query?: string;
  categories?: string[];
  types?: OpportunityType[];
  format?: OpportunityFormat[];
  minGrade?: number;
  maxGrade?: number;
  costType?: CostType[];
  location?: string;
  maxDistance?: number;
  remote?: boolean;
  noExperienceRequired?: boolean;
  hasFinancialAid?: boolean;
  deadlineBefore?: string;
  deadlineAfter?: string;
  experienceLevel?: string[];
  verificationStatus?: VerificationStatus[];
  sortBy?: "relevance" | "deadline" | "newest" | "distance";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  opportunities: Opportunity[];
  total: number;
  page: number;
  totalPages: number;
  filters: SearchFilters;
}

export interface UserProfile {
  id: string;
  email: string;
  gradeLevel?: number;
  interests: string[];
  preferredTypes: OpportunityType[];
  preferredFormat?: OpportunityFormat;
  location?: string;
  costConstraint: boolean;
  experienceLevel?: string;
  careerInterests: string[];
  savedOpportunities: string[];
}
