"use client";

import * as React from "react";
import { X, ChevronDown, Search } from "lucide-react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const triggerSizeClass: Record<Size, string> = {
  xs: "min-h-[1.75rem] px-2 py-0.5 text-xs gap-1",
  sm: "min-h-[2rem]    px-3 py-1   text-sm gap-1",
  md: "min-h-[2.5rem]  px-3 py-1.5 text-sm gap-1.5",
  lg: "min-h-[3rem]    px-4 py-2   text-base gap-1.5",
  xl: "min-h-[3.5rem]  px-5 py-2.5 text-base gap-2",
};

const tagSizeClass: Record<Size, string> = {
  xs: "text-[10px] h-4 px-1 gap-0.5",
  sm: "text-xs     h-5 px-1.5 gap-1",
  md: "text-xs     h-5 px-1.5 gap-1",
  lg: "text-sm     h-6 px-2 gap-1",
  xl: "text-sm     h-7 px-2.5 gap-1",
};

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  size?: Size;
  radius?: Radius;
  disabled?: boolean;
  maxValues?: number;
  /** Label shown above the control */
  label?: string;
  /** Helper text below the control */
  helpText?: string;
  /** Error message */
  error?: string | boolean;
  className?: string;
  id?: string;
}

function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  searchable = true,
  clearable = true,
  size = "md",
  radius = "md",
  disabled = false,
  maxValues,
  label,
  helpText,
  error,
  className,
  id: idProp,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(error);

  const filteredOptions =
    searchable && search
      ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
      : options;

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange?.(value.filter((v) => v !== optValue));
    } else {
      if (maxValues !== undefined && value.length >= maxValues) return;
      onChange?.([...value, optValue]);
    }
  };

  const removeValue = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optValue));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setSearch("");
  }, [open]);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedLabels = options.filter((o) => value.includes(o.value));

  return (
    <div className={cn("flex flex-col", className)} ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-foreground mb-1.5 text-sm font-medium">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
          if (e.key === "Escape") setOpen(false);
        }}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "bg-background relative flex w-full cursor-pointer flex-wrap items-center border transition-colors",
          "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          triggerSizeClass[size],
          radiusClass[radius],
          hasError ? "border-destructive focus-visible:ring-destructive" : "border-input",
          disabled && "cursor-not-allowed opacity-50",
          open && "ring-ring ring-offset-background ring-2 ring-offset-2"
        )}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1">
          {selectedLabels.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selectedLabels.map((opt) => (
              <span
                key={opt.value}
                className={cn(
                  "border-border bg-muted inline-flex items-center rounded-full border font-medium",
                  tagSizeClass[size]
                )}
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => removeValue(opt.value, e)}
                  aria-label={`Remove ${opt.label}`}
                  className="ml-0.5 rounded-full opacity-60 hover:opacity-100 focus-visible:outline-none"
                >
                  <X className="h-2.5 w-2.5" aria-hidden="true" />
                </button>
              </span>
            ))
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 pl-2">
          {clearable && value.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              aria-label="Clear all"
              className="rounded opacity-60 hover:opacity-100 focus-visible:outline-none"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "text-muted-foreground h-4 w-4 transition-transform",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className={cn(
            "bg-popover z-dropdown border-border absolute mt-1 w-full overflow-hidden border shadow-md",
            radiusClass[radius]
          )}
          style={{
            minWidth: containerRef.current?.offsetWidth /* eslint-disable-line react-hooks/refs */,
          }}
        >
          {searchable && (
            <div className="border-border flex items-center gap-2 border-b px-3 py-2">
              <Search className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                autoFocus
                className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          )}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <li className="text-muted-foreground px-3 py-2 text-sm">No results</li>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = value.includes(opt.value);
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => !opt.disabled && toggleOption(opt.value)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm transition-colors",
                      isSelected ? "bg-primary/10 text-foreground font-medium" : "hover:bg-muted",
                      opt.disabled && "pointer-events-none opacity-40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      )}
                    >
                      {isSelected && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 4l2.5 2.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {opt.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {typeof error === "string" && (
        <p role="alert" className="text-destructive mt-1 text-xs">
          {error}
        </p>
      )}
      {!error && helpText && <p className="text-muted-foreground mt-1 text-xs">{helpText}</p>}
    </div>
  );
}

export { MultiSelect };
