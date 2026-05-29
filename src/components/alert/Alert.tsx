"use client";

import * as React from "react";
import { X, CheckCircle2, AlertTriangle, XCircle, Info, AlertCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { type Radius, radiusClass } from "../../lib/radius";

const alertVariants = cva("relative flex gap-3 border", {
  variants: {
    variant: {
      default: "bg-background border-border text-foreground",
      info: "bg-info/10 border-info/30 text-foreground",
      success: "bg-success/10 border-success/30 text-foreground",
      warning: "bg-warning/10 border-warning/30 text-foreground",
      destructive: "bg-destructive/10 border-destructive/30 text-foreground",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-5 py-4 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const iconColorClass: Record<NonNullable<VariantProps<typeof alertVariants>["variant"]>, string> = {
  default: "text-foreground",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

const defaultIcon: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  React.ReactNode
> = {
  default: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  destructive: <XCircle className="h-4 w-4" />,
};

export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, Omit<VariantProps<typeof alertVariants>, "size"> {
  /** Alert headline */
  title?: string;
  /** Override the default variant icon or pass false to hide it */
  icon?: React.ReactNode | false;
  /** Called when user clicks the dismiss button; omit to hide the button */
  onDismiss?: () => void;
  /**
   * @deprecated Use `onDismiss` instead.
   */
  onClose?: () => void;
  /** Accessible label for the close button */
  closeLabel?: string;
  radius?: Radius;
  size?: AlertSize;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      radius = "md",
      title,
      icon,
      onDismiss,
      onClose,
      closeLabel = "Dismiss",
      children,
      ...props
    },
    ref
  ) => {
    const handleDismiss = onDismiss ?? onClose;
    const resolvedIcon = icon === false ? null : (icon ?? defaultIcon[variant ?? "default"]);
    const iconColor = iconColorClass[variant ?? "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), radiusClass[radius], className)}
        {...props}
      >
        {resolvedIcon && (
          <span className={cn("mt-0.5 shrink-0", iconColor)} aria-hidden="true">
            {resolvedIcon}
          </span>
        )}

        <div className="min-w-0 flex-1">
          {title && <p className="mb-0.5 font-semibold leading-snug">{title}</p>}
          {children && <div className="leading-relaxed opacity-90">{children}</div>}
        </div>

        {handleDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label={closeLabel}
            className="ml-auto shrink-0 rounded opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
