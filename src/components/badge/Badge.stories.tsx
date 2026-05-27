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
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">XLarge</Badge>
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge radius="none">None</Badge>
      <Badge radius="xs">XSmall</Badge>
      <Badge radius="sm">Small</Badge>
      <Badge radius="md">Medium</Badge>
      <Badge radius="lg">Large</Badge>
      <Badge radius="xl">XLarge</Badge>
      <Badge radius="full">Full</Badge>
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
        <span className="text-sm">Deploy status</span>
        <Badge variant="success">Live</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Storage</span>
        <Badge variant="warning">Near limit</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Billing</span>
        <Badge variant="destructive">Overdue</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Maintenance</span>
        <Badge variant="info">Scheduled</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Legacy export</span>
        <Badge variant="outline">Deprecated</Badge>
      </div>
    </div>
  )
};
