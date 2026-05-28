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
        `gap-${gap}`,
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
