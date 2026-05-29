"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { Input } from "../input/Input";
import { Loader } from "../loader/Loader";

export interface AddressSuggestion {
  id: string;
  label: string;
  value: string;
  data?: unknown;
}

export interface AddressInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSuggestionSelect?: (suggestion: AddressSuggestion) => void;
  onSearch: (query: string) => Promise<AddressSuggestion[]>;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  minChars?: number;
}

const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>(
  (
    {
      className,
      debounceMs = 300,
      disabled = false,
      id: idProp,
      minChars = 3,
      onChange,
      onSearch,
      onSuggestionSelect,
      placeholder,
      value,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = idProp ?? generatedId;
    const listboxId = `${inputId}-suggestions`;
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const blurTimeoutRef = React.useRef<number | undefined>(undefined);
    const requestIdRef = React.useRef(0);

    const [inputValue, setInputValue] = React.useState(value ?? "");
    const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([]);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      setInputValue(value ?? "");
    }, [value]);

    React.useEffect(() => {
      return () => {
        window.clearTimeout(blurTimeoutRef.current);
      };
    }, []);

    React.useEffect(() => {
      const query = inputValue.trim();

      if (disabled || query.length < minChars) {
        requestIdRef.current += 1;
        setIsLoading(false);
        setIsOpen(false);
        setSuggestions([]);
        setHighlightedIndex(-1);
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      const timeoutId = window.setTimeout(async () => {
        setIsLoading(true);
        setIsOpen(true);

        try {
          const results = await onSearch(query);

          if (requestIdRef.current !== requestId) {
            return;
          }

          setSuggestions(results);
          setHighlightedIndex(results.length > 0 ? 0 : -1);
          setIsOpen(true);
        } catch {
          if (requestIdRef.current !== requestId) {
            return;
          }

          setSuggestions([]);
          setHighlightedIndex(-1);
          setIsOpen(true);
        } finally {
          if (requestIdRef.current === requestId) {
            setIsLoading(false);
          }
        }
      }, debounceMs);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [debounceMs, disabled, inputValue, minChars, onSearch]);

    const selectSuggestion = React.useCallback(
      (suggestion: AddressSuggestion) => {
        window.clearTimeout(blurTimeoutRef.current);
        setInputValue(suggestion.value);
        setSuggestions([]);
        setHighlightedIndex(-1);
        setIsOpen(false);
        onChange?.(suggestion.value);
        onSuggestionSelect?.(suggestion);
        inputRef.current?.focus();
      },
      [onChange, onSuggestionSelect]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setInputValue(nextValue);
      setHighlightedIndex(-1);
      onChange?.(nextValue);
    };

    const handleInputFocus = () => {
      window.clearTimeout(blurTimeoutRef.current);

      if (
        !disabled &&
        inputValue.trim().length >= minChars &&
        (isLoading || suggestions.length > 0)
      ) {
        setIsOpen(true);
      }
    };

    const handleInputBlur = () => {
      blurTimeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 100);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(-1);
        return;
      }

      if (!isOpen || suggestions.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((currentIndex) =>
          currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((currentIndex) =>
          currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1
        );
        return;
      }

      if (event.key === "Enter" && highlightedIndex >= 0) {
        event.preventDefault();
        selectSuggestion(suggestions[highlightedIndex]);
      }
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Input
          ref={setRefs}
          id={inputId}
          type="text"
          role="combobox"
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls={isOpen ? listboxId : undefined}
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `${listboxId}-option-${suggestions[highlightedIndex]?.id}`
              : undefined
          }
        />

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            className={cn(
              "border-border bg-card text-card-foreground absolute top-full z-[var(--z-dropdown)] mt-2 w-full overflow-hidden rounded-md border shadow-md"
            )}
          >
            {isLoading ? (
              <div className="text-muted-foreground flex items-center gap-2 px-3 py-3 text-sm">
                <Loader size="sm" label="Searching addresses" />
                <span>Searching...</span>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="text-muted-foreground px-3 py-3 text-sm">No results found</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto py-1">
                {suggestions.map((suggestion, index) => (
                  <li key={suggestion.id}>
                    <button
                      id={`${listboxId}-option-${suggestion.id}`}
                      type="button"
                      role="option"
                      aria-selected={index === highlightedIndex}
                      className={cn(
                        "flex w-full items-start px-3 py-2 text-left text-sm transition-colors",
                        index === highlightedIndex
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"
                      )}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
);
AddressInput.displayName = "AddressInput";

export { AddressInput };
