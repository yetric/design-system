import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Settings } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button/Button";
import { CommandPalette } from "./CommandPalette";

const createItems = () => [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Open dashboard",
    icon: Home,
    onSelect: vi.fn(),
    group: "General",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Update preferences",
    icon: Settings,
    onSelect: vi.fn(),
    group: "General",
  },
  {
    id: "help",
    label: "Help center",
    description: "Browse support guides",
    onSelect: vi.fn(),
  },
];

describe("CommandPalette", () => {
  it("opens and closes with the keyboard shortcut in uncontrolled mode", async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={createItems()} />);

    expect(screen.queryByRole("dialog", { name: /command palette/i })).not.toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog", { name: /command palette/i })).toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /command palette/i })).not.toBeInTheDocument();
    });
  });

  it("renders a trigger and grouped items", async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={createItems()} trigger={<Button>Open palette</Button>} />);

    await user.click(screen.getByRole("button", { name: /open palette/i }));

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Open dashboard")).toBeInTheDocument();
    expect(screen.getByText("Help center")).toBeInTheDocument();
  });

  it("shows an empty state when no results match", async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={createItems()} trigger={<Button>Open palette</Button>} />);

    await user.click(screen.getByRole("button", { name: /open palette/i }));
    await user.type(screen.getByPlaceholderText(/search commands/i), "billing");

    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText(/try a different search term or browse another command group/i)
    ).toBeInTheDocument();
  });

  it("supports controlled usage and closes after selection", async () => {
    const user = userEvent.setup();
    const items = createItems();
    const onOpenChange = vi.fn();

    render(<CommandPalette items={items} open={true} onOpenChange={onOpenChange} />);

    await user.click(screen.getByText("Dashboard"));

    expect(items[0].onSelect).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
