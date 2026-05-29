import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../stack/Stack";
import { Text } from "../text/Text";
import { AddressInput, type AddressSuggestion } from "./AddressInput";

const ADDRESS_SUGGESTIONS: AddressSuggestion[] = [
  {
    id: "1",
    label: "Sveavägen 10, Stockholm, Sweden",
    value: "Sveavägen 10, Stockholm, Sweden",
  },
  {
    id: "2",
    label: "Drottninggatan 25, Stockholm, Sweden",
    value: "Drottninggatan 25, Stockholm, Sweden",
  },
  {
    id: "3",
    label: "Main Street 123, New York, NY, USA",
    value: "Main Street 123, New York, NY, USA",
  },
  {
    id: "4",
    label: "Market Street 456, San Francisco, CA, USA",
    value: "Market Street 456, San Francisco, CA, USA",
  },
];

const searchAddresses = async (query: string) => {
  await new Promise((resolve) => window.setTimeout(resolve, 250));

  return ADDRESS_SUGGESTIONS.filter((suggestion) =>
    suggestion.label.toLowerCase().includes(query.toLowerCase())
  );
};

const meta = {
  title: "Components/AddressInput",
  component: AddressInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Search for an address",
    minChars: 2,
    onSearch: searchAddresses,
  },
} satisfies Meta<typeof AddressInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState<AddressSuggestion | null>(null);

    return (
      <Stack gap={4} style={{ width: "100%", maxWidth: 480 }}>
        <AddressInput
          value={value}
          onChange={setValue}
          onSearch={searchAddresses}
          minChars={2}
          onSuggestionSelect={setSelected}
          placeholder="Start typing an address"
        />
        <Text size="body-sm" color="muted">
          Selected: {(selected?.label ?? value) || "—"}
        </Text>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: "Sveavägen 10, Stockholm, Sweden",
    disabled: true,
  },
};
