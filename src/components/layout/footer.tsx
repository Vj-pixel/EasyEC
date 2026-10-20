import Link from "next/link";
import { Compass, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">
                Easy<span className="text-blue-600">EC</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every student deserves a fair chance to discover what they could become.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Discover</h3>
            <ul className="space-y-2">
              {[
                ["Explore opportunities", "/explore"],
                ["Engineering & Tech", "/explore?category=cat-stem"],
                ["Research & Science", "/explore?category=cat-research"],
                ["Competitions", "/explore?category=cat-competition"],
                ["Remote programs", "/explore?remote=true"],
                ["Free opportunities", "/explore?cost=free"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For students */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Students</h3>
            <ul className="space-y-2">
              {[
                ["Create an account", "/auth/register"],
                ["Sign in", "/auth/signin"],
                ["My dashboard", "/dashboard"],
                ["Saved opportunities", "/saved"],
                ["Submit an opportunity", "/submit"],
                ["Education news", "/education"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">About</h3>
            <ul className="space-y-2">
              {[
                ["Our mission", "/about"],
                ["For organizations", "/organizations"],
                ["Submit a listing", "/submit"],
                ["Report an issue", "/report"],
                ["Admin portal", "/admin"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 EasyEC. Built for the Congressional App Challenge.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
