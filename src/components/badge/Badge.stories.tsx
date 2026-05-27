import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
  component: Badge,
  args: {
    children: "Badge"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">Payments</span>
        <Badge variant="default">New</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">API access</span>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Legacy export</span>
        <Badge variant="outline">Deprecated</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Billing</span>
        <Badge variant="destructive">Overdue</Badge>
      </div>
    </div>
  )
};
