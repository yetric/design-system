"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

const chipVariants = cva(
  "inline-flex cursor-pointer select-none items-center gap-1.5 border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        xs: "h-5 px-2 text-[11px] rounded-full",
        sm: "h-6 px-2.5 text-xs rounded-full",
        md: "h-7 px-3 text-xs rounded-full",
        lg: "h-8 px-4 text-sm rounded-full",
        xl: "h-9 px-5 text-sm rounded-full",
      },
      checked: {
        true: "border-primary bg-primary text-primary-foreground",
        false: "border-border bg-background text-foreground hover:bg-muted",
      },
    },
    defaultVariants: { size: "md", checked: false },
  }
);

export interface ChipProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    Omit<VariantProps<typeof chipVariants>, "checked"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Icon rendered at the leading edge */
  icon?: React.ReactNode;
  /** Show checkmark when checked */
  showCheck?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      size,
      checked = false,
      onChange,
      onClick,
      icon,
      showCheck = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          chipVariants({ size, checked }),
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {checked && showCheck && <Check className="h-3 w-3 shrink-0" aria-hidden="true" />}
        {!checked && icon && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
