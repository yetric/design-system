"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

type Direction = "row" | "column" | "row-reverse" | "column-reverse";
type Align = "start" | "center" | "end" | "stretch" | "baseline";
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
type Wrap = "wrap" | "nowrap" | "wrap-reverse";

const directionClass: Record<Direction, string> = {
  row:            "flex-row",
  column:         "flex-col",
  "row-reverse":  "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

const alignClass: Record<Align, string> = {
  start:    "items-start",
  center:   "items-center",
  end:      "items-end",
  stretch:  "items-stretch",
  baseline: "items-baseline",
};

const justifyClass: Record<Justify, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
  evenly:  "justify-evenly",
};

const wrapClass: Record<Wrap, string> = {
  wrap:         "flex-wrap",
  nowrap:       "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const gapClass: Record<number, string> = {
  0: "gap-0", 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4",
  5: "gap-5", 6: "gap-6", 7: "gap-7", 8: "gap-8", 10: "gap-10",
  12: "gap-12", 14: "gap-14", 16: "gap-16", 20: "gap-20", 24: "gap-24",
  28: "gap-28", 32: "gap-32", 36: "gap-36", 40: "gap-40", 48: "gap-48",
  56: "gap-56", 64: "gap-64", 72: "gap-72", 80: "gap-80", 96: "gap-96",
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction. Defaults to "column". */
  direction?: Direction;
  /** Gap between children using Tailwind gap scale (0–96). Defaults to 4. */
  gap?: number;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  /** Render as a different element. Defaults to "div". */
  as?: React.ElementType;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "column",
      gap = 4,
      align,
      justify,
      wrap,
      as: Comp = "div",
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        "flex",
        directionClass[direction],
        gapClass[gap] ?? `gap-[${gap}px]`,
        align && alignClass[align],
        justify && justifyClass[justify],
        wrap && wrapClass[wrap],
        className
      )}
      {...props}
    />
  )
);
Stack.displayName = "Stack";

export { Stack };
