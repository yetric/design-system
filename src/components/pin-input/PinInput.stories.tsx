import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PinInput } from "./PinInput";

const meta: Meta<typeof PinInput> = {
  title: "Components/PinInput",
  component: PinInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PinInput>;

function ControlledPinInput(props: any) {
  const [value, setValue] = useState("");
  return <PinInput value={value} onChange={setValue} {...props} />;
}

export const Default: Story = {
  render: () => <ControlledPinInput length={4} />,
};

export const Masked: Story = {
  render: () => <ControlledPinInput length={4} mask />,
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("1234");
    return (
      <div className="space-y-2">
        <PinInput length={4} value={value} onChange={setValue} error />
        <p className="text-sm text-destructive">Invalid PIN.</p>
      </div>
    );
  },
};

export const SixDigit: Story = {
  render: () => <ControlledPinInput length={6} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-8 text-sm text-muted-foreground">{size}</span>
          <ControlledPinInput length={4} size={size} />
        </div>
      ))}
    </div>
  ),
};
