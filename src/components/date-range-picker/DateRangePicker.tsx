"use client";

import * as React from "react";
import { format as formatDate } from "date-fns";
import { CalendarDays } from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DateRange as DayPickerDateRange,
  type Matcher,
} from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "../../lib/cn";
import { Button } from "../button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

const defaultClassNames = getDefaultClassNames();
const calendarClassNames = {
  ...defaultClassNames,
  root: cn(defaultClassNames.root, "rounded-md bg-card p-3 text-card-foreground"),
  month_caption: cn(defaultClassNames.month_caption, "mb-4 text-sm font-medium"),
  weekdays: cn(defaultClassNames.weekdays, "text-muted-foreground"),
  weekday: cn(defaultClassNames.weekday, "text-xs font-medium"),
  button_previous: cn(
    defaultClassNames.button_previous,
    "rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  ),
  button_next: cn(
    defaultClassNames.button_next,
    "rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  ),
  day_button: cn(
    defaultClassNames.day_button,
    "rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  ),
};

const calendarStyles = {
  "--rdp-accent-color": "hsl(var(--primary))",
  "--rdp-accent-background-color": "hsl(var(--accent))",
  "--rdp-range_middle-background-color": "hsl(var(--accent))",
  "--rdp-range_middle-color": "hsl(var(--accent-foreground))",
  "--rdp-range_start-color": "hsl(var(--primary-foreground))",
  "--rdp-range_end-color": "hsl(var(--primary-foreground))",
  "--rdp-range_start-date-background-color": "hsl(var(--primary))",
  "--rdp-range_end-date-background-color": "hsl(var(--primary))",
  "--rdp-today-color": "hsl(var(--primary))",
  "--rdp-day_button-border-radius": "var(--radius)",
  "--rdp-day_button-border": "1px solid transparent",
} as React.CSSProperties;

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

function formatRangeValue(value: DateRange | undefined, displayFormat: string) {
  if (value?.from && value.to) {
    return `${formatDate(value.from, displayFormat)} – ${formatDate(value.to, displayFormat)}`;
  }

  if (value?.from) {
    return `${formatDate(value.from, displayFormat)} –`;
  }

  return undefined;
}

export function DateRangePicker(props: DateRangePickerProps) {
  const {
    value,
    onChange,
    placeholder = "Pick a date range",
    format = "PP",
    disabled = false,
    minDate,
    maxDate,
    className,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(value);
  const isControlled = Object.prototype.hasOwnProperty.call(props, "value");

  const selectedValue = isControlled ? value : internalValue;

  const disabledDays = React.useMemo<Matcher[] | undefined>(() => {
    const matchers: Matcher[] = [];

    if (minDate) {
      matchers.push({ before: minDate });
    }

    if (maxDate) {
      matchers.push({ after: maxDate });
    }

    return matchers.length > 0 ? matchers : undefined;
  }, [maxDate, minDate]);

  const handleSelect = React.useCallback(
    (selectedRange: DayPickerDateRange | undefined) => {
      if (!selectedRange) {
        if (!isControlled) {
          setInternalValue(undefined);
        }
        onChange?.(undefined);
        return;
      }

      const nextValue = { from: selectedRange.from, to: selectedRange.to };

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);

      if (
        selectedRange.from &&
        selectedRange.to &&
        selectedRange.from.getTime() !== selectedRange.to.getTime()
      ) {
        setOpen(false);
      }
    },
    [isControlled, onChange]
  );

  const displayValue = formatRangeValue(selectedValue, format);
  const selectedRange = selectedValue?.from
    ? { from: selectedValue.from, to: selectedValue.to }
    : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "justify-start bg-background text-left font-normal",
            !displayValue && "text-muted-foreground",
            className
          )}
          leftIcon={<CalendarDays className="h-4 w-4" />}
        >
          {displayValue ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <DayPicker
          autoFocus
          mode="range"
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={disabledDays}
          startMonth={minDate}
          endMonth={maxDate}
          defaultMonth={selectedValue?.from ?? minDate ?? maxDate}
          classNames={calendarClassNames}
          style={calendarStyles}
        />
      </PopoverContent>
    </Popover>
  );
}
