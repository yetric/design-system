import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loader } from "./Loader";

const meta = {
  component: Loader,
  tags: ["autodocs"],
  title: "Components/Loader",
  args: {
    size: "md",
    variant: "default",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "destructive", "muted"],
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Loader size="xs" />
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Loader variant="default" />
      <Loader variant="primary" />
      <Loader variant="success" />
      <Loader variant="warning" />
      <Loader variant="destructive" />
      <Loader variant="muted" />
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-70"
      >
        <Loader size="sm" variant="default" />
        Saving…
      </button>
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium"
      >
        <Loader size="sm" variant="muted" />
        Loading
      </button>
    </div>
  ),
};
