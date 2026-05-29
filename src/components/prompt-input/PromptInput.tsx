"use client";

import * as React from "react";
import { ArrowUp, Loader2 } from "lucide-react";

import { cn } from "../../lib/cn";

export interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxRows?: number;
  className?: string;
  actions?: React.ReactNode;
}

const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder,
      disabled = false,
      loading = false,
      maxRows = 8,
      className,
      actions,
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(value ?? "");
    const currentValue = isControlled ? value : uncontrolledValue;
    const isDisabled = disabled || loading;
    const canSubmit = currentValue.trim().length > 0 && !isDisabled;

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const resizeTextarea = React.useCallback(() => {
      const textarea = textareaRef.current;

      if (!textarea) {
        return;
      }

      textarea.rows = 1;
      textarea.style.height = "auto";

      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 24;
      const maxHeight = lineHeight * maxRows;
      const nextHeight = Math.min(textarea.scrollHeight, maxHeight);

      textarea.style.height = `${Math.max(nextHeight, lineHeight)}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [maxRows]);

    React.useEffect(() => {
      resizeTextarea();
    }, [currentValue, resizeTextarea]);

    React.useEffect(() => {
      if (!isControlled) {
        return;
      }

      setUncontrolledValue(value ?? "");
    }, [isControlled, value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    };

    const handleSubmit = React.useCallback(() => {
      if (!canSubmit) {
        return;
      }

      onSubmit?.(currentValue);
    }, [canSubmit, currentValue, onSubmit]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };

    return (
      <div
        className={cn(
          "flex w-full items-end gap-2 rounded-xl border border-input bg-background p-3",
          "transition-colors duration-base focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
          isDisabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <textarea
          ref={setRefs}
          value={currentValue}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-h-6 flex-1 resize-none bg-transparent text-sm text-foreground outline-none",
            "placeholder:text-muted-foreground"
          )}
        />
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label={loading ? "Loading" : "Send prompt"}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowUp className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    );
  }
);

PromptInput.displayName = "PromptInput";

export { PromptInput };
