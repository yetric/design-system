"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium select-none",
  {
    variants: {
      size: {
        xs: "min-w-[1.25rem] h-5 px-1 text-[10px] rounded",
        sm: "min-w-[1.5rem] h-6 px-1.5 text-xs rounded",
        md: "min-w-[1.75rem] h-7 px-2 text-xs rounded-md",
        lg: "min-w-[2rem] h-8 px-2.5 text-sm rounded-md",
      },
      variant: {
        default:
          "border border-border bg-muted text-muted-foreground shadow-[0_2px_0_1px] shadow-border",
        outline: "border border-border bg-background text-foreground",
        ghost: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, variant, ...props }, ref) => (
    <kbd
      ref={ref as React.Ref<HTMLElement>}
      className={cn(kbdVariants({ size, variant }), className)}
      {...props}
    />
  )
);
Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
