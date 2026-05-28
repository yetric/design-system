"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const loaderSizeClass: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const loaderStrokeWidth: Record<Size, number> = {
  xs: 3,
  sm: 3,
  md: 2.5,
  lg: 2.5,
  xl: 2,
};

export type LoaderVariant = "default" | "primary" | "success" | "warning" | "destructive" | "muted";

const loaderColorClass: Record<LoaderVariant, string> = {
  default:     "text-foreground",
  primary:     "text-primary",
  success:     "text-success",
  warning:     "text-warning",
  destructive: "text-destructive",
  muted:       "text-muted-foreground",
};

export interface LoaderProps extends React.SVGAttributes<SVGSVGElement> {
  /** Size of the spinner */
  size?: Size;
  /** Color variant */
  variant?: LoaderVariant;
  /** Screen-reader label — defaults to "Loading…" */
  label?: string;
}

const Loader = React.forwardRef<SVGSVGElement, LoaderProps>(
  ({ className, size = "md", variant = "default", label = "Loading…", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={loaderStrokeWidth[size]}
      role="status"
      aria-label={label}
      className={cn(
        loaderSizeClass[size],
        loaderColorClass[variant],
        "animate-spin",
        className
      )}
      {...props}
    >
      {/* Full circle track */}
      <circle cx="12" cy="12" r="10" className="opacity-20" />
      {/* Spinning arc ~75% of circle */}
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
);
Loader.displayName = "Loader";

export { Loader };
