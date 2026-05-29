"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import ReactPhoneInput, { getCountryCallingCode, type Country } from "react-phone-number-input";

import { cn } from "../../lib/cn";
import { Input } from "../input/Input";

type CountryOption = {
  value?: string;
  label: string;
  divider?: boolean;
};

interface CountrySelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> {
  value?: Country;
  options: CountryOption[];
  onChange?: (value?: Country) => void;
  iconComponent?: unknown;
  unicodeFlags?: boolean;
  arrowComponent?: unknown;
  getIconAspectRatio?: unknown;
}

const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
  (
    {
      className,
      disabled,
      options,
      onChange,
      value,
      iconComponent: _iconComponent,
      unicodeFlags: _unicodeFlags,
      arrowComponent: _arrowComponent,
      getIconAspectRatio: _getIconAspectRatio,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextValue = event.target.value;
      onChange?.(nextValue === "ZZ" ? undefined : (nextValue as Country));
    };

    return (
      <div className={cn("relative shrink-0", className)}>
        <select
          ref={ref}
          value={value ?? "ZZ"}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "border-input bg-background flex h-10 w-full appearance-none items-center rounded-md border px-3 pr-9 text-sm",
            "duration-base transition-colors",
            "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        >
          {options.map((option) => {
            if (option.divider) {
              return (
                <option key={`divider-${option.label}`} disabled value="|">
                  ──────────
                </option>
              );
            }

            const countryCode = option.value as Country | undefined;
            const callingCode = countryCode ? ` (+${getCountryCallingCode(countryCode)})` : "";

            return (
              <option key={option.value ?? "ZZ"} value={option.value ?? "ZZ"}>
                {`${option.label}${callingCode}`}
              </option>
            );
          })}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
        />
      </div>
    );
  }
);
CountrySelect.displayName = "PhoneInputCountrySelect";

const PhoneNumberField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, size: _size, type = "tel", ...props }, ref) => (
  <Input ref={ref} type={type} className={cn("min-w-0 flex-1", className)} {...props} />
));
PhoneNumberField.displayName = "PhoneNumberField";

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  defaultCountry?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, defaultCountry, disabled, id, name, onChange, placeholder, value }, ref) => (
    <ReactPhoneInput
      className={cn("flex w-full items-center gap-2", className)}
      value={value}
      onChange={(nextValue) => onChange?.(nextValue)}
      defaultCountry={defaultCountry as Country | undefined}
      disabled={disabled}
      smartCaret={false}
      countrySelectComponent={CountrySelect}
      countrySelectProps={{
        "aria-label": "Country",
        className: "w-36",
      }}
      inputComponent={PhoneNumberField}
      numberInputProps={{
        ref,
        id,
        name,
        placeholder,
        "aria-label": "Phone number",
      }}
    />
  )
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
