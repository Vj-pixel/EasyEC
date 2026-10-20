import Link from "next/link";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl font-bold text-slate-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Go home
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Browse opportunities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
