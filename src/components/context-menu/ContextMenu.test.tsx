import { fireEvent, render, screen } from "@testing-library/react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger,
} from "./ContextMenu";

describe("ContextMenu", () => {
  it("opens on right click and shows accessible items", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Open context menu</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuCheckboxItem checked>Show Bookmarks Bar</ContextMenuCheckboxItem>
          <ContextMenuRadioGroup value="grid">
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Open context menu"));

    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemcheckbox", { name: "Show Bookmarks Bar" })).toHaveAttribute(
      "data-state",
      "checked"
    );
    expect(screen.getByRole("menuitemradio", { name: "Grid" })).toHaveAttribute(
      "data-state",
      "checked"
    );
  });
});
