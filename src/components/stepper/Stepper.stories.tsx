import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "./Stepper";
import { Button } from "../button/Button";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  tags: ["autodocs"],
  title: "Components/Stepper",
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { title: "Account", description: "Create login" },
  { title: "Profile", description: "Personal info" },
  { title: "Team", description: "Invite members" },
  { title: "Done", description: "All set!" },
];

export const Default: Story = {
  render: () => <Stepper steps={steps} activeStep={1} />,
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    return (
      <div className="flex flex-col gap-6">
        <Stepper steps={steps} activeStep={active} />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={active === 0}
            onClick={() => setActive((s) => s - 1)}
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={active === steps.length - 1}
            onClick={() => setActive((s) => s + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <Stepper
      steps={[
        { title: "Order placed", description: "We received your order" },
        { title: "Processing", description: "Your order is being prepared" },
        { title: "Shipped", description: "Package in transit" },
        { title: "Delivered" },
      ]}
      activeStep={2}
      orientation="vertical"
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Stepper key={size} steps={steps.slice(0, 3)} activeStep={1} size={size} />
      ))}
    </div>
  ),
};
