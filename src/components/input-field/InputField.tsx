"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";
import { Label } from "../label/Label";
import { Input } from "../input/Input";
import type { Radius as RadiusType } from "../../lib/radius";

const fieldBase =
  "flex w-full border border-input bg-background " +
  "placeholder:text-muted-foreground transition-colors duration-base " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50";

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

type BaseProps = {
  label?: string;
  helpText?: string;
  error?: string | boolean;
  required?: boolean;
  wrapperClassName?: string;
  radius?: Radius;
  size?: Size;
};

type InputFieldInputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "error" | "size"> & {
    multiline?: false;
    /** Icon rendered inside the left edge */
    leftIcon?: React.ReactNode;
    /** Icon rendered inside the right edge */
    rightIcon?: React.ReactNode;
  };

type InputFieldTextareaProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "error" | "size"> & {
    multiline: true;
  };

export type InputFieldProps = InputFieldInputProps | InputFieldTextareaProps;

const InputField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      helpText,
      error,
      required,
      radius = "md",
      size = "md",
      id: idProp,
      className,
      wrapperClassName,
      multiline,
      ...rest
    } = props;

    // pull leftIcon/rightIcon out for input branch only
    const leftIcon = !multiline ? (rest as InputFieldInputProps).leftIcon : undefined;
    const rightIcon = !multiline ? (rest as InputFieldInputProps).rightIcon : undefined;
    if (!multiline) {
      delete (rest as InputFieldInputProps).leftIcon;
      delete (rest as InputFieldInputProps).rightIcon;
    }

    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = typeof error === "string" ? `${id}-error` : undefined;
    const hasError = Boolean(error);

    const describedBy = [helpTextId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} required={required} className={cn("mb-1.5", labelSizeClass[size])}>
            {label}
          </Label>
        )}
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              fieldBase,
              "min-h-[100px] resize-y",
              textareaSizeClass[size],
              radiusClass[radius],
              hasError && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            size={size as Size}
            radius={radius as RadiusType}
            error={hasError}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            aria-describedby={describedBy}
            className={className}
            {...(rest as Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">)}
          />
        )}
        {helpText && !hasError && (
          <div
            id={helpTextId}
            className={cn(
              "text-muted-foreground mt-1 flex items-center gap-1",
              helperSizeClass[size]
            )}
          >
            {helpText}
          </div>
        )}
        {typeof error === "string" && (
          <div
            id={errorId}
            role="alert"
            className={cn("text-destructive mt-1 flex items-center gap-1", helperSizeClass[size])}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
