"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";
import { Label } from "../label/Label";

const textareaSizeClass: Record<Size, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
  xl: "px-5 py-4 text-base",
};

const labelSizeClass: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

const helperSizeClass: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-sm",
};

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Visual label rendered above the textarea */
  label?: string;
  /** Helper text shown below the textarea */
  helpText?: string;
  /** Error message (string) or error state flag (boolean) */
  error?: string | boolean;
  /** Marks the label with a required indicator */
  required?: boolean;
  /** className applied to the outer wrapper div */
  wrapperClassName?: string;
  size?: Size;
  radius?: Radius;
  /** When true the textarea grows automatically with content */
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helpText,
      error,
      required,
      size = "md",
      radius = "md",
      autoResize = false,
      id: idProp,
      wrapperClassName,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = typeof error === "string" ? `${id}-error` : undefined;
    const hasError = Boolean(error);
    const describedBy = [helpTextId, errorId].filter(Boolean).join(" ") || undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} required={required} className={cn("mb-1.5", labelSizeClass[size])}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(
            "flex w-full border border-input bg-background",
            "placeholder:text-muted-foreground",
            "transition-colors duration-base",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[100px]",
            autoResize ? "resize-none overflow-hidden" : "resize-y",
            textareaSizeClass[size],
            radiusClass[radius],
            hasError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {helpText && !hasError && (
          <p id={helpTextId} className={cn("mt-1 text-muted-foreground", helperSizeClass[size])}>
            {helpText}
          </p>
        )}
        {typeof error === "string" && (
          <p id={errorId} role="alert" className={cn("mt-1 text-destructive", helperSizeClass[size])}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
