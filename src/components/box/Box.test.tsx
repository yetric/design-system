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
    render(
      <Box as="section" data-testid="box">
        content
      </Box>
    );
    expect(screen.getByTestId("box").tagName).toBe("SECTION");
  });

  it("renders as an article element", () => {
    render(
      <Box as="article" data-testid="box">
        content
      </Box>
    );
    expect(screen.getByTestId("box").tagName).toBe("ARTICLE");
  });

  it("applies padding class for `p='md'`", () => {
    render(
      <Box p="md" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-4");
  });

  it("applies correct classes for all token sizes", () => {
    const { rerender } = render(
      <Box p="none" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-0");

    rerender(
      <Box p="xs" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-1");

    rerender(
      <Box p="sm" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-2");

    rerender(
      <Box p="lg" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-6");

    rerender(
      <Box p="xl" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("p-8");
  });

  it("applies horizontal padding class for `px`", () => {
    render(
      <Box px="lg" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("px-6");
  });

  it("applies vertical padding class for `py`", () => {
    render(
      <Box py="sm" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("py-2");
  });

  it("applies individual padding classes", () => {
    render(
      <Box pt="xs" pb="sm" pl="md" pr="lg" data-testid="box">
        x
      </Box>
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("pt-1");
    expect(el).toHaveClass("pb-2");
    expect(el).toHaveClass("pl-4");
    expect(el).toHaveClass("pr-6");
  });

  it("applies margin class for `m`", () => {
    render(
      <Box m="md" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("m-4");
  });

  it("applies horizontal and vertical margin classes", () => {
    render(
      <Box mx="xl" my="sm" data-testid="box">
        x
      </Box>
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("mx-8");
    expect(el).toHaveClass("my-2");
  });

  it("applies individual margin classes", () => {
    render(
      <Box mt="md" mb="lg" ml="sm" mr="xs" data-testid="box">
        x
      </Box>
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("mt-4");
    expect(el).toHaveClass("mb-6");
    expect(el).toHaveClass("ml-2");
    expect(el).toHaveClass("mr-1");
  });

  it("applies display class", () => {
    render(
      <Box display="flex" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("flex");
  });

  it("applies display hidden class", () => {
    render(
      <Box display="hidden" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("hidden");
  });

  it("applies shadow class for token value", () => {
    render(
      <Box shadow="md" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("shadow-md");
  });

  it("applies shadow-none for shadow='none'", () => {
    render(
      <Box shadow="none" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("shadow-none");
  });

  it("applies shadow-xl for shadow='xl'", () => {
    render(
      <Box shadow="xl" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("shadow-xl");
  });

  it("merges custom className", () => {
    render(
      <Box className="text-red-500" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveClass("text-red-500");
  });

  it("forwards extra HTML attributes", () => {
    render(
      <Box id="my-box" data-testid="box">
        x
      </Box>
    );
    expect(screen.getByTestId("box")).toHaveAttribute("id", "my-box");
  });

  it("combines multiple spacing and display props", () => {
    render(
      <Box display="flex" p="md" mx="sm" className="gap-4" data-testid="box">
        x
      </Box>
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("flex");
    expect(el).toHaveClass("p-4");
    expect(el).toHaveClass("mx-2");
    expect(el).toHaveClass("gap-4");
  });

  it("applies none spacing correctly", () => {
    render(
      <Box p="none" m="none" data-testid="box">
        x
      </Box>
    );
    const el = screen.getByTestId("box");
    expect(el).toHaveClass("p-0");
    expect(el).toHaveClass("m-0");
  });
});
