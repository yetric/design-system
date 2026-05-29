"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/cn";

export interface AIModel {
  id: string;
  name: string;
  description?: string;
  provider?: string;
  badge?: string;
}

export interface ModelSelectorProps {
  models: AIModel[];
  value?: string;
  onChange?: (modelId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const formatModelOption = ({ name, badge, description }: AIModel) => {
  const badgeLabel = badge ? ` · ${badge}` : "";
  const descriptionLabel = description ? ` — ${description}` : "";

  return `${name}${badgeLabel}${descriptionLabel}`;
};

const groupModels = (models: AIModel[]) => {
  const ungrouped: AIModel[] = [];
  const groups = new Map<string, AIModel[]>();

  models.forEach((model) => {
    if (!model.provider) {
      ungrouped.push(model);
      return;
    }

    const providerModels = groups.get(model.provider) ?? [];
    providerModels.push(model);
    groups.set(model.provider, providerModels);
  });

  return { ungrouped, groups: Array.from(groups.entries()) };
};

const ModelSelector = ({
  models,
  value,
  onChange,
  placeholder = "Select a model",
  disabled = false,
  className,
}: ModelSelectorProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState("");
  const selectValue = isControlled ? value : internalValue;

  const groupedModels = React.useMemo(() => groupModels(models), [models]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isControlled) setInternalValue(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <select
        value={selectValue}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm",
          "text-foreground ring-offset-background transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {groupedModels.ungrouped.map((model) => (
          <option key={model.id} value={model.id}>
            {formatModelOption(model)}
          </option>
        ))}
        {groupedModels.groups.map(([provider, providerModels]) => (
          <optgroup key={provider} label={provider}>
            {providerModels.map((model) => (
              <option key={model.id} value={model.id}>
                {formatModelOption(model)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  );
};

ModelSelector.displayName = "ModelSelector";

export { ModelSelector };
