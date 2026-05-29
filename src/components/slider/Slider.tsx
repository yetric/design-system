"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/cn";

type SliderSize = "sm" | "md" | "lg";

const trackClass: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbClass: Record<SliderSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  size?: SliderSize;
  /** Accessible label forwarded to the slider thumb(s). Required when no visible label is associated. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      size = "md",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      ...props
    },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "bg-secondary relative w-full grow overflow-hidden rounded-full",
          trackClass[size]
        )}
      >
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      {(props.defaultValue ?? props.value ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className={cn(
            "border-primary/50 bg-background block rounded-full border shadow transition-colors",
            "focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-50",
            thumbClass[size]
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
);
Slider.displayName = "Slider";

export { Slider };
