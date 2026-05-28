import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./Toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/Toggle",
  parameters: { layout: "centered" },
  argTypes: {
    variant:  { control: "select", options: ["default","outline","ghost"] },
    size:     { control: "select", options: ["xs","sm","md","lg","xl"] },
    radius:   { control: "select", options: ["none","xs","sm","md","lg","xl","full"] },
    pressed:  { control: "boolean" },
    disabled: { control: "boolean" },
  },
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

export const RadiusVariants: Story = {
  name: "Radius variants",
  render: () => (
    <div className="flex flex-col gap-3">
      {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <div key={r} className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground w-10">{r}</p>
          <ToggleGroup type="single" radius={r} defaultValue="b">
            <ToggleGroupItem value="a" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="b" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="c" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  ),
};
