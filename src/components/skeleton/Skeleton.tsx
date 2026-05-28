"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";

const presetClass: Record<string, string> = {
  default: "",
  text:    "h-4 w-full",
  heading: "h-6 w-3/4",
  avatar:  "h-10 w-10",
  button:  "h-10 w-24",
  card:    "h-32 w-full",
  badge:   "h-5 w-16",
};

const presetRadius: Record<string, Radius> = {
  default: "md",
  text:    "sm",
  heading: "sm",
  avatar:  "full",
  button:  "md",
  card:    "lg",
  badge:   "full",
};

type SkeletonPreset = keyof typeof presetClass;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: Radius;
  /** Named preset that sets default dimensions and shape. Override with className. */
  preset?: SkeletonPreset;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, radius, preset = "default", ...props }, ref) => {
    const resolvedRadius = radius ?? presetRadius[preset];
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "animate-pulse bg-muted",
          presetClass[preset],
          radiusClass[resolvedRadius],
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonPreset };
