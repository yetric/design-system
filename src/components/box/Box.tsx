"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

// Full class-string lookup maps — all strings must be literals so Tailwind
// detects them via static content scanning.

const pMap: Record<number, string> = {
  0: "p-0", 1: "p-1", 2: "p-2", 3: "p-3", 4: "p-4", 5: "p-5",
  6: "p-6", 7: "p-7", 8: "p-8", 9: "p-9", 10: "p-10", 11: "p-11",
  12: "p-12", 14: "p-14", 16: "p-16", 20: "p-20", 24: "p-24",
  28: "p-28", 32: "p-32", 36: "p-36", 40: "p-40", 44: "p-44",
  48: "p-48", 56: "p-56", 64: "p-64", 72: "p-72", 80: "p-80", 96: "p-96",
};
const pxMap: Record<number, string> = {
  0: "px-0", 1: "px-1", 2: "px-2", 3: "px-3", 4: "px-4", 5: "px-5",
  6: "px-6", 7: "px-7", 8: "px-8", 9: "px-9", 10: "px-10", 11: "px-11",
  12: "px-12", 14: "px-14", 16: "px-16", 20: "px-20", 24: "px-24",
  28: "px-28", 32: "px-32", 36: "px-36", 40: "px-40", 44: "px-44",
  48: "px-48", 56: "px-56", 64: "px-64", 72: "px-72", 80: "px-80", 96: "px-96",
};
const pyMap: Record<number, string> = {
  0: "py-0", 1: "py-1", 2: "py-2", 3: "py-3", 4: "py-4", 5: "py-5",
  6: "py-6", 7: "py-7", 8: "py-8", 9: "py-9", 10: "py-10", 11: "py-11",
  12: "py-12", 14: "py-14", 16: "py-16", 20: "py-20", 24: "py-24",
  28: "py-28", 32: "py-32", 36: "py-36", 40: "py-40", 44: "py-44",
  48: "py-48", 56: "py-56", 64: "py-64", 72: "py-72", 80: "py-80", 96: "py-96",
};
const ptMap: Record<number, string> = {
  0: "pt-0", 1: "pt-1", 2: "pt-2", 3: "pt-3", 4: "pt-4", 5: "pt-5",
  6: "pt-6", 7: "pt-7", 8: "pt-8", 9: "pt-9", 10: "pt-10", 11: "pt-11",
  12: "pt-12", 14: "pt-14", 16: "pt-16", 20: "pt-20", 24: "pt-24",
  28: "pt-28", 32: "pt-32", 36: "pt-36", 40: "pt-40", 44: "pt-44",
  48: "pt-48", 56: "pt-56", 64: "pt-64", 72: "pt-72", 80: "pt-80", 96: "pt-96",
};
const pbMap: Record<number, string> = {
  0: "pb-0", 1: "pb-1", 2: "pb-2", 3: "pb-3", 4: "pb-4", 5: "pb-5",
  6: "pb-6", 7: "pb-7", 8: "pb-8", 9: "pb-9", 10: "pb-10", 11: "pb-11",
  12: "pb-12", 14: "pb-14", 16: "pb-16", 20: "pb-20", 24: "pb-24",
  28: "pb-28", 32: "pb-32", 36: "pb-36", 40: "pb-40", 44: "pb-44",
  48: "pb-48", 56: "pb-56", 64: "pb-64", 72: "pb-72", 80: "pb-80", 96: "pb-96",
};
const plMap: Record<number, string> = {
  0: "pl-0", 1: "pl-1", 2: "pl-2", 3: "pl-3", 4: "pl-4", 5: "pl-5",
  6: "pl-6", 7: "pl-7", 8: "pl-8", 9: "pl-9", 10: "pl-10", 11: "pl-11",
  12: "pl-12", 14: "pl-14", 16: "pl-16", 20: "pl-20", 24: "pl-24",
  28: "pl-28", 32: "pl-32", 36: "pl-36", 40: "pl-40", 44: "pl-44",
  48: "pl-48", 56: "pl-56", 64: "pl-64", 72: "pl-72", 80: "pl-80", 96: "pl-96",
};
const prMap: Record<number, string> = {
  0: "pr-0", 1: "pr-1", 2: "pr-2", 3: "pr-3", 4: "pr-4", 5: "pr-5",
  6: "pr-6", 7: "pr-7", 8: "pr-8", 9: "pr-9", 10: "pr-10", 11: "pr-11",
  12: "pr-12", 14: "pr-14", 16: "pr-16", 20: "pr-20", 24: "pr-24",
  28: "pr-28", 32: "pr-32", 36: "pr-36", 40: "pr-40", 44: "pr-44",
  48: "pr-48", 56: "pr-56", 64: "pr-64", 72: "pr-72", 80: "pr-80", 96: "pr-96",
};
const mMap: Record<number, string> = {
  0: "m-0", 1: "m-1", 2: "m-2", 3: "m-3", 4: "m-4", 5: "m-5",
  6: "m-6", 7: "m-7", 8: "m-8", 9: "m-9", 10: "m-10", 11: "m-11",
  12: "m-12", 14: "m-14", 16: "m-16", 20: "m-20", 24: "m-24",
  28: "m-28", 32: "m-32", 36: "m-36", 40: "m-40", 44: "m-44",
  48: "m-48", 56: "m-56", 64: "m-64", 72: "m-72", 80: "m-80", 96: "m-96",
};
const mxMap: Record<number, string> = {
  0: "mx-0", 1: "mx-1", 2: "mx-2", 3: "mx-3", 4: "mx-4", 5: "mx-5",
  6: "mx-6", 7: "mx-7", 8: "mx-8", 9: "mx-9", 10: "mx-10", 11: "mx-11",
  12: "mx-12", 14: "mx-14", 16: "mx-16", 20: "mx-20", 24: "mx-24",
  28: "mx-28", 32: "mx-32", 36: "mx-36", 40: "mx-40", 44: "mx-44",
  48: "mx-48", 56: "mx-56", 64: "mx-64", 72: "mx-72", 80: "mx-80", 96: "mx-96",
};
const myMap: Record<number, string> = {
  0: "my-0", 1: "my-1", 2: "my-2", 3: "my-3", 4: "my-4", 5: "my-5",
  6: "my-6", 7: "my-7", 8: "my-8", 9: "my-9", 10: "my-10", 11: "my-11",
  12: "my-12", 14: "my-14", 16: "my-16", 20: "my-20", 24: "my-24",
  28: "my-28", 32: "my-32", 36: "my-36", 40: "my-40", 44: "my-44",
  48: "my-48", 56: "my-56", 64: "my-64", 72: "my-72", 80: "my-80", 96: "my-96",
};
const mtMap: Record<number, string> = {
  0: "mt-0", 1: "mt-1", 2: "mt-2", 3: "mt-3", 4: "mt-4", 5: "mt-5",
  6: "mt-6", 7: "mt-7", 8: "mt-8", 9: "mt-9", 10: "mt-10", 11: "mt-11",
  12: "mt-12", 14: "mt-14", 16: "mt-16", 20: "mt-20", 24: "mt-24",
  28: "mt-28", 32: "mt-32", 36: "mt-36", 40: "mt-40", 44: "mt-44",
  48: "mt-48", 56: "mt-56", 64: "mt-64", 72: "mt-72", 80: "mt-80", 96: "mt-96",
};
const mbMap: Record<number, string> = {
  0: "mb-0", 1: "mb-1", 2: "mb-2", 3: "mb-3", 4: "mb-4", 5: "mb-5",
  6: "mb-6", 7: "mb-7", 8: "mb-8", 9: "mb-9", 10: "mb-10", 11: "mb-11",
  12: "mb-12", 14: "mb-14", 16: "mb-16", 20: "mb-20", 24: "mb-24",
  28: "mb-28", 32: "mb-32", 36: "mb-36", 40: "mb-40", 44: "mb-44",
  48: "mb-48", 56: "mb-56", 64: "mb-64", 72: "mb-72", 80: "mb-80", 96: "mb-96",
};
const mlMap: Record<number, string> = {
  0: "ml-0", 1: "ml-1", 2: "ml-2", 3: "ml-3", 4: "ml-4", 5: "ml-5",
  6: "ml-6", 7: "ml-7", 8: "ml-8", 9: "ml-9", 10: "ml-10", 11: "ml-11",
  12: "ml-12", 14: "ml-14", 16: "ml-16", 20: "ml-20", 24: "ml-24",
  28: "ml-28", 32: "ml-32", 36: "ml-36", 40: "ml-40", 44: "ml-44",
  48: "ml-48", 56: "ml-56", 64: "ml-64", 72: "ml-72", 80: "ml-80", 96: "ml-96",
};
const mrMap: Record<number, string> = {
  0: "mr-0", 1: "mr-1", 2: "mr-2", 3: "mr-3", 4: "mr-4", 5: "mr-5",
  6: "mr-6", 7: "mr-7", 8: "mr-8", 9: "mr-9", 10: "mr-10", 11: "mr-11",
  12: "mr-12", 14: "mr-14", 16: "mr-16", 20: "mr-20", 24: "mr-24",
  28: "mr-28", 32: "mr-32", 36: "mr-36", 40: "mr-40", 44: "mr-44",
  48: "mr-48", 56: "mr-56", 64: "mr-64", 72: "mr-72", 80: "mr-80", 96: "mr-96",
};

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

/** Tailwind spacing scale values */
export type SpacingScale =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48
  | 56 | 64 | 72 | 80 | 96;

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different HTML element. Defaults to "div". */
  as?: React.ElementType;
  /** CSS display value */
  display?: DisplayValue;
  /** Padding (all sides) */
  p?: SpacingScale;
  /** Horizontal padding */
  px?: SpacingScale;
  /** Vertical padding */
  py?: SpacingScale;
  /** Padding top */
  pt?: SpacingScale;
  /** Padding bottom */
  pb?: SpacingScale;
  /** Padding left */
  pl?: SpacingScale;
  /** Padding right */
  pr?: SpacingScale;
  /** Margin (all sides) */
  m?: SpacingScale;
  /** Horizontal margin */
  mx?: SpacingScale;
  /** Vertical margin */
  my?: SpacingScale;
  /** Margin top */
  mt?: SpacingScale;
  /** Margin bottom */
  mb?: SpacingScale;
  /** Margin left */
  ml?: SpacingScale;
  /** Margin right */
  mr?: SpacingScale;
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
        p  !== undefined && pMap[p],
        px !== undefined && pxMap[px],
        py !== undefined && pyMap[py],
        pt !== undefined && ptMap[pt],
        pb !== undefined && pbMap[pb],
        pl !== undefined && plMap[pl],
        pr !== undefined && prMap[pr],
        m  !== undefined && mMap[m],
        mx !== undefined && mxMap[mx],
        my !== undefined && myMap[my],
        mt !== undefined && mtMap[mt],
        mb !== undefined && mbMap[mb],
        ml !== undefined && mlMap[ml],
        mr !== undefined && mrMap[mr],
        className
      )}
      {...props}
    />
  )
);
Box.displayName = "Box";

export { Box };
