import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";
import { Button } from "../button/Button";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    open: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger>
        <span className="font-semibold">@yetric/ui starred repos</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pt-1">
        <div className="border-border rounded-md border px-4 py-3 font-mono text-sm">
          @yetric/ui
        </div>
        <div className="border-border rounded-md border px-4 py-3 font-mono text-sm">
          @yetric/icons
        </div>
        <div className="border-border rounded-md border px-4 py-3 font-mono text-sm">
          @yetric/hooks
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger hideChevron>
        <span className="font-semibold">Advanced settings</span>
        <Button variant="ghost" size="sm" tabIndex={-1}>
          Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pt-2">
        <p className="text-muted-foreground px-2 text-sm">
          Additional configuration options appear here.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};
