"use client";

import { Loader2 } from "lucide-react";

import { cn } from "../../lib/cn";

const indicatorSizeClass = {
  sm: {
    root: "gap-2 text-xs",
    dot: "h-1.5 w-1.5",
    pulse: "h-2.5 w-2.5",
    spinner: "h-3.5 w-3.5",
  },
  md: {
    root: "gap-2.5 text-sm",
    dot: "h-2 w-2",
    pulse: "h-3 w-3",
    spinner: "h-4 w-4",
  },
  lg: {
    root: "gap-3 text-base",
    dot: "h-2.5 w-2.5",
    pulse: "h-3.5 w-3.5",
    spinner: "h-5 w-5",
  },
} as const;

export interface ThinkingIndicatorProps {
  label?: string;
  variant?: "dots" | "pulse" | "spinner";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ThinkingIndicator = ({
  label = "Thinking",
  variant = "dots",
  size = "md",
  className,
}: ThinkingIndicatorProps) => {
  const sizeClasses = indicatorSizeClass[size];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center text-muted-foreground", sizeClasses.root, className)}
    >
      {variant === "dots" && (
        <div className="inline-flex items-center gap-1" aria-hidden="true">
          <span className={cn("animate-bounce rounded-full bg-current", sizeClasses.dot)} />
          <span
            className={cn(
              "animate-bounce rounded-full bg-current [animation-delay:150ms]",
              sizeClasses.dot
            )}
          />
          <span
            className={cn(
              "animate-bounce rounded-full bg-current [animation-delay:300ms]",
              sizeClasses.dot
            )}
          />
        </div>
      )}
      {variant === "pulse" && (
        <span
          className={cn("animate-pulse rounded-full bg-current", sizeClasses.pulse)}
          aria-hidden="true"
        />
      )}
      {variant === "spinner" && (
        <Loader2 className={cn("animate-spin", sizeClasses.spinner)} aria-hidden="true" />
      )}
      <span>{label}</span>
    </div>
  );
};

ThinkingIndicator.displayName = "ThinkingIndicator";

export { ThinkingIndicator };
