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
    },
  },
  defaultVariants: { size: "h2" },
});

type HeadingAs = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

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
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = "h2", as, children, ...props }, ref) => {
    const Comp = as ?? defaultTagForSize[size];
    return (
      <Comp
        ref={ref}
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

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: TextAs;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, color, as: Comp = "p", ...props }, ref) => (
    <Comp
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cn(textVariants({ size, weight, color }), className)}
      {...props}
    />
  )
);
Text.displayName = "Text";

export { Heading, headingVariants, Text, textVariants };
