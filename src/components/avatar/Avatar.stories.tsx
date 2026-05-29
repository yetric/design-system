import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    fallback: "AB",
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
    status: { control: "select", options: ["online", "away", "busy", "offline", undefined] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Alice",
    fallback: "A",
  },
};

export const Fallback: Story = {
  args: {
    alt: "John Doe",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="XS" size="xs" />
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
      <Avatar fallback="XL" size="xl" />
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="lg" />
    </div>
  ),
};

export const StatusIndicators: Story = {
  name: "Status indicators",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <Avatar fallback="ON" status="online" />
        <span className="text-xs text-muted-foreground">online</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar fallback="AW" status="away" />
        <span className="text-xs text-muted-foreground">away</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar fallback="BU" status="busy" />
        <span className="text-xs text-muted-foreground">busy</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Avatar fallback="OF" status="offline" />
        <span className="text-xs text-muted-foreground">offline</span>
      </div>
    </div>
  ),
};

export const StatusWithImages: Story = {
  name: "Status with images",
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="Alice" size="lg" status="online" />
      <Avatar src="https://i.pravatar.cc/150?img=6" alt="Bob" size="lg" status="away" />
      <Avatar src="https://i.pravatar.cc/150?img=7" alt="Carol" size="lg" status="busy" />
      <Avatar src="https://i.pravatar.cc/150?img=8" alt="Dave" size="lg" status="offline" />
    </div>
  ),
};

export const RadiusVariants: Story = {
  name: "Radius variants",
  render: () => (
    <div className="flex items-center gap-4">
      {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
        <div key={r} className="flex flex-col items-center gap-1">
          <Avatar fallback="AB" radius={r} />
          <span className="text-xs text-muted-foreground">{r}</span>
        </div>
      ))}
    </div>
  ),
};
