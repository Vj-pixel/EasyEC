"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer select-none",
          "focus:outline-2 focus:outline-blue-600 focus:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
          variant === "secondary" && "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300",
          variant === "outline" && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
          variant === "ghost" && "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
          variant === "success" && "bg-green-600 text-white hover:bg-green-700",
          // Sizes
          size === "sm" && "text-xs px-3 py-1.5 h-8",
          size === "md" && "text-sm px-4 py-2 h-10",
          size === "lg" && "text-base px-6 py-3 h-12",
          size === "icon" && "w-9 h-9 p-0 shrink-0",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
