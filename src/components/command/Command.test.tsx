import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "./Command";

describe("Command", () => {
  it("renders items and filters them from input", async () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="profile">
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Teams">
            <CommandItem value="billing">Billing</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Type a command or search...");

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    await userEvent.type(input, "pro");

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });
});
