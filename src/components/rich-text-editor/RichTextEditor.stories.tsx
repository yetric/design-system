import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { RichTextEditor } from "./RichTextEditor";

function ControlledEditor() {
  const [value, setValue] = useState(
    "<p>Write release notes, product updates, or long-form content.</p>"
  );

  return <RichTextEditor value={value} onChange={setValue} />;
}

const meta = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ControlledEditor />,
};

export const Placeholder: Story = {
  args: {
    placeholder: "Compose your message…",
  },
};

export const WithoutToolbar: Story = {
  args: {
    toolbar: false,
    value: "<p>Simple editor without formatting controls.</p>",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "<p>This content is read-only.</p>",
  },
};
