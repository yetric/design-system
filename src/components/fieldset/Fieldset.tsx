"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";
import { Label } from "../label/Label";

const fieldsetSizeClass: Record<Size, string> = {
  xs: "p-2 gap-2",
  sm: "p-3 gap-2.5",
  md: "p-4 gap-3",
  lg: "p-5 gap-4",
  xl: "p-6 gap-4",
};

const legendSizeClass: Record<Size, string> = {
  xs: "text-xs px-1",
  sm: "text-xs px-1.5",
  md: "text-sm px-2",
  lg: "text-sm px-2",
  xl: "text-base px-2.5",
};

export interface FieldsetProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "children"> {
  /** Legend text rendered at the top border of the fieldset */
  legend?: string;
  children: React.ReactNode;
  size?: Size;
  radius?: Radius;
}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ className, legend, children, size = "md", radius = "md", disabled, ...props }, ref) => {
    const legendId = useId();
    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        aria-labelledby={legend ? legendId : undefined}
        className={cn(
          "flex flex-col border border-border",
          fieldsetSizeClass[size],
          radiusClass[radius],
          disabled && "opacity-60",
          className
        )}
        {...props}
      >
        {legend && (
          <legend
            id={legendId}
            className={cn(
              "float-left -mt-px font-medium text-foreground",
              legendSizeClass[size]
            )}
          >
            {legend}
          </legend>
        )}
        {children}
      </fieldset>
    );
  }
);
Fieldset.displayName = "Fieldset";

export { Fieldset };
