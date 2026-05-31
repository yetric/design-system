"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface SuggestionChip {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SuggestionChipsProps {
  chips: SuggestionChip[];
  onSelect?: (chip: SuggestionChip) => void;
  disabled?: boolean;
  className?: string;
  maxVisible?: number;
}

const SuggestionChips = ({
  chips,
  onSelect,
  disabled = false,
  className,
  maxVisible,
}: SuggestionChipsProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const shouldCollapse =
    typeof maxVisible === "number" && maxVisible >= 0 && chips.length > maxVisible;
  const visibleChips = shouldCollapse && !isExpanded ? chips.slice(0, maxVisible) : chips;
  const hiddenCount = shouldCollapse ? chips.length - maxVisible : 0;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="flex min-w-max items-center gap-2">
        {visibleChips.map((chip) => {
          const Icon = chip.icon;

          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelect?.(chip)}
              disabled={disabled}
              className={cn(
                "border-border bg-muted/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
                "text-muted-foreground text-sm transition-colors",
                "hover:bg-muted hover:text-foreground",
                "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
              <span>{chip.label}</span>
            </button>
          );
        })}
        {shouldCollapse && (
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            disabled={disabled}
            className={cn(
              "border-border inline-flex items-center rounded-full border border-dashed px-3 py-1.5",
              "text-muted-foreground text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {isExpanded ? "Show less" : `+${hiddenCount} more`}
          </button>
        )}
      </div>
    </div>
  );
};

SuggestionChips.displayName = "SuggestionChips";

export { SuggestionChips };
