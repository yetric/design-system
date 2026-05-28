import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search, Lock, Eye } from "lucide-react";

import { InputField } from "./InputField";

const meta = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    placeholder: "you@example.com"
  },
  argTypes: {
    label:    { control: "text" },
    error:    { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    size:     { control: "select", options: ["xs","sm","md","lg","xl"] },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelpText: Story = {
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

export const Multiline: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us a bit about yourself…",
    multiline: true,
    helpText: "Max 300 characters."
  }
};

export const MultilineWithError: Story = {
  args: {
    label: "Bio",
    multiline: true,
    error: "Bio is required.",
    required: true
  }
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      {(["none", "xs", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <InputField key={r} label={r} placeholder={r} radius={r} />
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <InputField key={s} label={s} placeholder={s} size={s} />
      ))}
    </div>
  )
};

export const SizesWithHelperText: Story = {
  name: "Sizes — label & helper scaling",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <InputField
          key={s}
          size={s}
          label={`Size ${s}`}
          placeholder={`${s} input`}
          helpText={`Helper text scales with the ${s} size`}
        />
      ))}
    </div>
  )
};

export const SizesWithError: Story = {
  name: "Sizes — error text scaling",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <InputField
          key={s}
          size={s}
          label={`Size ${s}`}
          placeholder={`${s} input`}
          error={`Error message scales with ${s}`}
        />
      ))}
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
      <InputField
        label="Bio"
        multiline
        placeholder="Tell us about yourself…"
        helpText="Max 300 characters."
      />
    </div>
  )
};

export const WithIcons: Story = {
  name: "With icons",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputField
        label="Search"
        leftIcon={<Search />}
        placeholder="Search…"
      />
      <InputField
        label="Email"
        type="email"
        leftIcon={<Mail />}
        placeholder="you@example.com"
        helpText="We'll never share your email."
      />
      <InputField
        label="Password"
        type="password"
        leftIcon={<Lock />}
        rightIcon={<Eye />}
        placeholder="Min 8 characters"
      />
    </div>
  )
};

export const IconsWithError: Story = {
  name: "Icons — with error",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <InputField
        label="Email"
        type="email"
        leftIcon={<Mail />}
        placeholder="you@example.com"
        error="Enter a valid email address."
        required
      />
    </div>
  )
};
