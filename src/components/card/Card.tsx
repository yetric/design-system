"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { shadowClass, type ShadowSize } from "../../lib/shadow";

// ─── Card ─────────────────────────────────────────────────────────────────────

const cardVariants = cva(
  "relative flex flex-col text-card-foreground transition-[box-shadow,transform]",
  {
    variants: {
      variant: {
        /** Border + card background + subtle shadow (default) */
        default: "border border-border bg-card",
        /** Stronger border, no shadow, transparent-compatible */
        outlined: "border-2 border-border bg-card",
        /** No border or shadow — blends into the page background */
        ghost: "bg-transparent",
        /** Elevated appearance using a more prominent shadow */
        elevated: "border border-border bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  radius?: Radius;
  /** Box shadow. Defaults to "sm". Use "none" on ghost/outlined variants if desired. */
  shadow?: ShadowSize;
  /** Adds hover lift effect — useful for clickable/link cards. */
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", radius = "lg", shadow, interactive = false, ...props },
    ref
  ) => {
    const resolvedShadow: ShadowSize =
      shadow ?? (variant === "elevated" ? "lg" : variant === "ghost" ? "none" : "sm");

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant }),
          radiusClass[radius],
          shadowClass[resolvedShadow],
          interactive &&
            "focus-visible:ring-ring cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// ─── CardImage ────────────────────────────────────────────────────────────────

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Tailwind aspect-ratio class. Defaults to "aspect-video". */
  aspectClass?: string;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps & { wrapperClassName?: string }>(
  ({ className, wrapperClassName, aspectClass = "aspect-video", alt = "", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-t-[inherit]", aspectClass, wrapperClassName)}
    >
      <img alt={alt} className={cn("h-full w-full object-cover", className)} {...props} />
    </div>
  )
);
CardImage.displayName = "CardImage";

// ─── CardHeader ───────────────────────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional node rendered flush-right in the header row (e.g. a menu trigger). */
  actions?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-4 p-6", className)}
      {...props}
    >
      <div className="flex flex-col space-y-1">{children}</div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

// ─── CardTitle ────────────────────────────────────────────────────────────────

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level rendered in the DOM. Defaults to "h3". */
  as?: HeadingLevel;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = "h3", ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn("text-lg leading-tight font-semibold tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// ─── CardDescription ──────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

// ─── CardContent ──────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 px-6 pb-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// ─── CardFooter ───────────────────────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How to justify footer content. Defaults to "start". */
  justify?: "start" | "end" | "between" | "center";
}

const justifyClass: Record<NonNullable<CardFooterProps["justify"]>, string> = {
  start: "justify-start",
  end: "justify-end",
  between: "justify-between",
  center: "justify-center",
};

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, justify = "start", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 px-6 pb-6", justifyClass[justify], className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// ─── Exports ──────────────────────────────────────────────────────────────────

export { Card, CardImage, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
