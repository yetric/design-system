import { render } from "@testing-library/react";

import { Heading, Text } from "./Text";

describe("Heading", () => {
  it("renders as h2 by default for size h2", () => {
    const { container } = render(<Heading>Title</Heading>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("renders as h1 for size h1", () => {
    const { container } = render(<Heading size="h1">Title</Heading>);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("renders as h5 for size h5", () => {
    const { container } = render(<Heading size="h5">Title</Heading>);
    expect(container.querySelector("h5")).toBeInTheDocument();
  });

  it("renders as h6 for size h6", () => {
    const { container } = render(<Heading size="h6">Title</Heading>);
    expect(container.querySelector("h6")).toBeInTheDocument();
  });

  it("renders as custom element via as prop", () => {
    const { container } = render(<Heading as="div">Title</Heading>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { container } = render(<Heading size="h4">Small</Heading>);
    expect(container.firstChild).toHaveClass("text-xl");
  });

  it("accepts custom className", () => {
    const { container } = render(<Heading className="text-red-500">Hello</Heading>);
    expect(container.firstChild).toHaveClass("text-red-500");
  });
});

describe("Text", () => {
  it("renders as p by default", () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders as span when as=span", () => {
    const { container } = render(<Text as="span">Hello</Text>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies size variant", () => {
    const { container } = render(<Text size="caption">Small</Text>);
    expect(container.firstChild).toHaveClass("text-xs");
  });

  it("applies weight variant", () => {
    const { container } = render(<Text weight="bold">Bold</Text>);
    expect(container.firstChild).toHaveClass("font-bold");
  });

  it("applies color variant", () => {
    const { container } = render(<Text color="muted">Muted</Text>);
    expect(container.firstChild).toHaveClass("text-muted-foreground");
  });
});
