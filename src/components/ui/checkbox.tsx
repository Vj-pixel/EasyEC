"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, ...props }, ref) => {
  const checkId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  if (label) {
    return (
      <label
        htmlFor={checkId}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkId}
          className={cn(
            "h-4 w-4 shrink-0 rounded border border-slate-300 bg-white",
            "focus:outline-2 focus:outline-blue-600 focus:outline-offset-2",
            "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
            "transition-colors duration-150",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <span className="text-sm text-slate-700 group-hover:text-slate-900 leading-tight">{label}</span>
      </label>
    );
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkId}
      className={cn(
        "h-4 w-4 shrink-0 rounded border border-slate-300 bg-white",
        "focus:outline-2 focus:outline-blue-600 focus:outline-offset-2",
        "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
        "transition-colors duration-150",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <Check className="w-3 h-3 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
