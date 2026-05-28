"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { shadowClass, type ShadowSize } from "../../lib/shadow";

const paddingClass: Record<number, string> = {
  0: "p-0", 1: "p-1", 2: "p-2", 3: "p-3", 4: "p-4",
  5: "p-5", 6: "p-6", 8: "p-8", 10: "p-10", 12: "p-12",
};

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: ShadowSize;
  radius?: Radius;
  /** Padding shorthand (Tailwind scale 0–12). Defaults to 4. */
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  /** Render as a different element. */
  as?: React.ElementType;
}

const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, shadow = "sm", radius = "md", p = 4, as: Comp = "div", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border border-border",
        radiusClass[radius],
        shadowClass[shadow],
        paddingClass[p],
        className
      )}
      {...props}
    />
  )
);
Paper.displayName = "Paper";

export { Paper };
