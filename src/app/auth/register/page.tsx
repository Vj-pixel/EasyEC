import type { Metadata } from "next";
import Link from "next/link";
import { Compass, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Create account" };

const BENEFITS = [
  "Save opportunities and track deadlines",
  "Personalized recommendations",
  "Application status tracking",
  "Deadline reminders",
];

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500 mt-1">Free forever. No spam. No tracking.</p>
        </div>

        {/* Benefits */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-5">
          <ul className="space-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
          <p className="text-xs text-amber-800 text-center">
            Authentication is not yet connected. This is a UI preview.
          </p>
        </div>

        <form className="space-y-4">
          <Input label="Full name" type="text" placeholder="Your name" autoComplete="name" />
          <Input label="Email address" type="email" placeholder="you@example.com" autoComplete="email" />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            hint="At least 8 characters"
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Grade level</label>
            <select className="w-full h-10 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm px-3 focus:outline-2 focus:outline-blue-600">
              <option value="">Select your grade</option>
              {[9, 10, 11, 12].map((g) => <option key={g}>Grade {g}</option>)}
              <option>College / Other</option>
            </select>
          </div>

          <Button className="w-full" size="lg">Create free account</Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-slate-400">or</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" size="lg">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </Link>
        </p>

        <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
