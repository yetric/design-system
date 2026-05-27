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
});
