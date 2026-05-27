import * as React from "react";
import { useId } from "react";

import { cn } from "../../lib/cn";
import { Input, type InputProps } from "../input/Input";
import { Label } from "../label/Label";

export interface InputFieldProps extends Omit<InputProps, "error"> {
  label?: string;
  helpText?: string;
  error?: string | boolean;
  required?: boolean;
  wrapperClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, helpText, error, required, id: idProp, className, wrapperClassName, ...props },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = typeof error === "string" ? `${id}-error` : undefined;
    const hasError = Boolean(error);

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={id}
          error={hasError}
          className={className}
          aria-describedby={
            [helpTextId, errorId].filter(Boolean).join(" ") || undefined
          }
          {...props}
        />
        {helpText && !hasError && (
          <p id={helpTextId} className="text-xs text-muted-foreground">
            {helpText}
          </p>
        )}
        {typeof error === "string" && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
