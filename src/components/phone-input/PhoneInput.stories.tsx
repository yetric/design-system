import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../stack/Stack";
import { Text } from "../text/Text";
import { PhoneInput } from "./PhoneInput";

const meta = {
  title: "Components/PhoneInput",
  component: PhoneInput,
  tags: ["autodocs"],
  args: {
    defaultCountry: "SE",
    placeholder: "Enter a phone number",
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | undefined>("+46701234567");

    return (
      <Stack gap={4} style={{ width: "100%", maxWidth: 420 }}>
        <PhoneInput value={value} onChange={setValue} defaultCountry="SE" />
        <Text size="body-sm" color="muted">
          Value: {value ?? "—"}
        </Text>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: "+12025550123",
    defaultCountry: "US",
    disabled: true,
  },
};
