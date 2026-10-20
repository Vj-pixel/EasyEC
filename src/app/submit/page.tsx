"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type FormStep = "details" | "eligibility" | "dates" | "review" | "submitted";

interface FormData {
  title: string;
  organization: string;
  description: string;
  sourceUrl: string;
  category: string;
  type: string;
  format: string;
  city: string;
  state: string;
  costType: string;
  minGrade: string;
  maxGrade: string;
  deadline: string;
  submitterRelationship: string;
  additionalContext: string;
}

const INITIAL_FORM: FormData = {
  title: "",
  organization: "",
  description: "",
  sourceUrl: "",
  category: "",
  type: "",
  format: "",
  city: "",
  state: "",
  costType: "",
  minGrade: "",
  maxGrade: "",
  deadline: "",
  submitterRelationship: "",
  additionalContext: "",
};

function StepIndicator({ step, current }: { step: number; current: number }) {
  const steps = ["Details", "Eligibility", "Dates", "Review"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const n = i + 1;
        const isActive = n === current;
        const isDone = n < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                isDone
                  ? "bg-green-600 text-white"
                  : isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {isDone ? <CheckCircle className="w-4 h-4" /> : n}
            </div>
            <span className={`text-sm hidden sm:block ${isActive ? "font-medium text-slate-900" : "text-slate-400"}`}>
              {label}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-slate-200 mx-1 hidden sm:block" />}
          </div>
        );
      })}
    </div>
  );
}

export default function SubmitPage() {
  const [step, setStep] = useState<FormStep>("details");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (step === "details") {
      if (!form.title.trim()) newErrors.title = "Title is required";
      if (!form.organization.trim()) newErrors.organization = "Organization is required";
      if (!form.description.trim()) newErrors.description = "Description is required";
      if (!form.sourceUrl.trim()) newErrors.sourceUrl = "Official source URL is required";
      else if (!form.sourceUrl.startsWith("http")) newErrors.sourceUrl = "Must be a valid URL (start with http)";
      if (!form.category) newErrors.category = "Please select a category";
    }
    if (step === "eligibility") {
      if (!form.submitterRelationship) newErrors.submitterRelationship = "Please select your relationship";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    const steps: FormStep[] = ["details", "eligibility", "dates", "review"];
    const i = steps.indexOf(step);
    if (i < steps.length - 1) setStep(steps[i + 1]);
  };

  const back = () => {
    const steps: FormStep[] = ["details", "eligibility", "dates", "review"];
    const i = steps.indexOf(step as FormStep);
    if (i > 0) setStep(steps[i - 1]);
  };

  const submit = () => {
    // In production: POST to /api/submissions
    setStep("submitted");
  };

  const stepNum = { details: 1, eligibility: 2, dates: 3, review: 4 }[step as string] ?? 1;

  if (step === "submitted") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Submission received!</h1>
          <p className="text-slate-600 mb-6">
            Thank you for contributing to EasyEC. Your submission will be reviewed by our team before being published. This usually takes 1–3 business days.
          </p>
          <Badge variant="demo" size="md" className="mb-6">Submission #{Math.floor(Math.random() * 9000 + 1000)}</Badge>
          <div className="space-y-3">
            <a href="/explore" className="block">
              <Button className="w-full">Browse more opportunities</Button>
            </a>
            <button
              onClick={() => { setForm(INITIAL_FORM); setStep("details"); }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Submit another opportunity
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dark header */}
      <div className="bg-gradient-to-br from-[#0a0a0f] via-blue-950 to-[#0a0a0f] border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-50%] left-[30%] w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-[60px]" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1.5">
            Submit an <span className="gradient-text">opportunity</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Know about an opportunity other students should discover? Share it here. Every submission is reviewed before publishing.
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            All submissions are reviewed by our team. Only approved listings appear on the platform. Do not submit listings you cannot verify exist.
          </p>
        </div>

        <StepIndicator step={stepNum} current={stepNum} />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {step === "details" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-slate-900 text-base">Opportunity details</h2>

              <Input
                label="Opportunity title *"
                placeholder="e.g. NASA Ames Summer Research Program"
                value={form.title}
                onChange={set("title")}
                error={errors.title}
              />
              <Input
                label="Organization name *"
                placeholder="e.g. NASA Ames Research Center"
                value={form.organization}
                onChange={set("organization")}
                error={errors.organization}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
                <textarea
                  className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2.5 min-h-[100px] focus:outline-2 focus:outline-blue-600 resize-none"
                  placeholder="Describe what this opportunity is and what students will do..."
                  value={form.description}
                  onChange={set("description")}
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>

              <Input
                label="Official source URL *"
                placeholder="https://example.org/program"
                value={form.sourceUrl}
                onChange={set("sourceUrl")}
                error={errors.sourceUrl}
                hint="The official website or application page for this opportunity"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
                <select
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm px-3 focus:outline-2 focus:outline-blue-600"
                  value={form.category}
                  onChange={set("category")}
                >
                  <option value="">Select a category</option>
                  <option>Engineering & Technology</option>
                  <option>Research & Science</option>
                  <option>Competitions</option>
                  <option>Volunteering & Service</option>
                  <option>Arts & Creative</option>
                  <option>Civic & Leadership</option>
                  <option>Entrepreneurship</option>
                  <option>Healthcare & Life Sciences</option>
                  <option>Environment & Sustainability</option>
                  <option>Journalism & Writing</option>
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600" value={form.type} onChange={set("type")}>
                    <option value="">Select type</option>
                    <option>Internship</option>
                    <option>Research</option>
                    <option>Competition</option>
                    <option>Summer program</option>
                    <option>Volunteer</option>
                    <option>Mentorship</option>
                    <option>Hackathon</option>
                    <option>Club / Team</option>
                    <option>Workshop</option>
                    <option>Apprenticeship</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Format</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600" value={form.format} onChange={set("format")}>
                    <option value="">Select format</option>
                    <option>In person</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="City (if in-person)" placeholder="San Jose" value={form.city} onChange={set("city")} />
                <Input label="State" placeholder="CA" value={form.state} onChange={set("state")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Cost / compensation</label>
                <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600" value={form.costType} onChange={set("costType")}>
                  <option value="">Unknown</option>
                  <option>Free</option>
                  <option>Paid stipend</option>
                  <option>Scholarship available</option>
                  <option>Fee required</option>
                </select>
              </div>
            </div>
          )}

          {step === "eligibility" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-slate-900 text-base">Eligibility information</h2>
              <p className="text-sm text-slate-500">Leave fields blank if you don&apos;t know. Incomplete submissions are still valuable.</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Minimum grade</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600" value={form.minGrade} onChange={set("minGrade")}>
                    <option value="">Not specified</option>
                    {[9, 10, 11, 12].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Maximum grade</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600" value={form.maxGrade} onChange={set("maxGrade")}>
                    <option value="">Not specified</option>
                    {[9, 10, 11, 12].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Your relationship to this opportunity *</label>
                <select
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white text-sm px-3 focus:outline-2 focus:outline-blue-600"
                  value={form.submitterRelationship}
                  onChange={set("submitterRelationship")}
                >
                  <option value="">Select your relationship</option>
                  <option value="student">Student who discovered this opportunity</option>
                  <option value="provider">Representative of the organization</option>
                  <option value="educator">Educator or counselor</option>
                  <option value="other">Other</option>
                </select>
                {errors.submitterRelationship && <p className="mt-1 text-xs text-red-600">{errors.submitterRelationship}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional context (optional)</label>
                <textarea
                  className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2.5 min-h-[80px] focus:outline-2 focus:outline-blue-600 resize-none"
                  placeholder="Any additional information that would help our reviewers verify and publish this listing..."
                  value={form.additionalContext}
                  onChange={set("additionalContext")}
                />
              </div>
            </div>
          )}

          {step === "dates" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-slate-900 text-base">Dates & deadlines</h2>
              <p className="text-sm text-slate-500">Accurate deadline information helps students know when to apply. Leave blank if unknown.</p>

              <Input
                label="Application deadline"
                type="date"
                value={form.deadline}
                onChange={set("deadline")}
                hint="The last date students can submit their application"
              />

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  If you&apos;re not sure about the exact deadline, leave it blank. Our team will try to verify it before publishing.
                </p>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 text-base">Review your submission</h2>

              <div className="space-y-3 text-sm">
                {[
                  ["Title", form.title],
                  ["Organization", form.organization],
                  ["Category", form.category],
                  ["Format", form.format],
                  ["Source URL", form.sourceUrl],
                  ["Your role", form.submitterRelationship],
                  ["Deadline", form.deadline || "Not specified"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-500 w-28 shrink-0">{label}</span>
                    <span className="text-slate-900 font-medium break-all">{value || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mt-2">
                <p className="text-xs text-slate-600 leading-relaxed">
                  By submitting, you confirm that the information above is accurate to the best of your knowledge and that this is a real opportunity from a legitimate organization. EasyEC will review this submission before publishing.
                </p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-6 pt-5 border-t border-slate-100">
            {step !== "details" ? (
              <Button variant="outline" onClick={back}>Back</Button>
            ) : (
              <div />
            )}
            {step !== "review" ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={submit} className="gap-2">
                <Send className="w-4 h-4" />
                Submit for review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
