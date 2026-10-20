"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { label?: string }
>(({ className, children, label, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    )}
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-slate-200",
        "bg-white px-3 text-sm text-slate-900 shadow-sm",
        "hover:border-slate-300 focus:outline-2 focus:outline-blue-600 focus:outline-offset-0",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "data-[placeholder]:text-slate-400",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  </div>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={4}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg",
        "animate-fade-in",
        position === "popper" && "w-full max-h-[300px]",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm",
      "text-slate-700 outline-none",
      "focus:bg-blue-50 focus:text-blue-700",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="w-3.5 h-3.5" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export const SelectGroup = SelectPrimitive.Group;
export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-2 pr-3 text-xs font-semibold text-slate-500 uppercase tracking-wide", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
