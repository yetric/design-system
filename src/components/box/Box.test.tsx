import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box data-testid="box">content</Box>);
    const el = screen.getByTestId("box");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveTextContent("content");
  });

  it("renders as a custom element via `as` prop", () => {
    render(<Box as="section" data-testid="box">content</Box>);
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("renders as an article element", () => {
    render(<Box as="article" data-testid="box">content</Box>);
    expect(screen.getByTestId("box").tagName).toBe("ARTICLE");
  });

  it("applies padding class for `p` prop", () => {
    render(<Box p={4} data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("p-4");
  });

  it("applies horizontal padding class for `px` prop", () => {
    render(<Box px={6} data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("px-6");
  });

  it("applies vertical padding class for `py` prop", () => {
    render(<Box py={2} data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("py-2");
  });

  it("applies individual padding classes", () => {
    render(<Box pt={1} pb={2} pl={3} pr={4} data-testid="box">x</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("pt-1");
    expect(el).toHaveClass("pb-2");
    expect(el).toHaveClass("pl-3");
    expect(el).toHaveClass("pr-4");
  });

  it("applies margin class for `m` prop", () => {
    render(<Box m={4} data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("m-4");
  });

  it("applies horizontal and vertical margin classes", () => {
    render(<Box mx={8} my={2} data-testid="box">x</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("mx-8");
    expect(el).toHaveClass("my-2");
  });

  it("applies individual margin classes", () => {
    render(<Box mt={4} mb={6} ml={2} mr={3} data-testid="box">x</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("mt-4");
    expect(el).toHaveClass("mb-6");
    expect(el).toHaveClass("ml-2");
    expect(el).toHaveClass("mr-3");
  });

  it("applies display class", () => {
    render(<Box display="flex" data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("flex");
  });

  it("applies display hidden class", () => {
    render(<Box display="hidden" data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("hidden");
  });

  it("merges custom className", () => {
    render(<Box className="text-red-500" data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveClass("text-red-500");
  });

  it("forwards extra HTML attributes", () => {
    render(<Box id="my-box" data-testid="box">x</Box>);
    expect(screen.getByTestId("box")).toHaveAttribute("id", "my-box");
  });

  it("combines multiple spacing and display props", () => {
    render(<Box display="flex" p={4} mx={2} className="gap-4" data-testid="box">x</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("flex");
    expect(el).toHaveClass("p-4");
    expect(el).toHaveClass("mx-2");
    expect(el).toHaveClass("gap-4");
  });

  it("applies zero spacing correctly", () => {
    render(<Box p={0} m={0} data-testid="box">x</Box>);
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("p-0");
    expect(el).toHaveClass("m-0");
  });
});
