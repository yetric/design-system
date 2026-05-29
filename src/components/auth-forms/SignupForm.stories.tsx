import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { SignupForm } from "./SignupForm";

const meta = {
  title: "Components/AuthForms/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    onLoginClick: fn(),
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <SignupForm {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    error: "That email is already registered.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <SignupForm {...args} />
    </div>
  ),
};
