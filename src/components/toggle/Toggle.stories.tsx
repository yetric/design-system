import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./Toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta = {
  title: "Components/Toggle",
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Bold" size="sm"><Bold className="h-4 w-4" /> Bold</Toggle>
      <Toggle aria-label="Italic" size="sm"><Italic className="h-4 w-4" /> Italic</Toggle>
      <Toggle aria-label="Underline" size="sm"><Underline className="h-4 w-4" /> Underline</Toggle>
    </div>
  ),
};

export const GroupSingle: Story = {
  name: "ToggleGroup — single",
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const GroupMultiple: Story = {
  name: "ToggleGroup — multiple",
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};
