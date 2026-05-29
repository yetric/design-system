import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    thickness: { control: "select", options: ["thin", "medium", "thick"] },
    color: { control: "select", options: ["border", "muted", "accent"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Above the line</p>
      <Separator className="my-4" />
      <p className="text-sm">Below the line</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};

export const Thickness: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      {(["thin", "medium", "thick"] as const).map((t) => (
        <div key={t}>
          <p className="mb-1 text-xs text-muted-foreground">{t}</p>
          <Separator thickness={t} />
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      {(["border", "muted", "accent"] as const).map((c) => (
        <div key={c}>
          <p className="mb-1 text-xs text-muted-foreground">{c}</p>
          <Separator color={c} thickness="medium" />
        </div>
      ))}
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-48 rounded-md border border-border p-1 text-sm">
      <div className="cursor-default rounded-sm px-2 py-1.5 hover:bg-accent">Profile</div>
      <div className="cursor-default rounded-sm px-2 py-1.5 hover:bg-accent">Settings</div>
      <Separator className="my-1" />
      <div className="cursor-default rounded-sm px-2 py-1.5 text-destructive hover:bg-accent">
        Sign out
      </div>
    </div>
  ),
};
