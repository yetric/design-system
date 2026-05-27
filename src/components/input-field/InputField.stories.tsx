import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputField } from "./InputField";

const meta = {
  title: "InputField",
  component: InputField,
  args: {
    label: "Email address",
    placeholder: "you@example.com"
  }
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    helpText: "We'll never share your email with anyone."
  }
};

export const Required: Story = {
  args: {
    required: true
  }
};

export const WithError: Story = {
  args: {
    label: "Email address",
    error: "Enter a valid email address.",
    required: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Not available"
  }
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputField label="Text" type="text" placeholder="Plain text" />
      <InputField label="Email" type="email" placeholder="you@example.com" />
      <InputField label="Password" type="password" placeholder="Min 8 characters" />
      <InputField label="Search" type="search" placeholder="Search…" />
      <InputField label="Number" type="number" placeholder="0" />
    </div>
  )
};

export const FullForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputField label="Full name" placeholder="Mattias Hising" required />
      <InputField
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        helpText="Used to send your receipt."
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        required
        error="Password must be at least 8 characters."
      />
    </div>
  )
};
