"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";
import { Label } from "../label/Label";

const numberInputSizeClass: Record<Size, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
  xl: "h-14 px-5 text-base",
};

const stepBtnSizeClass: Record<Size, string> = {
  xs: "h-7 w-7",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
};

const stepIconSizeClass: Record<Size, string> = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-4 w-4",
  xl: "h-5 w-5",
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

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "value" | "onChange"
> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Visual label rendered above the input */
  label?: string;
  /** Helper text shown below the input */
  helpText?: string;
  /** Error message (string) or error state flag (boolean) */
  error?: string | boolean;
  /** Marks the label with a required indicator */
  required?: boolean;
  /** className applied to the outer wrapper div */
  wrapperClassName?: string;
  size?: Size;
  radius?: Radius;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      helpText,
      error,
      required,
      size = "md",
      radius = "md",
      value,
      onChange,
      min,
      max,
      step = 1,
      disabled,
      id: idProp,
      wrapperClassName,
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

    const clamp = (v: number) => {
      if (min !== undefined && v < min) return min;
      if (max !== undefined && v > max) return max;
      return v;
    };

    const decrement = () => {
      const next = clamp((value ?? 0) - step);
      onChange?.(next);
    };

    const increment = () => {
      const next = clamp((value ?? 0) + step);
      onChange?.(next);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
        onChange?.(clamp(parsed));
      }
    };

    const canDecrement = !disabled && (min === undefined || (value ?? 0) > min);
    const canIncrement = !disabled && (max === undefined || (value ?? 0) < max);

    const borderColor = hasError ? "border-destructive" : "border-input";
    const ringColor = hasError ? "focus-within:ring-destructive" : "focus-within:ring-ring";

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} required={required} className={cn("mb-1.5", labelSizeClass[size])}>
            {label}
          </Label>
        )}

        <div
          className={cn(
            "inline-flex items-center border bg-background transition-colors duration-base",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background",
            borderColor,
            ringColor,
            radiusClass[radius],
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Decrement */}
          <button
            type="button"
            aria-label="Decrease"
            tabIndex={-1}
            onClick={decrement}
            disabled={!canDecrement}
            className={cn(
              "flex shrink-0 items-center justify-center text-muted-foreground transition-colors",
              "hover:text-foreground focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-40",
              stepBtnSizeClass[size]
            )}
          >
            <Minus className={stepIconSizeClass[size]} aria-hidden="true" />
          </button>

          {/* Input */}
          <input
            ref={ref}
            id={id}
            type="number"
            value={value ?? ""}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-center focus-visible:outline-none",
              "placeholder:text-muted-foreground",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              numberInputSizeClass[size],
              className
            )}
            {...props}
          />

          {/* Increment */}
          <button
            type="button"
            aria-label="Increase"
            tabIndex={-1}
            onClick={increment}
            disabled={!canIncrement}
            className={cn(
              "flex shrink-0 items-center justify-center text-muted-foreground transition-colors",
              "hover:text-foreground focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-40",
              stepBtnSizeClass[size]
            )}
          >
            <Plus className={stepIconSizeClass[size]} aria-hidden="true" />
          </button>
        </div>

        {helpText && !hasError && (
          <p id={helpTextId} className={cn("mt-1 text-muted-foreground", helperSizeClass[size])}>
            {helpText}
          </p>
        )}
        {typeof error === "string" && (
          <p
            id={errorId}
            role="alert"
            className={cn("mt-1 text-destructive", helperSizeClass[size])}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
