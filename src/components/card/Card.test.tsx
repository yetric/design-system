import { render, screen } from "@testing-library/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    const { container } = render(<Card className="custom-class">content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders composed subcomponents", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Card variant="outlined">content</Card>);
    expect(container.firstChild).toHaveClass("border-2");
  });

  it("applies interactive class", () => {
    const { container } = render(<Card interactive>content</Card>);
    expect(container.firstChild).toHaveClass("cursor-pointer");
  });

  it("renders CardImage with alt text", () => {
    render(<CardImage src="/img.jpg" alt="A photo" />);
    expect(screen.getByAltText("A photo")).toBeInTheDocument();
  });

  it("renders CardHeader actions slot", () => {
    render(
      <Card>
        <CardHeader actions={<button>⋯</button>}>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByRole("button", { name: "⋯" })).toBeInTheDocument();
  });

  it("CardTitle renders with custom heading level", () => {
    render(<CardTitle as="h2">My title</CardTitle>);
    expect(screen.getByRole("heading", { level: 2, name: "My title" })).toBeInTheDocument();
  });

  it("CardFooter justify-end applies class", () => {
    const { container } = render(<CardFooter justify="end">actions</CardFooter>);
    expect(container.firstChild).toHaveClass("justify-end");
  });
});
