import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    radius: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl", "full"] },
    preset: {
      control: "select",
      options: ["default", "text", "heading", "avatar", "button", "card", "badge"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const CardLoading: Story = {
  name: "Card (loading)",
  render: () => (
    <div className="flex w-64 flex-col gap-3 rounded-lg border p-4">
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

export const AvatarLoading: Story = {
  name: "Avatar (loading)",
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};

export const TableLoading: Story = {
  name: "Table (loading)",
  render: () => (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/5" />
          <Skeleton className="h-8 flex-1" />
        </div>
      ))}
    </div>
  ),
};

export const Presets: Story = {
  name: "Preset variants",
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton preset="avatar" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton preset="heading" />
          <Skeleton preset="text" />
        </div>
      </div>
      <Skeleton preset="card" />
      <div className="flex gap-2">
        <Skeleton preset="button" />
        <Skeleton preset="badge" />
      </div>
    </div>
  ),
};

export const RadiusVariants: Story = {
  name: "Radius variants",
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <div key={r} className="flex items-center gap-3">
          <Skeleton radius={r} className="h-8 w-8 shrink-0" />
          <Skeleton radius={r} className="h-4 flex-1" />
        </div>
      ))}
    </div>
  ),
};
