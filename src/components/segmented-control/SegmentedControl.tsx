"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

const segmentedSizeClass: Record<Size, string> = {
  xs: "h-6 text-xs",
  sm: "h-7 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-base",
  xl: "h-12 text-base",
};

const segmentedPaddingClass: Record<Size, string> = {
  xs: "px-2",
  sm: "px-2.5",
  md: "px-4",
  lg: "px-5",
  xl: "px-6",
};

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: Size;
  radius?: Radius;
  /** Makes the control expand to fill its container */
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  /** Accessible name for the group */
  "aria-label"?: string;
}

function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  radius = "md",
  fullWidth = false,
  disabled = false,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel ?? "Segmented control"}
      className={cn(
        "border-border bg-muted inline-flex items-center gap-px rounded-[inherit] border p-0.5",
        radiusClass[radius],
        fullWidth && "w-full",
        disabled && "pointer-events-none opacity-50",
        segmentedSizeClass[size],
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled || opt.disabled}
            onClick={() => !opt.disabled && onChange?.(opt.value)}
            className={cn(
              "focus-visible:ring-ring inline-flex flex-1 items-center justify-center gap-1.5 font-medium transition-all focus-visible:ring-2 focus-visible:outline-none",
              "h-full",
              segmentedPaddingClass[size],
              radiusClass[radius],
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              opt.disabled && "pointer-events-none opacity-40"
            )}
          >
            {opt.icon && (
              <span className="shrink-0" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
