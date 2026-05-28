import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberInput } from "./NumberInput";

const meta = {
  component: NumberInput,
  tags: ["autodocs"],
  title: "Components/NumberInput",
  argTypes: {
    min:      { control: "number" },
    max:      { control: "number" },
    step:     { control: "number" },
    size:     { control: "select", options: ["xs","sm","md","lg","xl"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <NumberInput value={value} onChange={setValue} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <NumberInput
        label="Quantity"
        value={value}
        onChange={setValue}
        min={1}
        max={99}
        step={1}
      />
    );
  },
};

export const WithHelperAndError: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <NumberInput
        label="Port number"
        value={3000}
        onChange={() => {}}
        min={1}
        max={65535}
        helpText="Must be between 1 and 65535."
      />
      <NumberInput
        label="Timeout (ms)"
        value={-1}
        onChange={() => {}}
        error="Value must be a positive number."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [v, setV] = useState(5);
    return (
      <div className="flex flex-col gap-3 max-w-xs">
        <NumberInput size="xs" value={v} onChange={setV} label="XSmall" />
        <NumberInput size="sm" value={v} onChange={setV} label="Small" />
        <NumberInput size="md" value={v} onChange={setV} label="Medium" />
        <NumberInput size="lg" value={v} onChange={setV} label="Large" />
        <NumberInput size="xl" value={v} onChange={setV} label="XLarge" />
      </div>
    );
  },
};

export const WithStep: Story = {
  render: () => {
    const [v, setV] = useState(0);
    return (
      <NumberInput
        label="Amount (step 0.5)"
        value={v}
        onChange={setV}
        step={0.5}
        min={0}
        max={10}
        helpText="Increment / decrement by 0.5"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => <NumberInput label="Locked" value={42} onChange={() => {}} disabled />,
};
