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

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  size?: Size;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, size = "md", ...props }, ref) => (
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
        error && "border-destructive focus-visible:ring-destructive",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
