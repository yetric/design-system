import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignLeft, LayoutGrid, List } from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  component: SegmentedControl,
  tags: ["autodocs"],
  title: "Components/SegmentedControl",
  argTypes: {
    size:     { control: "select", options: ["xs","sm","md","lg","xl"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState("list");
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        options={[
          { value: "list", label: "List" },
          { value: "grid", label: "Grid" },
          { value: "table", label: "Table" },
        ]}
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [v, setV] = useState("list");
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        options={[
          { value: "list",  label: "List",  icon: <List className="h-3.5 w-3.5" /> },
          { value: "grid",  label: "Grid",  icon: <LayoutGrid className="h-3.5 w-3.5" /> },
          { value: "plain", label: "Plain", icon: <AlignLeft className="h-3.5 w-3.5" /> },
        ]}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const opts = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ];
    const [v, setV] = useState("a");
    return (
      <div className="flex flex-col gap-3">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
          <SegmentedControl key={size} value={v} onChange={setV} options={opts} size={size} />
        ))}
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [v, setV] = useState("monthly");
    return (
      <SegmentedControl
        fullWidth
        value={v}
        onChange={setV}
        options={[
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
        ]}
      />
    );
  },
};

export const WithDisabledOption: Story = {
  render: () => {
    const [v, setV] = useState("free");
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        options={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
          { value: "enterprise", label: "Enterprise", disabled: true },
        ]}
      />
    );
  },
};
