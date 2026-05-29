import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

function BasicAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>Answer 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2</AccordionTrigger>
        <AccordionContent>Answer 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders all triggers", () => {
    render(<BasicAccordion />);
    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
  });

  it("content is hidden by default", () => {
    render(<BasicAccordion />);
    // Radix Accordion removes content from DOM when closed; check trigger aria-expanded
    expect(screen.getByRole("button", { name: /Question 1/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("opens an item when trigger is clicked", async () => {
    render(<BasicAccordion />);
    await userEvent.click(screen.getByText("Question 1"));
    expect(screen.getByText("Answer 1").closest("[data-state]")).toHaveAttribute(
      "data-state",
      "open"
    );
  });

  it("closes an open item on second click (collapsible mode)", async () => {
    render(<BasicAccordion />);
    await userEvent.click(screen.getByText("Question 1"));
    await userEvent.click(screen.getByText("Question 1"));
    expect(screen.getByRole("button", { name: /Question 1/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("multiple type opens several items simultaneously", async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>CA</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>B</AccordionTrigger>
          <AccordionContent>CB</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    await userEvent.click(screen.getByText("A"));
    await userEvent.click(screen.getByText("B"));
    expect(screen.getByText("CA").closest("[data-state]")).toHaveAttribute("data-state", "open");
    expect(screen.getByText("CB").closest("[data-state]")).toHaveAttribute("data-state", "open");
  });
});
