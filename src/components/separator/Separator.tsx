"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

type SeparatorThickness = "thin" | "medium" | "thick";
type SeparatorColor = "border" | "muted" | "accent";

const thicknessClass: Record<SeparatorThickness, Record<"horizontal" | "vertical", string>> = {
  thin:   { horizontal: "h-px",  vertical: "w-px" },
  medium: { horizontal: "h-0.5", vertical: "w-0.5" },
  thick:  { horizontal: "h-1",   vertical: "w-1" },
};

const colorClass: Record<SeparatorColor, string> = {
  border: "bg-border",
  muted:  "bg-muted",
  accent: "bg-accent",
};

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  thickness?: SeparatorThickness;
  color?: SeparatorColor;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, thickness = "thin", color = "border", ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "w-full" : "h-full",
        thicknessClass[thickness][orientation],
        colorClass[color],
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
