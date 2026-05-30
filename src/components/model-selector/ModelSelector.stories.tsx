import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { ModelSelector } from "./ModelSelector";
import type { AIModel } from "./ModelSelector";

const flatModels: AIModel[] = [
  { id: "gpt-4o", name: "GPT-4o", badge: "Latest", description: "Most capable" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", description: "Fast & affordable" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
];

const groupedModels: AIModel[] = [
  { id: "claude-opus-4", name: "Claude Opus 4", badge: "Powerful", provider: "Anthropic" },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", badge: "Balanced", provider: "Anthropic" },
  { id: "claude-haiku-4", name: "Claude Haiku 4", badge: "Fast", provider: "Anthropic" },
  { id: "gpt-4o", name: "GPT-4o", badge: "Latest", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", description: "Fast & affordable", provider: "OpenAI" },
  { id: "gemini-pro", name: "Gemini 1.5 Pro", provider: "Google" },
  { id: "gemini-flash", name: "Gemini 1.5 Flash", badge: "Fast", provider: "Google" },
];

const meta = {
  component: ModelSelector,
  title: "Components/AI/ModelSelector",
  tags: ["autodocs"],
  args: {
    models: flatModels,
    placeholder: "Select a model",
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof ModelSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithGroups: Story = {
  args: {
    models: groupedModels,
    placeholder: "Select a model",
  },
};

export const Preselected: Story = {
  args: {
    models: flatModels,
    value: "gpt-4o",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "gpt-4o",
  },
};

export const Controlled: Story = {
  render: () => {
    const [model, setModel] = useState("claude-sonnet-4");
    const selected = groupedModels.find((m) => m.id === model);
    return (
      <div className="space-y-3">
        <ModelSelector models={groupedModels} value={model} onChange={setModel} />
        {selected && (
          <p className="text-muted-foreground text-sm">
            Selected:{" "}
            <span className="text-foreground font-medium">
              {selected.name}
              {selected.provider && ` (${selected.provider})`}
            </span>
          </p>
        )}
      </div>
    );
  },
};
