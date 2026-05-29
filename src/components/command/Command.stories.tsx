import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, CreditCard, Settings, Smile, User } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/Button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";

const meta = {
  title: "Components/Command",
  component: Command,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

function CommandPalette() {
  return (
    <Command className="border-border w-full max-w-md border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="h-4 w-4" />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile className="h-4 w-4" />
            Search emoji
          </CommandItem>
          <CommandItem>
            <User className="h-4 w-4" />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <CreditCard className="h-4 w-4" />
            Billing
          </CommandItem>
          <CommandItem>
            <Settings className="h-4 w-4" />
            Preferences
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export const Default: Story = {
  render: () => <CommandPalette />,
};

export const WithDialog: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true);

    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open command dialog
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick actions">
              <CommandItem>Open settings</CommandItem>
              <CommandItem>Create project</CommandItem>
              <CommandItem>Invite teammate</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <Command className="border-border w-full max-w-md border shadow-md">
      <CommandInput placeholder="Jump to..." />
      <CommandList>
        <CommandEmpty>No matching entries.</CommandEmpty>
        <CommandGroup heading="Projects">
          <CommandItem>Design system</CommandItem>
          <CommandItem>Marketing site</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Teams">
          <CommandItem>Product</CommandItem>
          <CommandItem>Engineering</CommandItem>
          <CommandItem>Support</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
