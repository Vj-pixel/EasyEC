import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, hint, icon, iconRight, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border bg-white text-slate-900 placeholder:text-slate-400",
              "text-sm px-3 py-2.5 h-10",
              "transition-colors duration-150",
              "focus:outline-2 focus:outline-blue-600 focus:outline-offset-0 focus:border-blue-400",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50",
              icon && "pl-9",
              iconRight && "pr-9",
              error
                ? "border-red-400 focus:outline-red-500"
                : "border-slate-200 hover:border-slate-300",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {iconRight}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
