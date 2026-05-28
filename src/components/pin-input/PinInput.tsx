"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

const boxSizeClass: Record<Size, string> = {
  xs: "h-7 w-7 text-sm",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-14 w-14 text-xl",
};

export interface PinInputProps {
  /** Number of PIN digits. */
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Mask input like a password field. */
  mask?: boolean;
  size?: Size;
  radius?: Radius;
  /** Show error state. */
  error?: boolean;
  disabled?: boolean;
  /** Called when all digits are filled. */
  onComplete?: (value: string) => void;
  "aria-label"?: string;
}

function PinInput({
  length = 4,
  value = "",
  onChange,
  mask = false,
  size = "md",
  radius = "md",
  error = false,
  disabled = false,
  onComplete,
  "aria-label": ariaLabel = "PIN input",
}: PinInputProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? digit : d)).join("");
    onChange?.(next);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.replace(/\s/g, "").length === length && digit) {
      onComplete?.(next);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange?.(pasted.padEnd(length, "").slice(0, length).trimEnd());
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el; }}
          type={mask ? "password" : "text"}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "border bg-background text-foreground text-center font-mono tabular-nums outline-none",
            "transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2",
            boxSizeClass[size],
            radiusClass[radius],
            error ? "border-destructive" : "border-input",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}

export { PinInput };
