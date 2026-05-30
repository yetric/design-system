import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThinkingIndicator } from "./ThinkingIndicator";

const meta = {
  component: ThinkingIndicator,
  title: "Components/AI/ThinkingIndicator",
  tags: ["autodocs"],
  args: {
    label: "Thinking",
    variant: "dots",
    size: "md",
  },
  argTypes: {
    variant: { control: "select", options: ["dots", "pulse", "spinner"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
  },
} satisfies Meta<typeof ThinkingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ThinkingIndicator variant="dots" label="Thinking" />
      <ThinkingIndicator variant="pulse" label="Thinking" />
      <ThinkingIndicator variant="spinner" label="Thinking" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ThinkingIndicator size="sm" label="Small" />
      <ThinkingIndicator size="md" label="Medium" />
      <ThinkingIndicator size="lg" label="Large" />
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: "Generating response…",
    variant: "spinner",
  },
};

export const AllCombinations: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {(["dots", "pulse", "spinner"] as const).map((variant) =>
        (["sm", "md", "lg"] as const).map((size) => (
          <ThinkingIndicator key={`${variant}-${size}`} variant={variant} size={size} label={variant} />
        ))
      )}
    </div>
  ),
};
