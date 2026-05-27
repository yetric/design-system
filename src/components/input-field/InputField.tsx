import * as React from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { Label } from "../label/Label";

const fieldBase =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
  "placeholder:text-muted-foreground transition-colors duration-base " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-50";

type BaseProps = {
  label?: string;
  helpText?: string;
  error?: string | boolean;
  required?: boolean;
  wrapperClassName?: string;
};

type InputFieldInputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "error"> & {
    multiline?: false;
  };

type InputFieldTextareaProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "error"> & {
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
      id: idProp,
      className,
      wrapperClassName,
      multiline,
      ...rest
    } = props;

    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = typeof error === "string" ? `${id}-error` : undefined;
    const hasError = Boolean(error);

    const errorClass = hasError
      ? "border-destructive focus-visible:ring-destructive"
      : undefined;

    const describedBy =
      [helpTextId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} required={required} className="mb-1.5">
            {label}
          </Label>
        )}
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(fieldBase, "min-h-[100px] resize-y", errorClass, className)}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              fieldBase,
              "h-10 file:border-0 file:bg-transparent file:text-sm file:font-medium",
              errorClass,
              className
            )}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {helpText && !hasError && (
          <div id={helpTextId} className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            {helpText}
          </div>
        )}
        {typeof error === "string" && (
          <div id={errorId} role="alert" className="mt-1 flex items-center gap-1 text-xs text-destructive">
            {error}
          </div>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
