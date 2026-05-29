"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const starSizeClass: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current rating value. */
  value?: number;
  /** Callback when value changes. */
  onChange?: (value: number) => void;
  /** Total number of stars. Defaults to 5. */
  count?: number;
  size?: Size;
  /** Color of filled stars (Tailwind text class). Defaults to "text-warning". */
  color?: string;
  /** Prevents interaction. */
  readOnly?: boolean;
}

function Rating({
  className,
  value = 0,
  onChange,
  count = 5,
  size = "md",
  color = "text-warning",
  readOnly = false,
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const displayed = hovered ?? value;

  return (
    <div
      role={readOnly ? undefined : "radiogroup"}
      aria-label="Rating"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayed;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={cn(
              "rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              readOnly ? "cursor-default" : "cursor-pointer",
              starSizeClass[size]
            )}
          >
            <Star
              aria-hidden="true"
              className={cn(
                "h-full w-full transition-colors",
                filled ? [color, "fill-current"] : "fill-none stroke-muted-foreground text-muted"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export { Rating };
