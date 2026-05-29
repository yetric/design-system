import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarLink,
} from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Text formatting">
      <ToolbarToggleGroup type="multiple" aria-label="Text style">
        <ToolbarToggleItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="strikethrough" aria-label="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single" aria-label="Text alignment">
        <ToolbarToggleItem value="left" aria-label="Left aligned">
          <AlignLeft className="h-4 w-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="center" aria-label="Center aligned">
          <AlignCenter className="h-4 w-4" />
        </ToolbarToggleItem>
        <ToolbarToggleItem value="right" aria-label="Right aligned">
          <AlignRight className="h-4 w-4" />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link">
        <Link className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarLink href="#">Docs</ToolbarLink>
    </Toolbar>
  ),
};
