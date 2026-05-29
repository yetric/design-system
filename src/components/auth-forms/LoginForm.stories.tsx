import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { LoginForm } from "./LoginForm";

const meta = {
  title: "Components/AuthForms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    onForgotPassword: fn(),
    onSignupClick: fn(),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <LoginForm {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    error: "We couldn't sign you in with those details.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <LoginForm {...args} />
    </div>
  ),
};
