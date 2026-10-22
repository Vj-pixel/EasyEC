"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { Menu, X, Search, Compass, BookOpen, PlusCircle, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/education", label: "News", icon: BookOpen },
  { href: "/submit", label: "Submit", icon: PlusCircle },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              active
                ? "bg-[#1a1a1a] text-white"
                : "text-[#737373] hover:text-white hover:bg-[#1a1a1a]"
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

function MobileNavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            pathname === href
              ? "bg-[#1a1a1a] text-white"
              : "text-[#737373] hover:bg-[#1a1a1a] hover:text-white"
          )}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
    </>
  );
}

function NavbarInner() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Easy<span className="text-blue-400">EC</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Suspense fallback={
              <div className="flex gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href} className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#737373]">
                    {label}
                  </Link>
                ))}
              </div>
            }>
              <NavLinks />
            </Suspense>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/explore">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-colors" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[#525252] hover:text-white hover:bg-[#1a1a1a] transition-colors" aria-label="Dashboard">
                <LayoutDashboard className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="sm" className="border-[#262626] text-[#a3a3a3] bg-transparent hover:bg-[#1a1a1a] hover:text-white hover:border-[#404040]">
                Sign in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#737373] hover:bg-[#1a1a1a] hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-[#0c0c0c] animate-fade-in">
          <nav className="px-4 py-3 space-y-1">
            <Suspense fallback={null}>
              <MobileNavLinks onClick={() => setMobileOpen(false)} />
            </Suspense>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#737373] hover:bg-[#1a1a1a] hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>
          <div className="px-4 pb-4 pt-2 border-t border-[#1a1a1a] flex gap-2">
            <Link href="/auth/signin" className="flex-1">
              <Button variant="outline" className="w-full border-[#262626] text-[#a3a3a3] bg-transparent hover:bg-[#1a1a1a] hover:text-white" size="md">Sign in</Button>
            </Link>
            <Link href="/auth/register" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="md">Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
