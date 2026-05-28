"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const anchorVariants = cva(
  "inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "text-primary",
        muted:       "text-muted-foreground",
        destructive: "text-destructive",
      },
      underline: {
        always: "underline underline-offset-4",
        hover:  "hover:underline underline-offset-4",
        never:  "no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "hover",
    },
  }
);

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof anchorVariants> {
  /** Automatically append an external link icon and set rel/target. */
  external?: boolean;
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant, underline, external = false, children, ...props }, ref) => (
    <a
      ref={ref}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(anchorVariants({ variant, underline }), className)}
      {...props}
    >
      {children}
      {external && (
        <ExternalLink aria-hidden="true" className="h-3 w-3 shrink-0 opacity-70" />
      )}
    </a>
  )
);
Anchor.displayName = "Anchor";

export { Anchor };
