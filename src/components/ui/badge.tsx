import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline" | "demo";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "default", size = "sm", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
        size === "sm" && "text-xs px-2 py-0.5",
        size === "md" && "text-sm px-2.5 py-1",
        variant === "default" && "bg-slate-100 text-slate-700",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "warning" && "bg-amber-100 text-amber-700",
        variant === "error" && "bg-red-100 text-red-700",
        variant === "info" && "bg-blue-100 text-blue-700",
        variant === "outline" && "border border-slate-200 text-slate-600 bg-transparent",
        variant === "demo" && "bg-purple-100 text-purple-700 border border-purple-200",
        className
      )}
      {...props}
    />
  );
}
