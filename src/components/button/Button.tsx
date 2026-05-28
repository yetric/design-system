"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        primary:     "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        outline:     "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        warning:     "bg-warning text-warning-foreground hover:bg-warning/90",
        success:     "bg-success text-success-foreground hover:bg-success/90",
        info:        "bg-info text-info-foreground hover:bg-info/90"
      },
      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        xl: "h-14 px-8 text-base"
      },
      radius: {
        none: "rounded-none",
        xs:   "rounded-sm",
        sm:   "rounded",
        md:   "rounded-md",
        lg:   "rounded-lg",
        xl:   "rounded-xl",
        full: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and disables the button during async operations. */
  isLoading?: boolean;
  /** Label read by screen readers when isLoading is true. Defaults to "Loading". */
  loadingText?: string;
  /** Icon rendered before the button label. Replaced by a spinner when isLoading is true. */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the button label. */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, disabled, isLoading = false, loadingText = "Loading", leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;
    const content = asChild ? children : (
      <>
        {isLoading
          ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          : leftIcon
            ? <span className="mr-2 inline-flex shrink-0 items-center" aria-hidden="true">{leftIcon}</span>
            : null}
        {isLoading && <span className="sr-only">{loadingText}</span>}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2 inline-flex shrink-0 items-center" aria-hidden="true">{rightIcon}</span>
        )}
      </>
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, className }))}
        ref={ref}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        data-disabled={isDisabled ? "" : undefined}
        data-loading={isLoading ? "" : undefined}
        {...(asChild ? {} : { disabled: isDisabled })}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
