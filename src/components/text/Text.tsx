"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

// ─── Heading ────────────────────────────────────────────────────────────────

const headingVariants = cva("font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      display: "text-5xl font-bold leading-tight",
      h1:      "text-4xl font-bold leading-tight",
      h2:      "text-3xl leading-snug",
      h3:      "text-2xl leading-snug",
      h4:      "text-xl leading-normal",
      h5:      "text-lg leading-normal",
      h6:      "text-base leading-normal",
    },
  },
  defaultVariants: { size: "h2" },
});

type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Rendered HTML element. Defaults to matching the size (h1→h1, h2→h2, etc.). */
  as?: HeadingAs;
}

const defaultTagForSize: Record<NonNullable<HeadingProps["size"]>, HeadingAs> = {
  display: "h1",
  h1:      "h1",
  h2:      "h2",
  h3:      "h3",
  h4:      "h4",
  h5:      "h5",
  h6:      "h6",
};

const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  ({ className, size = "h2", as, children, ...props }, ref) => {
    const Comp = as ?? defaultTagForSize[size ?? "h2"];
    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as React.Ref<any>}
        className={cn(headingVariants({ size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Heading.displayName = "Heading";

// ─── Text ────────────────────────────────────────────────────────────────────

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      "body-lg": "text-lg leading-relaxed",
      body:      "text-base leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      caption:   "text-xs leading-normal",
      label:     "text-sm font-medium leading-none",
    },
    weight: {
      normal:   "font-normal",
      medium:   "font-medium",
      semibold: "font-semibold",
      bold:     "font-bold",
    },
    color: {
      default: "text-foreground",
      muted:   "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-success-foreground",
    },
  },
  defaultVariants: { size: "body" },
});

type TextAs = "p" | "span" | "div" | "label" | "small" | "strong" | "em";

const lineClampClass: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: TextAs;
  /** Truncate text with an ellipsis on overflow. */
  truncate?: boolean;
  /** Clamp text to a maximum number of lines (1–6). */
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, color, truncate, lineClamp, as: Comp = "p", ...props }, ref) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Comp
      ref={ref as React.Ref<any>}
      className={cn(
        textVariants({ size, weight, color }),
        truncate && "truncate",
        lineClamp && lineClampClass[lineClamp],
        className
      )}
      {...props}
    />
  )
);
Text.displayName = "Text";

export { Heading, headingVariants, Text, textVariants };
