import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";

describe("Collapsible", () => {
  it("content is hidden by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    // Radix Collapsible removes content from DOM when closed; check trigger aria-expanded
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens when trigger is clicked", async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Revealed content</CollapsibleContent>
      </Collapsible>
    );
    await userEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Revealed content").closest("[data-state]")).toHaveAttribute("data-state", "open");
  });

  it("can start open with defaultOpen", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Open content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText("Open content").closest("[data-state]")).toHaveAttribute("data-state", "open");
  });
});
