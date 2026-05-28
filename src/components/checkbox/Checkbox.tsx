"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const sizeClass: Record<Size, { box: string; icon: string }> = {
  xs: { box: "h-3 w-3",   icon: "h-2 w-2" },
  sm: { box: "h-4 w-4",   icon: "h-2.5 w-2.5" },
  md: { box: "h-5 w-5",   icon: "h-3 w-3" },
  lg: { box: "h-6 w-6",   icon: "h-3.5 w-3.5" },
  xl: { box: "h-7 w-7",   icon: "h-4 w-4" }
};

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: Size;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", ...props }, ref) => {
  const { box, icon } = sizeClass[size];
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer shrink-0 rounded-sm border border-input ring-offset-background",
        "transition-colors focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
        box,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === "indeterminate" ? (
          <svg
            className={cn(icon, "stroke-current")}
            viewBox="0 0 16 16"
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
        ) : (
          <svg
            className={cn(icon, "stroke-current")}
            viewBox="0 0 16 16"
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2,8 6,13 14,3" />
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
