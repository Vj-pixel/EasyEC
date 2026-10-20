import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Saved Opportunities" };

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-blue-600" />
            Saved Opportunities
          </h1>
        </div>

        {/* Auth gate */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Save opportunities to track them</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
            Create a free account to save opportunities, track your application status, and get deadline reminders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/register">
              <Button>Create free account</Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
          <Link href="/explore" className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mt-5">
            <Search className="w-3.5 h-3.5" />
            Browse opportunities first
          </Link>
        </div>
      </div>
    </div>
  );
}
