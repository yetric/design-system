import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileUpload } from "./FileUpload";

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-[28rem]",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ImageOnly: Story = {
  args: {
    accept: "image/*",
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 4,
  },
};

export const WithMaxSize: Story = {
  args: {
    maxSize: 1024 * 1024,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
