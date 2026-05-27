import { render, screen } from "@testing-library/react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

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
});
