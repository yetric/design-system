import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator
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
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  )
};

export const InMenu: Story = {
  render: () => (
    <div className="w-48 rounded-md border border-border p-1 text-sm">
      <div className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-default">Profile</div>
      <div className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-default">Settings</div>
      <Separator className="my-1" />
      <div className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-default text-destructive">Sign out</div>
    </div>
  )
};
