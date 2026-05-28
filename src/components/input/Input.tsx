"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const inputSizeClass: Record<Size, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
  xl: "h-14 px-5 text-base",
};

// Extra left padding when a leading icon is present
const iconPaddingLeft: Record<Size, string> = {
  xs: "pl-7",
  sm: "pl-8",
  md: "pl-9",
  lg: "pl-11",
  xl: "pl-12",
};

// Extra right padding when a trailing icon is present
const iconPaddingRight: Record<Size, string> = {
  xs: "pr-7",
  sm: "pr-8",
  md: "pr-9",
  lg: "pr-11",
  xl: "pr-12",
};

// Icon position from left edge per size
const iconPositionLeft: Record<Size, string> = {
  xs: "left-2",
  sm: "left-2.5",
  md: "left-3",
  lg: "left-4",
  xl: "left-5",
};

const iconPositionRight: Record<Size, string> = {
  xs: "right-2",
  sm: "right-2.5",
  md: "right-3",
  lg: "right-4",
  xl: "right-5",
};

// Icon h/w per input size
const iconClass: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4 w-4",
  xl: "h-5 w-5",
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: Size;
  /** Icon rendered inside the left edge of the input */
  leftIcon?: React.ReactNode;
  /** Icon rendered inside the right edge of the input */
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, size = "md", leftIcon, rightIcon, ...props }, ref) => {
    const input = (
      <input
        type={type}
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "flex w-full rounded-md border border-input bg-background",
          "placeholder:text-muted-foreground",
          "transition-colors duration-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          inputSizeClass[size],
          leftIcon && iconPaddingLeft[size],
          rightIcon && iconPaddingRight[size],
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
    );

    if (!leftIcon && !rightIcon) return input;

    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center text-muted-foreground [&>svg]:h-full [&>svg]:w-full",
              iconPositionLeft[size],
              iconClass[size]
            )}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        {input}
        {rightIcon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center text-muted-foreground [&>svg]:h-full [&>svg]:w-full",
              iconPositionRight[size],
              iconClass[size]
            )}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
