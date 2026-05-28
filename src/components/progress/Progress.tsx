"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
        xl: "h-6",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default:     "bg-primary",
        success:     "bg-success",
        warning:     "bg-warning",
        destructive: "bg-destructive",
        info:        "bg-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /** 0–100. When undefined the bar shows an indeterminate animation. */
  value?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size }), className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        progressIndicatorVariants({ variant }),
        value === undefined && "animate-[indeterminate_1.5s_ease-in-out_infinite]"
      )}
      style={{
        transform: value !== undefined ? `translateX(-${100 - value}%)` : undefined,
        ...(value === undefined
          ? { animation: "indeterminate 1.5s ease-in-out infinite" }
          : {}),
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";

export { Progress };
