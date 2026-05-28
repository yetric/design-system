import { render } from "@testing-library/react";

import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders a decorative element with role=none by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute("role", "none");
  });

  it("renders with role=separator when not decorative", () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.firstChild).toHaveAttribute("role", "separator");
  });

  it("sets aria-orientation when not decorative", () => {
    const { container } = render(<Separator decorative={false} orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies horizontal classes by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("h-px", "w-full");
  });

  it("applies vertical classes when orientation=vertical", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("h-full", "w-px");
  });

  it("merges custom className", () => {
    const { container } = render(<Separator className="my-4" />);
    expect(container.firstChild).toHaveClass("my-4");
  });

  it("applies medium thickness", () => {
    const { container } = render(<Separator thickness="medium" />);
    expect(container.firstChild).toHaveClass("h-0.5");
  });

  it("applies thick thickness", () => {
    const { container } = render(<Separator thickness="thick" />);
    expect(container.firstChild).toHaveClass("h-1");
  });

  it("applies muted color", () => {
    const { container } = render(<Separator color="muted" />);
    expect(container.firstChild).toHaveClass("bg-muted");
  });

  it("applies accent color", () => {
    const { container } = render(<Separator color="accent" />);
    expect(container.firstChild).toHaveClass("bg-accent");
  });
});
