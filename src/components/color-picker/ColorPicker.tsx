"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/Popover";

const SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#ffffff",
  "#000000",
];

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function isValidHex(val: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(val);
}

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  swatches?: string[];
  disabled?: boolean;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ value = "#3b82f6", onChange, swatches = SWATCHES, disabled = false, className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [hexInput, setHexInput] = React.useState(value);
    const [hsl, setHsl] = React.useState(() => hexToHsl(value));

    React.useEffect(() => {
      if (isValidHex(value)) {
        setHexInput(value);
        setHsl(hexToHsl(value));
      }
    }, [value]);

    const commit = (hex: string) => {
      if (isValidHex(hex)) {
        onChange?.(hex);
        setHsl(hexToHsl(hex));
        setHexInput(hex);
      }
    };

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setHexInput(val);
      if (isValidHex(val)) commit(val);
    };

    const handleHslChange = (channel: "h" | "s" | "l", raw: number) => {
      const next = { ...hsl, [channel]: raw };
      setHsl(next);
      const hex = hslToHex(next.h, next.s, next.l);
      setHexInput(hex);
      onChange?.(hex);
    };

    return (
      <div ref={ref} className={cn("inline-block", className)}>
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              aria-label={`Color picker, current color ${value}`}
              className="gap-2"
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  backgroundColor: isValidHex(value) ? value : "#3b82f6",
                  border: "1px solid hsl(var(--border))",
                  flexShrink: 0,
                }}
              />
              {value.toUpperCase()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4" align="start">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Preview */}
              <div
                style={{
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: isValidHex(hexInput) ? hexInput : value,
                  border: "1px solid hsl(var(--border))",
                }}
                aria-hidden="true"
              />

              {/* HSL sliders */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(
                  [
                    { label: "H", channel: "h", max: 360 },
                    { label: "S", channel: "s", max: 100 },
                    { label: "L", channel: "l", max: 100 },
                  ] as const
                ).map(({ label, channel, max }) => (
                  <div
                    key={channel}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <span
                      style={{
                        width: 12,
                        fontSize: "0.75rem",
                        color: "hsl(var(--muted-foreground))",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={max}
                      value={hsl[channel]}
                      onChange={(e) => handleHslChange(channel, Number(e.target.value))}
                      aria-label={`${label === "H" ? "Hue" : label === "S" ? "Saturation" : "Lightness"} ${hsl[channel]}`}
                      style={{ flex: 1, accentColor: "hsl(var(--primary))" }}
                    />
                    <span
                      style={{
                        width: 28,
                        textAlign: "right",
                        fontSize: "0.75rem",
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {hsl[channel]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hex input */}
              <Input
                value={hexInput}
                onChange={handleHexInput}
                aria-label="Hex color value"
                style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                error={!isValidHex(hexInput)}
              />

              {/* Swatches */}
              {swatches.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "0.375rem",
                  }}
                >
                  {swatches.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      aria-label={`Select color ${swatch}`}
                      onClick={() => commit(swatch)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        borderRadius: 4,
                        backgroundColor: swatch,
                        border:
                          swatch.toLowerCase() === value.toLowerCase()
                            ? "2px solid hsl(var(--primary))"
                            : "1px solid hsl(var(--border))",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
