"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { shadowClass, type ShadowSize } from "../../lib/shadow";

// Spacing design tokens mapped to Tailwind spacing classes.
// none=0, xs=1(4px), sm=2(8px), md=4(16px), lg=6(24px), xl=8(32px)

export type SpacingSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";

// Gap uses the same 4px Tailwind scale as Stack.
const gapClass: Record<number, string> = {
  0: "gap-0", 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4",
  5: "gap-5", 6: "gap-6", 7: "gap-7", 8: "gap-8", 10: "gap-10",
  12: "gap-12", 14: "gap-14", 16: "gap-16",
};

export type RadiusSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
const radiusClass: Record<RadiusSize, string> = {
  none: "rounded-none",
  xs:   "rounded-sm",
  sm:   "rounded",
  md:   "rounded-md",
  lg:   "rounded-lg",
  xl:   "rounded-xl",
  full: "rounded-full",
};

export type OverflowValue = "hidden" | "visible" | "auto" | "scroll";
const overflowClass: Record<OverflowValue, string> = {
  hidden:  "overflow-hidden",
  visible: "overflow-visible",
  auto:    "overflow-auto",
  scroll:  "overflow-scroll",
};

export type WidthValue = "full" | "auto" | "fit";
const widthClass: Record<WidthValue, string> = {
  full: "w-full",
  auto: "w-auto",
  fit:  "w-fit",
};

export type MaxWidthValue = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "screen";
const maxWidthClass: Record<MaxWidthValue, string> = {
  xs:     "max-w-xs",
  sm:     "max-w-sm",
  md:     "max-w-md",
  lg:     "max-w-lg",
  xl:     "max-w-xl",
  "2xl":  "max-w-2xl",
  "3xl":  "max-w-3xl",
  "4xl":  "max-w-4xl",
  "5xl":  "max-w-5xl",
  "6xl":  "max-w-6xl",
  "7xl":  "max-w-7xl",
  full:   "max-w-full",
  screen: "max-w-screen-xl",
};

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
  /** Gap between children using the 4px spacing scale (e.g. 4 = 1rem). Only useful with display="flex" or display="grid". */
  gap?: number;
  /** Border radius token */
  radius?: RadiusSize;
  /** Overflow behaviour */
  overflow?: OverflowValue;
  /** Width shorthand */
  width?: WidthValue;
  /** Maximum width token */
  maxWidth?: MaxWidthValue;
  /** Set to false to disable flex shrink (shrink-0). */
  shrink?: boolean;
  /** Set to true to allow the element to grow (flex-grow: 1). */
  grow?: boolean;
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
  /** Box shadow */
  shadow?: ShadowSize;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Comp = "div",
      display,
      gap,
      radius,
      overflow,
      width,
      maxWidth,
      shrink,
      grow,
      shadow,
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
        display    !== undefined && displayMap[display],
        gap        !== undefined && (gapClass[gap] ?? `gap-[${gap * 4}px]`),
        radius     !== undefined && radiusClass[radius],
        overflow   !== undefined && overflowClass[overflow],
        width      !== undefined && widthClass[width],
        maxWidth   !== undefined && maxWidthClass[maxWidth],
        shrink     === false     && "shrink-0",
        grow       === true      && "grow",
        shadow     !== undefined && shadowClass[shadow],
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
