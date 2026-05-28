"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

const inputSizeClass: Record<Size, string> = {
  xs: "text-xs px-2 py-0.5 min-h-6",
  sm: "text-sm px-2.5 py-1 min-h-8",
  md: "text-sm px-3 py-1.5 min-h-9",
  lg: "text-base px-3.5 py-2 min-h-10",
  xl: "text-base px-4 py-2.5 min-h-11",
};

const tagSizeClass: Record<Size, string> = {
  xs: "text-xs px-1.5 py-0 gap-1",
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-2.5 py-0.5 gap-1.5",
  lg: "text-sm px-3 py-1 gap-1.5",
  xl: "text-base px-3.5 py-1 gap-2",
};

export interface TagsInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "size"> {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  size?: Size;
  radius?: Radius;
  /** Maximum number of tags allowed. */
  max?: number;
}

function TagsInput({
  className,
  value = [],
  onChange,
  placeholder = "Add tag…",
  size = "md",
  radius = "md",
  max,
  disabled,
  ...props
}: TagsInputProps) {
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;
    if (max !== undefined && value.length >= max) return;
    onChange?.([...value, trimmed]);
  };

  const removeTag = (tag: string) => {
    onChange?.(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 border border-input bg-background cursor-text",
        inputSizeClass[size],
        radiusClass[radius],
        disabled && "opacity-50 cursor-not-allowed",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center rounded-full bg-secondary text-secondary-foreground font-medium",
            tagSizeClass[size]
          )}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (input) { addTag(input); setInput(""); } }}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled}
        className="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-muted-foreground text-foreground text-sm"
        aria-label={placeholder}
        {...props}
      />
    </div>
  );
}

export { TagsInput };
