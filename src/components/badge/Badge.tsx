"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

const badgeVariants = cva("inline-flex items-center gap-1 font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border border-border text-foreground",
      ghost: "text-foreground hover:bg-muted",
      destructive: "bg-destructive text-destructive-foreground",
      warning: "bg-warning text-warning-foreground",
      success: "bg-success text-success-foreground",
      info: "bg-info text-info-foreground",
    },
    size: {
      xs: "px-1.5 py-px text-xs",
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
      xl: "px-4 py-1.5 text-base",
    },
    radius: {
      none: "rounded-none",
      xs: "rounded-sm",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    radius: "full",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Leading icon slot */
  icon?: React.ReactNode;
  /** When provided, renders a dismiss (×) button at the trailing edge */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
}

function Badge({
  className,
  variant,
  size,
  radius,
  icon,
  onDismiss,
  dismissLabel = "Dismiss",
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, radius }), className)} {...props}>
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {props.children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className="ml-0.5 shrink-0 rounded-full opacity-70 hover:opacity-100 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-none"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

export { Badge, badgeVariants };
