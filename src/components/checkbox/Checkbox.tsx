"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

const sizeClass: Record<Size, { box: string; icon: string }> = {
  xs: { box: "h-3 w-3", icon: "h-2 w-2" },
  sm: { box: "h-4 w-4", icon: "h-2.5 w-2.5" },
  md: { box: "h-5 w-5", icon: "h-3 w-3" },
  lg: { box: "h-6 w-6", icon: "h-3.5 w-3.5" },
  xl: { box: "h-7 w-7", icon: "h-4 w-4" },
};

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  size?: Size;
  radius?: Radius;
  /**
   * Marks the checkbox as invalid. Pass a string to also display an error message.
   * @example error={true}
   * @example error="This field is required"
   */
  error?: string | boolean;
  /** Optional label rendered next to the checkbox */
  label?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = "md", radius = "sm", error, label, id, ...props }, ref) => {
    const autoId = React.useId();
    const checkboxId = id ?? (label ? autoId : undefined);
    const errorId = typeof error === "string" ? `${autoId}-error` : undefined;
    const hasError = Boolean(error);
    const { box, icon } = sizeClass[size];
    const root = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        aria-invalid={hasError || undefined}
        aria-describedby={errorId}
        className={cn(
          "peer shrink-0 border border-input ring-offset-background",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
          hasError && "border-destructive focus-visible:ring-destructive",
          radiusClass[radius],
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

    if (!label && typeof error !== "string") return root;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {root}
          {label && (
            <label
              htmlFor={checkboxId}
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {typeof error === "string" && (
          <p id={errorId} role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
