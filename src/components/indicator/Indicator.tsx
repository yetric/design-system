"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

export type IndicatorPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type IndicatorColor = "default" | "primary" | "success" | "warning" | "destructive" | "info";

const indicatorSizeClass: Record<Size, string> = {
  xs: "h-1.5 w-1.5 text-[8px] min-w-[0.375rem]",
  sm: "h-2 w-2 text-[9px] min-w-[0.5rem]",
  md: "h-3 w-3 text-[10px] min-w-[0.75rem]",
  lg: "h-4 w-4 text-xs min-w-[1rem]",
  xl: "h-5 w-5 text-xs min-w-[1.25rem]",
};

const indicatorPositionClass: Record<IndicatorPosition, string> = {
  "top-right":    "-top-1 -right-1",
  "top-left":     "-top-1 -left-1",
  "bottom-right": "-bottom-1 -right-1",
  "bottom-left":  "-bottom-1 -left-1",
};

const indicatorColorClass: Record<IndicatorColor, string> = {
  default:     "bg-foreground text-background",
  primary:     "bg-primary text-primary-foreground",
  success:     "bg-success text-success-foreground",
  warning:     "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  info:        "bg-info text-info-foreground",
};

export interface IndicatorProps {
  children: React.ReactNode;
  /** Numeric count to show — hidden when 0 and showZero is false */
  count?: number;
  /** Show count even when 0 */
  showZero?: boolean;
  /** Number at which to show "99+" */
  overflowCount?: number;
  /** Dot-only mode (no number) */
  dot?: boolean;
  color?: IndicatorColor;
  size?: Size;
  position?: IndicatorPosition;
  /** Accessible label for the indicator */
  label?: string;
  className?: string;
  indicatorClassName?: string;
}

function Indicator({
  children,
  count,
  showZero = false,
  overflowCount = 99,
  dot = false,
  color = "destructive",
  size = "md",
  position = "top-right",
  label,
  className,
  indicatorClassName,
}: IndicatorProps) {
  const hasCount = count !== undefined;
  const visible = dot || (hasCount && (count > 0 || showZero));
  if (!visible && !dot) {
    return <>{children}</>;
  }

  const displayCount =
    !dot && hasCount
      ? count > overflowCount
        ? `${overflowCount}+`
        : String(count)
      : undefined;

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      {children}
      <span
        aria-label={label ?? (displayCount ? `${displayCount} notifications` : undefined)}
        role={label || displayCount ? "status" : undefined}
        className={cn(
          "absolute flex items-center justify-center rounded-full font-medium ring-2 ring-background",
          indicatorSizeClass[size],
          indicatorColorClass[color],
          indicatorPositionClass[position],
          indicatorClassName
        )}
      >
        {displayCount}
      </span>
    </span>
  );
}

export { Indicator };
