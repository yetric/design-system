import type { Meta, StoryObj } from "@storybook/react-vite";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";
import { Button } from "../button/Button";
import { ChevronsUpDown } from "lucide-react";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@yetric/ui starred repos</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
        @yetric/ui
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">@yetric/icons</div>
        <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">@yetric/hooks</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
