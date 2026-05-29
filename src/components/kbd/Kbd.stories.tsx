import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "./Kbd";

const meta = {
  component: Kbd,
  title: "Components/Kbd",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "⌘K" } };

export const Shortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 text-sm">
        Save <Kbd>⌘</Kbd>
        <Kbd>S</Kbd>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        Copy <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        Command palette <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        Find <Kbd>Ctrl</Kbd>
        <Kbd>F</Kbd>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd size="xs">⌘</Kbd>
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="md">⌘</Kbd>
      <Kbd size="lg">⌘</Kbd>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd variant="default">Default</Kbd>
      <Kbd variant="outline">Outline</Kbd>
      <Kbd variant="ghost">Ghost</Kbd>
    </div>
  ),
};
