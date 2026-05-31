import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Code, Globe, Lightbulb, MessageSquare, Pencil, Zap } from "lucide-react";

import { SuggestionChips } from "./SuggestionChips";

const defaultChips = [
  { id: "1", label: "Summarise this" },
  { id: "2", label: "Explain in simple terms" },
  { id: "3", label: "Write a follow-up" },
  { id: "4", label: "Translate to Spanish" },
  { id: "5", label: "Find key points" },
];

const meta = {
  component: SuggestionChips,
  title: "Components/AI/SuggestionChips",
  tags: ["autodocs"],
  args: {
    chips: defaultChips,
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    maxVisible: { control: { type: "number", min: 1 } },
  },
} satisfies Meta<typeof SuggestionChips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    chips: [
      { id: "1", label: "Write code", icon: Code },
      { id: "2", label: "Brainstorm ideas", icon: Lightbulb },
      { id: "3", label: "Draft a message", icon: MessageSquare },
      { id: "4", label: "Edit this", icon: Pencil },
      { id: "5", label: "Search the web", icon: Globe },
      { id: "6", label: "Speed things up", icon: Zap },
    ],
  },
};

export const Collapsible: Story = {
  args: {
    chips: defaultChips,
    maxVisible: 3,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="space-y-3">
        <SuggestionChips chips={defaultChips} onSelect={(chip) => setSelected(chip.label)} />
        {selected && (
          <p className="text-muted-foreground text-sm">
            Selected: <span className="text-foreground font-medium">{selected}</span>
          </p>
        )}
      </div>
    );
  },
};
