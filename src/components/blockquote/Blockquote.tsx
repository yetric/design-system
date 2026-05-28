"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const sizeClass: Record<Size, string> = {
  xs: "text-xs pl-3 border-l-2",
  sm: "text-sm pl-3 border-l-2",
  md: "text-base pl-4 border-l-4",
  lg: "text-lg pl-5 border-l-4",
  xl: "text-xl pl-6 border-l-4",
};

const citeSizeClass: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  /** Attribution — rendered as a `<cite>` below the quote. */
  cite?: string;
  size?: Size;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, cite, size = "md", children, ...props }, ref) => (
    <figure className="space-y-1">
      <blockquote
        ref={ref}
        className={cn(
          "border-primary italic text-foreground",
          sizeClass[size],
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption className={cn("text-muted-foreground not-italic", citeSizeClass[size])}>
          — <cite>{cite}</cite>
        </figcaption>
      )}
    </figure>
  )
);
Blockquote.displayName = "Blockquote";

export { Blockquote };
