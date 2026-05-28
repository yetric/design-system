import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./Textarea";

const meta = {
  component: Textarea,
  args: {
    placeholder: "Type something…",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Message", placeholder: "Enter your message" },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    helpText: "Tell us a little about yourself. Max 500 characters.",
    placeholder: "I'm a designer who…",
  },
};

export const WithError: Story = {
  args: {
    label: "Comment",
    error: "Comment is required.",
    placeholder: "Leave a comment",
  },
};

export const Disabled: Story = {
  args: { label: "Notes", disabled: true, value: "Read-only content here." },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Textarea size="xs" placeholder="XSmall" />
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium (default)" />
      <Textarea size="lg" placeholder="Large" />
      <Textarea size="xl" placeholder="XLarge" />
    </div>
  ),
};

export const RadiusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Textarea radius="none" placeholder="No radius" />
      <Textarea radius="sm" placeholder="Small radius" />
      <Textarea radius="md" placeholder="Medium radius (default)" />
      <Textarea radius="lg" placeholder="Large radius" />
      <Textarea radius="xl" placeholder="XL radius" />
    </div>
  ),
};

export const AutoResize: Story = {
  args: {
    label: "Auto-resize textarea",
    autoResize: true,
    placeholder: "This textarea grows as you type…",
    helpText: "Content area expands automatically — no manual resize needed.",
  },
};
