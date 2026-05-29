import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./Menubar";

describe("Menubar", () => {
  it("renders menubar", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
    expect(screen.getByRole("menubar")).toBeInTheDocument();
  });

  it("renders trigger text", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
