"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

// Spacing design tokens mapped to Tailwind spacing classes.
// none=0, xs=1(4px), sm=2(8px), md=4(16px), lg=6(24px), xl=8(32px)

export type SpacingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const spacingToClass = {
  p:  { none: "p-0",  xs: "p-1",  sm: "p-2",  md: "p-4",  lg: "p-6",  xl: "p-8"  },
  px: { none: "px-0", xs: "px-1", sm: "px-2", md: "px-4", lg: "px-6", xl: "px-8" },
  py: { none: "py-0", xs: "py-1", sm: "py-2", md: "py-4", lg: "py-6", xl: "py-8" },
  pt: { none: "pt-0", xs: "pt-1", sm: "pt-2", md: "pt-4", lg: "pt-6", xl: "pt-8" },
  pb: { none: "pb-0", xs: "pb-1", sm: "pb-2", md: "pb-4", lg: "pb-6", xl: "pb-8" },
  pl: { none: "pl-0", xs: "pl-1", sm: "pl-2", md: "pl-4", lg: "pl-6", xl: "pl-8" },
  pr: { none: "pr-0", xs: "pr-1", sm: "pr-2", md: "pr-4", lg: "pr-6", xl: "pr-8" },
  m:  { none: "m-0",  xs: "m-1",  sm: "m-2",  md: "m-4",  lg: "m-6",  xl: "m-8"  },
  mx: { none: "mx-0", xs: "mx-1", sm: "mx-2", md: "mx-4", lg: "mx-6", xl: "mx-8" },
  my: { none: "my-0", xs: "my-1", sm: "my-2", md: "my-4", lg: "my-6", xl: "my-8" },
  mt: { none: "mt-0", xs: "mt-1", sm: "mt-2", md: "mt-4", lg: "mt-6", xl: "mt-8" },
  mb: { none: "mb-0", xs: "mb-1", sm: "mb-2", md: "mb-4", lg: "mb-6", xl: "mb-8" },
  ml: { none: "ml-0", xs: "ml-1", sm: "ml-2", md: "ml-4", lg: "ml-6", xl: "ml-8" },
  mr: { none: "mr-0", xs: "mr-1", sm: "mr-2", md: "mr-4", lg: "mr-6", xl: "mr-8" },
} as const;

type DisplayValue = "block" | "inline" | "inline-block" | "flex" | "inline-flex" | "grid" | "inline-grid" | "hidden" | "contents";

const displayMap: Record<DisplayValue, string> = {
  block: "block",
  inline: "inline",
  "inline-block": "inline-block",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  hidden: "hidden",
  contents: "contents",
};

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different HTML element. Defaults to "div". */
  as?: React.ElementType;
  /** CSS display value */
  display?: DisplayValue;
  /** Padding (all sides) */
  p?: SpacingSize;
  /** Horizontal padding */
  px?: SpacingSize;
  /** Vertical padding */
  py?: SpacingSize;
  /** Padding top */
  pt?: SpacingSize;
  /** Padding bottom */
  pb?: SpacingSize;
  /** Padding left */
  pl?: SpacingSize;
  /** Padding right */
  pr?: SpacingSize;
  /** Margin (all sides) */
  m?: SpacingSize;
  /** Horizontal margin */
  mx?: SpacingSize;
  /** Vertical margin */
  my?: SpacingSize;
  /** Margin top */
  mt?: SpacingSize;
  /** Margin bottom */
  mb?: SpacingSize;
  /** Margin left */
  ml?: SpacingSize;
  /** Margin right */
  mr?: SpacingSize;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Comp = "div",
      display,
      p, px, py, pt, pb, pl, pr,
      m, mx, my, mt, mb, ml, mr,
      className,
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        display !== undefined && displayMap[display],
        p  !== undefined && spacingToClass.p[p],
        px !== undefined && spacingToClass.px[px],
        py !== undefined && spacingToClass.py[py],
        pt !== undefined && spacingToClass.pt[pt],
        pb !== undefined && spacingToClass.pb[pb],
        pl !== undefined && spacingToClass.pl[pl],
        pr !== undefined && spacingToClass.pr[pr],
        m  !== undefined && spacingToClass.m[m],
        mx !== undefined && spacingToClass.mx[mx],
        my !== undefined && spacingToClass.my[my],
        mt !== undefined && spacingToClass.mt[mt],
        mb !== undefined && spacingToClass.mb[mb],
        ml !== undefined && spacingToClass.ml[ml],
        mr !== undefined && spacingToClass.mr[mr],
        className
      )}
      {...props}
    />
  )
);
Box.displayName = "Box";

export { Box };
