import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground",
        secondary:   "bg-secondary text-secondary-foreground",
        outline:     "border border-border text-foreground",
        ghost:       "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground",
        warning:     "bg-warning text-warning-foreground",
        success:     "bg-success text-success-foreground",
        info:        "bg-info text-info-foreground"
      },
      size: {
        xs: "px-1.5 py-px text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base"
      },
      radius: {
        none: "rounded-none",
        xs:   "rounded-sm",
        sm:   "rounded",
        md:   "rounded-md",
        lg:   "rounded-lg",
        xl:   "rounded-xl",
        full: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, radius, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, radius }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
