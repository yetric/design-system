"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const switchRootVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        xs: "h-4 w-7",
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[3.25rem]",
        xl: "h-8 w-[3.75rem]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3 data-[state=checked]:translate-x-3",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-[1.625rem]",
        xl: "h-7 w-7 data-[state=checked]:translate-x-[1.875rem]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface SwitchProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchRootVariants> {
  /** Optional label rendered next to the switch */
  label?: string;
  /** Which side of the switch the label appears on. Defaults to "end" (right). */
  labelPlacement?: "start" | "end";
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size, label, labelPlacement = "end", id, ...props }, ref) => {
    const autoId = React.useId();
    const switchId = id ?? autoId;

    const root = (
      <SwitchPrimitive.Root
        id={switchId}
        ref={ref}
        className={cn(switchRootVariants({ size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitive.Root>
    );

    if (!label) return root;

    const labelEl = (
      <label
        htmlFor={switchId}
        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    );

    return (
      <div className="flex items-center gap-2">
        {labelPlacement === "start" && labelEl}
        {root}
        {labelPlacement === "end" && labelEl}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
