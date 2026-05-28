import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./Popover";
import { Button } from "../button/Button";
import { Label } from "../label/Label";
import { Input } from "../input/Input";
import { X } from "lucide-react";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Components/Popover",
  parameters: { layout: "centered" },
  argTypes: {
    radius: { control: "select", options: ["none","xs","sm","md","lg","xl","full"] },
    shadow: { control: "select", options: ["none","sm","md","lg","xl"] },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Edit name</h4>
          <PopoverClose asChild>
            <button className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </PopoverClose>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="first">First name</Label>
            <Input id="first" defaultValue="Alice" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" defaultValue="Smith" />
          </div>
          <Button className="w-full" size="sm">Save changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
